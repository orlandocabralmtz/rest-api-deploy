import { MovieModel } from "../models/movie.js";
import { validateMovie, validatePartialMovie } from '../schemas/movies.js';

export class MovieController {
    static async getAll(req, res) {

        const { genre } = req.query;
        const movies = await MovieModel.getAll({ genre }) // se llama al metodo getAll de la clase MovieModel 
        // que es lo que renderiza
        res.json(movies);
    }


    static async getById(req, res) {
        const { id } = req.params; // destruracion del id de la url
        const movie = await MovieModel.getById({ id });
        if (movie) return res.json(movie);
        res.status(404).json({ error: 'Movie not found' });
    }

    static async create (req, res) {
        const result = validateMovie(req.body)
        console.log(result)
        if (!result.success) {
        // 422 Unprocessable Entity
          return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
    
        const newMovie = await MovieModel.create({ input: result.data })
    
        res.status(201).json(newMovie)
      }

    static async delete(req, res) {
        const { id } = req.params;
        const result = await MovieModel.delete({ id });
        if (!result) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json({ message: 'Movie deleted' });
    
    }


    static async update(req, res)  {
        const result = validatePartialMovie(req.body);
        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) });
        }
    
        const { id } = req.params;
        const updatedMovie = await MovieModel.update({ id, input: result.data }); // se llama al metodo update de la clase MovieModel
    
    
        return res.json(updatedMovie);
    }

}