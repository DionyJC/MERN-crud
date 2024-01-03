import mongoose from 'mongoose';

const URL = process.env.MONGODB_URI

const conectarDB = async () => {
  mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conectado a MongoDB");
}).catch((error) => {
    console.log("Error al conectar a MongoDB");
    console.log(error);
});
  };
  
  export default conectarDB;