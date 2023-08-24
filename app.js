import express, { json } from 'express';
import { moviesRouter } from './routes/movies.js';
import { corsMiddleware } from './middlewares/cors.js';



const app = express();








app.disable('x-powered-by'); // disable x-powered-by header
app.use(json()); // middleware para parsear el body a json
app.use(corsMiddleware())


app.use('/movies', moviesRouter); // middleware para usar el router de movies





const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});