import  express, { urlencoded } from 'express'
import cors from 'cors'

import client from './src/common/db.js' // aplicado para acrchivos creados cuando se tranbaja con modulos
import routes from './src/pelicula/routes.js'
import ActorRoutes from './src/actor/routes.js'


//configuracion puertos escucha
const PORTS = 3000 || 4000

const app = express()

//configuracion de los middlewares necesarios, incluyendo cors
app.use(cors())
app.use(express.json())
app.use(urlencoded({ extended: true }))
//-	Debe existir una ruta por defecto que daba solo ser ejecutada por medio de método GET y que devuelva el mensaje “Bienvenido al cine Iplacex”
app.all('/', (req, res) => { return res.status(200).send('Bienvenido al cine Iplacex') })

app.use('/api', routes) // Ruta de peliculas
app.use('/api', ActorRoutes) // Ruta de actores


// peticion asincrona de cliente ,en donde se ejecuta la funcion then y cath de promesas
await client.connect()
.then(() => { 
    console.log('Conectado al Cluster')

    app.listen(PORTS, () => { console.log(`Servidor escuchando corriendo en http://localhost:${PORTS}`)})
})
.catch(() => {
    console.log('Error de conexion al Cluster de atlas')

})