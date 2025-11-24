import { ObjectId } from "mongodb"
import { internalUseDefaults } from "vuetify/lib/composables/defaults.mjs"

export const Pelicula = {
   _id: ObjectId,
   nombre: String,
   generos: [String],
   anioEstreno: internalUseDefaults
  }
