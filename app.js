const express = require('express');
const crypto = require('crypto');
const app = express();
const cors = require('cors');
const movies = require('./movies.json');
const { validateMovie, validatePartialMovie } = require('./schemas/movies');


app.disable('x-powered-by'); // disable x-powered-by header
app.use(express.json()); // middleware para parsear el body a json
app.use(cors({
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
            'http://localhost:3000',
            'http://localhost:8080'
        ]
        if (ACCEPTED_ORIGINS.includes(origin) || !origin) {  // si el origen de la peticion esta en la lista de origenes permitidos o si no hay origen (cuando se hace una peticion desde postman por ejemplo)
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))
    }
}
)); // middleware para habilitar cors (cross origin resource sharing )


app.get('/movies', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*'); // permite que cualquier cliente haga peticiones a este servidor
    const { genre } = req.query;
    if (genre) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies);
    };

    res.json(movies);
});

app.get('/movies/:id', (req, res) => {
    const { id } = req.params; // destruracion del id de la url
    const movie = movies.find(movie => movie.id === id);
    if (movie) return res.json(movie);
    res.status(404).json({ error: 'Movie not found' });
})


app.post('/movies', (req, res) => {

    const result = validateMovie(req.body);


    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data  // data es el objeto que se crea con el schema de zod y que contiene los datos validados.Data viene de la libreria zod
    };


    movies.push(newMovie);
    res.status(201).json(newMovie);
})


app.patch('/movies/:id', (req, res) => {
    const result = validatePartialMovie(req.body);

    const { id } = req.params;
    const movieIndex = movies.findIndex(movie => movie.id === id); // se busca el indice de la pelicula que se quiere actualizar.

    if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) });
    }


    if (movieIndex === -1) return res.status(404).json({ error: 'Movie not found' });

    const updatedMovie = {
        ...movies[movieIndex], // copia de la pelicula que se quiere actualizar en el indice que se encuentra. 
        ...result.data
    };

    movies[movieIndex] = updatedMovie;
    return res.json(updatedMovie);
})








const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});