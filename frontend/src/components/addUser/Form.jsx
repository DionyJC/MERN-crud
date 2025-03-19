import { useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBriefcase, FaEnvelope, FaSave, FaArrowLeft } from 'react-icons/fa';

const Form = () => {
  
  const [inputs, setInputs] = useState({
    name: '',
    profession: '',
    email: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;
    setInputs({...inputs, [name]: value});
  }

  const formSubmit = async (e) => {
    e.preventDefault();
    
    // Validación de campos
    if (!inputs.name || !inputs.profession || !inputs.email) {
      toast.error('Por favor, complete todos los campos.', { position: 'top-center' });
      return;
    }
    
    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
      toast.error('Por favor, ingrese un correo electrónico válido.', { position: 'top-center' });
      return;
    }
    
    setIsLoading(true);
    try {
      await axios.post('https://mern-crud-navy.vercel.app/api/create', inputs);
      toast.success('¡Usuario creado con éxito!', { position: 'top-center' });
      
      // Limpiar formulario
      setInputs({
        name: '',
        profession: '',
        email: ''
      });
      
      // Redirigir a la página principal
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Error al crear el usuario. Inténtelo de nuevo.', { position: 'top-center' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4 mt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        {/* Encabezado del formulario */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-500 rounded-t-xl p-6 shadow-lg">
          <h2 className="text-white text-2xl font-bold mb-1">Nuevo Usuario</h2>
          <p className="text-purple-100 text-sm">Complete el formulario para crear un nuevo usuario</p>
        </div>
        
        {/* Formulario */}
        <form 
          onSubmit={formSubmit}
          className="bg-white rounded-b-xl shadow-lg px-6 py-8 mb-6"
        >
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <>
              {/* Campo Nombre */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
                  Nombre
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-purple-500" />
                  </div>
                  <input
                    className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 pl-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    id="name"
                    value={inputs.name}
                    name="name"
                    type="text"
                    placeholder="Ingrese nombre completo"
                    onChange={inputChange}
                  />
                </div>
              </div>
              
              {/* Campo Profesión */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="profession">
                  Profesión
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaBriefcase className="text-purple-500" />
                  </div>
                  <input
                    className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 pl-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    id="profession"
                    value={inputs.profession}
                    name="profession"
                    type="text"
                    placeholder="Ingrese su profesión"
                    onChange={inputChange}
                  />
                </div>
              </div>
              
              {/* Campo Email */}
              <div className="mb-8">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-purple-500" />
                  </div>
                  <input
                    className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 pl-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    id="email"
                    value={inputs.email}
                    name="email"
                    type="email"
                    placeholder="Ingrese su correo electrónico"
                    onChange={inputChange}
                  />
                </div>
              </div>
              
              {/* Botones */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-100">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg w-1/2"
                  type="button"
                  onClick={() => navigate('/')}
                >
                  <FaArrowLeft className="mr-2" />
                  Cancelar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg w-1/2"
                  type="submit"
                  disabled={isLoading}
                >
                  <FaSave className="mr-2" />
                  Guardar
                </motion.button>
              </div>
            </>
          )}
        </form>
      </motion.div>
    </div>
  );
}

export default Form;
