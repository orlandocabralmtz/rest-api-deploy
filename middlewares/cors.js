
import cors from 'cors';

const ACCEPTED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:8080'
]
export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
    origin: (origin, callback) => {
        if (acceptedOrigins.includes(origin) || !origin) {  // si el origen de la peticion esta en la lista de origenes permitidos o si no hay origen (cuando se hace una peticion desde postman por ejemplo)
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))
    }
}
); // middleware para habilitar cors (cross origin resource sharing )


