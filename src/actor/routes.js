import express from 'express'
import controller from './controller.js'
//


const ActorRoutes = express.Router()
ActorRoutes.post('/actor', controller.handleInsertActorRequest)// crear actor
ActorRoutes.get('/actores', controller.handleGetActoresRequest)// obtener todos los actores   
ActorRoutes.get('/actor/:id', controller.handleGetActorByIdRequest) // obtener actor por id
ActorRoutes.delete('/actor/:id', controller.handleDeleteActorRequest) // eliminar actor por id
ActorRoutes.get('/actores/pelicula/:id', controller.handleGetActoresByPeliculaIdRequest) // obtener actores por id pelicula





export default ActorRoutes