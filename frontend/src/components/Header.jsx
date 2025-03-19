import NavMenu from "./NavMenu"
import Logo from "./Logo"
import { motion } from "framer-motion"

const Header = () => {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full"
    >
      <div className="bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 shadow-lg">
        {/* Decorative top dots */}
        <div className="container mx-auto px-4 relative">
          <div className="absolute -top-2 left-1/4 w-2 h-2 rounded-full bg-yellow-300 opacity-70"></div>
          <div className="absolute -top-1 left-1/3 w-1.5 h-1.5 rounded-full bg-pink-300 opacity-60"></div>
          <div className="absolute -top-3 right-1/4 w-2.5 h-2.5 rounded-full bg-green-300 opacity-70"></div>
          <div className="absolute -top-2 right-1/3 w-1.5 h-1.5 rounded-full bg-purple-300 opacity-60"></div>
          
          <div className="flex items-center justify-between py-3">
            <Logo />
            <NavMenu />
          </div>
        </div>
      </div>
      
      {/* Subtle curved shadow */}
      <div className="h-1 bg-gradient-to-r from-transparent via-indigo-100 to-transparent"></div>
    </motion.header>
  )
}

export default Header