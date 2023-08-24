import { Router } from "express";   // importamos el metodo Router de express


import { MovieController } from "../controllers/movies.js";



export const moviesRouter = Router();  // creamos una instancia de Router

moviesRouter.get('/', MovieController.getAll )
moviesRouter.post('/', MovieController.create ) 


moviesRouter.get('/:id', MovieController.getById )


moviesRouter.delete('/:id', MovieController.delete ) 

moviesRouter.patch('/:id', MovieController.update ) 