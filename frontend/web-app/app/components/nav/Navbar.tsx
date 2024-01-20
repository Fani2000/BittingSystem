import Search from "./Search"
import Logo from "./Logo"
import LoginButton from "./LoginButton"
import { getCurrentUser } from "@/app/actions/authActions"
import UserActions from "./UserActions"

const Navbar = async () => {
  const user = await getCurrentUser()

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center bg-white p-5 text-gray-800 shadow-md">
      <Logo />
      <Search />

      {user ? (
        <UserActions user={user} />
      ) : (
        <LoginButton />
      )}
    </header>
  )
}

export default Navbar