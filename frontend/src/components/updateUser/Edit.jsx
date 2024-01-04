import { useState, useEffect } from 'react';
import {  useParams, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";

const Edit = () => {

  const users = {
    name: '',
    profession: '',
    email: ''
  };
  

  const { id } = useParams();
  const [user, setUser] = useState(users)
   const navigate = useNavigate();

  const inputChange = (e) => {
    const {name, value } = e.target;
    setUser({...user, [name]:value})
  }

 useEffect(()=>{
   axios.get(`https://mern-crud-navy.vercel.app/api/getone/${id}`)
   .then((response) =>{
    setUser(response.data)
   })
   .catch((error) =>{
    console.log(error)
   })
   
 },[id]);

 const submitForm = async (e) => {
  e.preventDefault();

  // Validar campos
  if (!user.name || !user.profession || !user.email) {
    toast.error('Por favor, complete todos los campos.', { position: 'top-center' });
    return;
  }

  try {
    await axios.put(`https://mern-crud-navy.vercel.app/api/update/${id}`, user);
    toast.success('¡Formulario actualizado con éxito!', { position: 'top-center' });
    navigate('/');
  } catch (error) {
    console.error(error);
    toast.error('Error al actualizar el formulario. Inténtelo de nuevo.', { position: 'top-center' });
  }
};


  return (
    <div className="container mx-auto p-4 mt-20">
      <form 
      onSubmit={submitForm}
       className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nombre
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            value={user.name}
            name="name"
            type="text"
            placeholder="Ingrese su nombre"
            onChange={inputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profession">
            Profesión
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="profession"
            value={user.profession}
            name='profession'
            type="text"
            placeholder="Ingrese su profesión"
            onChange={inputChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Correo
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            value={user.email}
            name='email'
            type="email"
            placeholder="Ingrese su correo electrónico"
            onChange={inputChange}
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
