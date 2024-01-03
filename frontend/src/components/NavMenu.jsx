import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import Nav from "./Nav";
import { useState } from "react";




const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(isOpen => !isOpen);
  };

  return (
    <>
      <nav className="flex justify-end">
        <div className="hidden w-full md:flex justify-between gap-4">
          <Nav />
        </div>

        <div className="md:hidden">
          <button onClick={toggleNavbar}>
            {isOpen ? <IoMdClose 
             className="font-bol text-indigo-700 text-2xl " /> 
             : 
             <IoMenu 
             className="font-bol text-indigo-700 text-2xl" />}
          </button>
        </div>
      </nav>
      
      {
        isOpen && (
          <div className=" z-[100] left-0 right-0 top-0 r md:hidden flex basis-full flex-col items-center">
            <Nav />
          </div>
        )
      }
     
      
    </>
  );
};

export default NavMenu;