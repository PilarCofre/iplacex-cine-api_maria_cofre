import express from 'express'
import controller from './controller.js'

const router = express.Router()

router.post('/pelicula', controller.handleInsertPeliculaRequest)
router.get('/peliculas', controller.handleGetPeliculasRequest)
router.get('/pelicula/:id', controller.handleGetPeliculaByIdRequest)
router.delete('/pelicula/:id', controller.handleDeletePeliculaRequest)
router.put('/pelicula/:id', controller.handleUpdatePeliculaRequest)


export default router