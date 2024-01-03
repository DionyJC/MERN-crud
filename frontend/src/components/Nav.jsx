import { Link } from "react-router-dom";
import { motion } from "framer-motion"

const Nav = () => {
  return (
    <motion.div 
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
     className="flex flex-col sm:flex-row justify-end gap-3 text-gray-700 font-bold ">
      <Link to="/" className="sm:block hover:text-yellow-400">Inicio</Link>
      <Link to="/add" className="sm:block hover:text-yellow-400">Nuevo</Link>
    </motion.div>
  );
}

export default Nav;