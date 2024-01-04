import { useState } from "react";
// import {useNavigate} from 'react-router-dom'
import axios from "axios";
import toast from "react-hot-toast";


const Form = () => {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [email, setEmail] = useState("");
  
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Validaciones
    if (name.trim() === '' || profession.trim() === '' || email.trim() === '' ) {
      toast.error("Todos los campos son obligatorios");
      return;
    }


    // Si todas las validaciones pasan, envía la solicitud al servidor
    const url = "https://mern-crud-navy.vercel.app/api/create";
    const response = await axios.post(url, {
      name,
      profession,
      email
    });

    // Verifica si la respuesta contiene un campo '_id'
    if (response.data) {
      toast.success(response.data.msg, { position: 'top-center', duration: 5000 });
      console.log("Registro creado con _id:", response.data);

      // Limpiar el formulario después de enviar los datos
      setName("");
      setProfession("");
      setEmail("");
     
    } else {
      console.log("Registro creado sin _id en la respuesta:", response.data);
    }
  } catch (error) {
    console.error("Error al crear el registro:", error);
  }
};

  

  return (
    <div className="container mx-auto p-4 mt-20">
      <form
        className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nombre
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Ingrese su nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="profession"
          >
            Profesión
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="profession"
            type="text"
            placeholder="Ingrese su profesión"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Correo
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Ingrese su correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
