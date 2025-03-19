import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const Nav = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const navItems = [
    { label: "Inicio", path: "/", icon: "🏠" },
    { label: "Nuevo", path: "/add", icon: "➕" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row justify-end gap-6 items-center"
    >
      {navItems.map((item, index) => (
        <motion.div
          key={index}
          className="relative"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to={item.path} 
            className="text-white font-medium text-lg md:text-base flex items-center gap-2 px-4 py-3 md:py-2 relative z-10"
          >
            <span className="block md:hidden lg:block">{item.icon}</span>
            {item.label}
          </Link>
          
          {/* Background highlight on hover */}
          {hoveredIndex === index && (
            <motion.div
              layoutId="hoverBackground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white bg-opacity-20 rounded-full -z-0"
            />
          )}
          
          {/* Active marker (can be enhanced with route detection) */}
          <motion.div
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full hidden md:block"
            initial={{ opacity: 0, scale: 0 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default Nav;