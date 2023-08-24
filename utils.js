// leer un archivo json en ECMAScript 6
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url); // import.meta.url es la url del archivo actual
export const readJSON = (patch)=> require(patch)

