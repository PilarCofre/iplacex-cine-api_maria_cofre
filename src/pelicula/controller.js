import { ObjectId, BSONType  } from "mongodb"
import client from '../common/db.js'
import { Pelicula } from "./pelicula.js"


const peliculaCollection = client.db('cine-db').collection('peliculas')

async function handleInsertPeliculaRequest(req, res) {
    let data = req.body
    let pelicula = Pelicula

    pelicula.nombre = data.nombre
    pelicula.generos = data.generos
    pelicula.anioEstreno = data.anioEstreno

    ///peticion asincrona para insertar pelicula
    await peliculaCollection.insertOne(pelicula)
    .then((data) =>  {
        if(data === null) return res.status(400).send( 'No se pudo crear la pelicula')
        return res.status(201).send(data)
    })
    .catch((err) => { return res.status(500).send({ error: err }) })
  
   
}

async function handleGetPeliculasRequest(req, res) {
    await peliculaCollection.find({}).toArray()
    .then((data) =>  { return res.status(200).send( data )})
    .catch((err) => { return res.status(500).send({ error: err }) })
}
//buscar una pelicula por id
async function handleGetPeliculaByIdRequest(req, res) {
    let id = req.params.id
    try {   
        let oid = ObjectId.createFromHexString(id)
        await peliculaCollection.findOne({ _id: oid })
        .then((data) =>  {
            if(data === null) return res.status(404).send(data)
            return res.status(200).send(data)
    })
    .catch((err) => {
        return res.status(500).send({ error: err.code })
    }) 
    } catch (error) {
        return res.status(400).send( 'ID invalido' )
    }   
}
async function handleDeletePeliculaRequest(req, res) {
    let id = req.params.id
    
    try {   
        let oid = ObjectId.createFromHexString(id)
        await peliculaCollection.deleteOne({ _id: oid })
        .then((data) =>  { return res.status(200).send( data )})
        .catch((err) => { return res.status(500).send({ error: err }) })
    } catch (error) {
        return res.status(400).send( 'ID invalido' )
    }
}
async function handleUpdatePeliculaRequest(req, res) {  
    let id = req.params.id
    let pelicula = req.body
    try {   
        let oid = ObjectId.createFromHexString(id)
        let query = { $set: pelicula }

        await peliculaCollection.updateOne({ _id: oid }, query)
       
        .then((data) =>  { return res.status(200).send( data )})
        .catch((err) => { return res.status(500).send({ error: err }) })
    } catch (error) {
        return res.status(400).send( 'ID invalido' )
    }
}

async function handleSearchPeliculaRequest(req, res) {
    
    let query = req.query
    await peliculaCollection.find(query).toArray()
    .then((data) =>  { return res.status(200).send( data )})
    .catch((err) => { return res.status(500).send({ error: err }) })

}


export default {
    handleInsertPeliculaRequest,
    handleGetPeliculasRequest,
    handleGetPeliculaByIdRequest,
    handleDeletePeliculaRequest,
    handleUpdatePeliculaRequest,
    handleSearchPeliculaRequest
}   