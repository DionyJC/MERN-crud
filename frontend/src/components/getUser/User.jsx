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
      const url = "http://localhost:4000/api/getall";
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
      await axios.delete(`http://localhost:4000/api/delete/${userId}`);
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {users.map((user) => (
          <motion.div
            key={user._id}
            className="bg-white rounded-md shadow-md p-6"
            variants={item}
          >
            {/* Contenido de la tarjeta */}
           
            <h2 className="text-xl font-bold text-cyan-600  mb-2">
              {user.name}
            </h2>
            <p className="mb-2 text-slate-900 font-bold">
              <span className=" text-red-500 font-bold">Profesión:</span>{" "}
              {user.profession}
            </p>
            <p className="mb-4 text-slate-900 font-bold">
              <span className=" text-red-500 font-bold">Correo:</span>{" "}
              {user.email}
            </p>

            <div className="flex justify-between">
              <Link to={`/edit/${user._id}`}>
                <button className="bg-blue-400 hover:bg-blue-800 text-white font-bold py-1 px-2 rounded-md mr-2 flex items-center">
                  Editar <FaEdit className="ml-1" />
                </button>
              </Link>

              <button
                onClick={() => deleteUser(user._id)}
                className="bg-red-400 hover:bg-red-800 text-white font-bold py-1 px-2 rounded-md flex items-center"
              >
                Eliminar <MdDeleteForever className="ml-1" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default User;
