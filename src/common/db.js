import { MongoClient, ServerApiVersion  } from 'mongodb'

const uri = 'mongodb+srv://pcofref_db_user:kLNSpPDm5re5H6Tc@cluster-express.pxzeesg.mongodb.net/?appName=cluster-express'
//cliente de conexion
const client = new MongoClient(uri, { 
    serverApi: {  
    version: ServerApiVersion.v1,   //  define la versión de Stable API de MongoDB para asignar el formato de
                                   //respuesta del servidor de Atlas
    strict: true,                  //define que solo se puedan utilizar comandos o funciones existentes dentro de la versión de Stable API asignada
    deprecationErrors: true        //de la versión de Stable API asignada true/false deprecationErrors define si se retornarán errores cuando se
                                  //intente ejecutar una función deprecada/descontinuada
    }
})


await client.connect()
.then(() => { console.log('Base Datos Conectada') })
.catch(() => { console.log('Error de conexion al Cluster de atlas desde db.js') })

//exportar cliente de conexion , es necesario modificar en index.js
export default client