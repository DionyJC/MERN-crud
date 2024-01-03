import NavMenu from "./NavMenu"
import Logo from "./Logo"

const Header = () => {
  return (
    <div className=" bg-white sticky top-0 flex-wrap z-[40]  flex w-full items-center justify-between py-4 border-gray-800 px-12 shadow-md">
      
      <Logo />
      <NavMenu />
    </div>
  )
}

export default Header