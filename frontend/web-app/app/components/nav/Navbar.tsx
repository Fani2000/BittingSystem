'use client'

import Search from "./Search"
import Logo from "./Logo"

const Navbar = () => {

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center bg-white p-5 text-gray-800 shadow-md">
      <Logo />
      <Search />
      <div>Login</div>
    </header>
  )
}

export default Navbar