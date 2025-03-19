import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 3,
    scale: 1,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.5,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const User = () => {
  const [users, setUsers] = useState([]);

 // ...

useEffect(() => {
  const obtenerInformacion = async () => {
    try {
      const url = "https://mern-crud-navy.vercel.app/api/getall";
      const response = await axios(url);

      if (response.data && Array.isArray(response.data.data)) {
        setUsers(response.data.data);
      } else {
        console.error("La respuesta de la API no contiene un array de usuarios:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error.response || error.message || error);
    }
  };

  obtenerInformacion();
}, []);

// ...


  const deleteUser = async (userId) => {
    try {
      await axios.delete(`https://mern-crud-navy.vercel.app/api/delete/${userId}`);
      setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
      // Notificación de Toast al eliminar satisfactoriamente
      toast.success('Usuario eliminado correctamente', { position: 'top-center' });
    } catch (error) {
      console.log(error);
      toast.error('Error al eliminar el usuario. Inténtelo de nuevo.', { position: 'top-center' });
    }
  };

  return (
    <div className="flex items-center justify-center flex-col p-10">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {users.map((user) => (
          <motion.div
            key={user._id}
            className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            variants={item}
          >
            {/* Header con avatar */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-4 flex items-center">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-xl font-bold text-blue-500 shadow-md mr-4">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-xl font-bold text-white">
                {user.name}
              </h2>
            </div>
            
            {/* Contenido */}
            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                  <span className="text-gray-700 font-semibold">Profesión:</span>
                </div>
                <p className="text-gray-800 ml-7">{user.profession}</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-gray-700 font-semibold">Correo:</span>
                </div>
                <p className="text-gray-800 ml-7 break-all">{user.email}</p>
              </div>

              {/* Botones */}
              <div className="flex justify-between pt-4 border-t border-gray-100">
                <Link to={`/edit/${user._id}`} className="w-[48%]">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg">
                    <FaEdit className="mr-2" />
                    Editar
                  </button>
                </Link>

                <button
                  onClick={() => deleteUser(user._id)}
                  className="w-[48%] bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                >
                  <MdDeleteForever className="mr-2" size={18} />
                  Eliminar
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default User;
