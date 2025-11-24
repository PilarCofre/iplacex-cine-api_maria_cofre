import { ObjectId, BSONType } from "mongodb"


export const Actor = {
  bsonType: "object",
  required: ["nombre", "edad"],//campos obligatorios
  properties: {
    _id: { bsonType: "objectId" }, //mongo asigna el id automaticamente

    idPelicula: { bsonType: "objectId" }, // referencia a la pelicula

    nombre: { bsonType: "string" },

    edad: { bsonType: "int" },

    estaRetirado: { bsonType: "bool" },

    premios: {
      bsonType: "array",
      items: { bsonType: "string" } // cada premio es una cadena de texto string

    }
  }
};