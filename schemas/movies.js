const z = require('zod');

const movieSchema = z.object({
    title: z.string({
        required_error: 'Tittle is required'
    }),
    year: z.number().int().min(1888).max(2024),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).default(5),
    poster: z.string().url({
        message: 'Poster must be a valid URL'
    }),
    genre: z.array(
        z.enum(['Action','Adventure', 'Crime','Comedy','Drama','Fantasy','Horror','Mystery','Thriller','Western','Sci-Fi' ])
    )
});


function validateMovie(object){
    return movieSchema.safeParse(object);

}


function validatePartialMovie(object){
    return movieSchema.partial().safeParse(object);  // partial() permite que el objeto no tenga todas las propiedades del schema. partial() es un metodo de zod
}

module.exports = {validateMovie, validatePartialMovie};
