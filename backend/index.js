import expres from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import route from './routes/useRoute.js'

dotenv.config()

const app = expres()

app.use(expres.json())

// Configura CORS
app.use(cors({
  origin: '*', // Permitir solicitudes solo desde este origen
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

app.use('/api', route);


const PORT = process.env.PORT || 4001
const URL = process.env.MONGODB_URL

mongoose.connect(URL)
  .then(() => {
    console.log("Conectado a MongoDB");

    app.listen(PORT, () => {
      console.log("Servidor corriendo en el puerto: " + PORT);
    });
  })
  .catch(error => console.log("Error: " + error));