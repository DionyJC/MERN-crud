import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaUser, FaBriefcase, FaEnvelope, FaSave, FaArrowLeft } from 'react-icons/fa';

const Edit = () => {
  const users = {
    name: '',
    profession: '',
    email: ''
  };
  
  const { id } = useParams();
  const [user, setUser] = useState(users);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;
    setUser({...user, [name]: value});
  }

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://mern-crud-navy.vercel.app/api/getone/${id}`);
        setUser(response.data);
      } catch (error) {
        console.log(error);
        toast.error('Error al cargar los datos del usuario', { position: 'top-center' });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUser();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    
    // Validar campos
    if (!user.name || !user.profession || !user.email) {
      toast.error('Por favor, complete todos los campos.', { position: 'top-center' });
      return;
    }
    
    setIsLoading(true);
    try {
      await axios.put(`https://mern-crud-navy.vercel.app/api/update/${id}`, user);
      toast.success('¡Usuario actualizado con éxito!', { position: 'top-center' });
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Error al actualizar el usuario. Inténtelo de nuevo.', { position: 'top-center' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        {/* Encabezado del formulario */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-400 rounded-t-xl p-6 shadow-lg">
          <h2 className="text-white text-2xl font-bold mb-1">Editar Usuario</h2>
          <p className="text-blue-100 text-sm">Actualice la información del usuario</p>
        </div>
        
        {/* Formulario */}
        <form 
          onSubmit={submitForm}
          className="bg-white rounded-b-xl shadow-lg px-6 py-8 mb-6"
        >
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
                    <FaUser className="text-blue-500" />
                  </div>
                  <input
                    className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 pl-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    id="name"
                    value={user.name}
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
                    <FaBriefcase className="text-blue-500" />
                  </div>
                  <input
                    className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 pl-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    id="profession"
                    value={user.profession}
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
                    <FaEnvelope className="text-blue-500" />
                  </div>
                  <input
                    className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 pl-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    id="email"
                    value={user.email}
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
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg w-1/2"
                  type="submit"
                  disabled={isLoading}
                >
                  <FaSave className="mr-2" />
                  Actualizar
                </motion.button>
              </div>
            </>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default Edit;
