import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import Nav from "./Nav";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(isOpen => !isOpen);
  };

  return (
    <>
      <nav className="flex justify-end items-center">
        <div className="hidden md:flex justify-between gap-4">
          <Nav />
        </div>

        <div className="md:hidden">
          <button 
            onClick={toggleNavbar}
            className="relative p-2 z-50 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition duration-300 shadow-md focus:outline-none"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IoMdClose className="text-white text-2xl" /> 
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IoMenu className="text-white text-2xl" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed z-40 inset-0 flex justify-center pt-20 bg-gradient-to-b from-indigo-700 to-blue-900 md:hidden"
          >
            <div className="container px-6">
              <Nav />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavMenu;