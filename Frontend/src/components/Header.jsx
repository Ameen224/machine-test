// src/components/Header.jsx

import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Search, Heart, ShoppingCart, User, LogOut } from "lucide-react"

const Header = ({ onOpenWishlist, onOpenModals, cartItemCount = 0, wishlistCount = 0 }) => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    console.log("Searching for:", searchTerm)
    navigate(`/search?q=${searchTerm}`)
  }

  const handleLogout = () => {
    localStorage.removeItem("token") // Remove the token
    navigate("/") // Redirect to the authentication page
  }

  return (
    <header className="bg-[#003366] text-white p-4 ">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo/Title */}
        <h1 onClick={() => navigate("/")} className="text-xl font-bold cursor-pointer">
          MyShop
        </h1>
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 mx-8 max-w-md relative">
          <input
            type="text"
            placeholder="Search anything"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ff9900]"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <button
            type="submit"
            className="absolute right-0 top-0 h-full px-6 bg-[#ff9900] text-white rounded-r-full hover:bg-[#e68a00] transition-colors"
          >
            Search
          </button>
        </form>
        {/* Icons/Actions */}
        <div className="flex items-center space-x-6">
          <button className="flex items-center text-sm hover:text-gray-300 transition-colors">
            <User className="w-5 h-5 mr-1" />
            Sign In
          </button>
          <button
            onClick={onOpenWishlist}
            className="flex items-center text-sm hover:text-gray-300 transition-colors relative"
          >
            <Heart className="w-5 h-5 mr-1" />
            Wishlist
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>
          <button className="flex items-center text-sm hover:text-gray-300 transition-colors relative">
            <ShoppingCart className="w-5 h-5 mr-1" />
            Cart
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
          <button onClick={handleLogout} className="flex items-center text-sm hover:text-gray-300 transition-colors">
            <LogOut className="w-5 h-5 mr-1" />
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
