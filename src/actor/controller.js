import { ObjectId } from "mongodb"
import client from '../common/db.js'


const actorCollection = client.db('cine-db').collection('actores')

async function handleInsertActorRequest(req, res) {
  try {
    const data = req.body;
    if (!data.nombre || !data.edad) {
      return res.status(400).send("Faltan campos obligatorios nombre o edad");
    }
    // Validar idPelicula 
    let idPelicula = null;
    if (data.idPelicula) {
      try {
        idPelicula = new ObjectId(data.idPelicula);
      } catch {
        return res.status(400).send("idPelicula inválido");
      }
    }

    // Crear un nuevo objeto actor 
    const actor = {
      idPelicula: idPelicula,
      nombre: data.nombre,
      edad: data.edad,
      estaRetirado:!!data.estaRetirado, // fuerza boolean
    premios: Array.isArray(data.premios) ? data.premios : []
     
    };

    const result = await actorCollection.insertOne(actor);

    return res.status(201).send({
      message: "Actor creado exitosamente",
      id: result.insertedId
    });

  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}
//Obtener todos los actores...
async function handleGetActoresRequest(req, res) {
    try {
    const actores = await actorCollection.find({}).toArray();
    return res.status(200).send( actores );
    } catch (err) { return res.status(500).send({ error: err.message })
    }
}
// funcion para buscar po id el actor
async function handleGetActorByIdRequest(req, res) {
    try {
        const id = req.params.id;
  
        const  oid = new ObjectId(id);  

        const actor = await actorCollection.findOne({ _id: oid });
        if (!actor) return res.status(404).send("Actor no encontrado");
        return res.status(200).send(actor);
    } catch (err) {return res.status(400).send("Id invalido");

    
    }
   
}
//FUNCION ELIMINAR ACTOR
async function handleDeleteActorRequest(req, res) {
  try {
    const id = req.params.id;
    const oid = new ObjectId(id);

    const result = await actorCollection.deleteOne({ _id: oid });

    if (result.deletedCount === 0)
      return res.status(404).send("Actor no encontrado");

    return res.status(200).send("Actor eliminado correctamente");

  } catch (error) {
    return res.status(400).send("ID inválido");
  }
}
async function handleGetActoresByPeliculaIdRequest(req, res) {
  try {
    const peliculaId = req.params.id;

    // Validar ObjectId
    if (!ObjectId.isValid(peliculaId)) {
      return res.status(400).send({ error: "ID de película inválido" });
    }

    const oid = new ObjectId(peliculaId);

    // Buscar actores cuyo idPelicula coincida
    const actores = await actorCollection.find({ idPelicula: oid }).toArray();

    if (actores.length === 0) {
      return res.status(404).send({ message: "No se encontraron actores para esta película" });
    }

    return res.status(200).send(actores);

  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export default  {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleDeleteActorRequest,
    handleGetActoresByPeliculaIdRequest
    }





        