// src/components/WishlistDrawer.jsx
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { X, Heart, Star } from "lucide-react"
import { API_BASE } from "../utils/api"

const WishlistDrawer = ({ onClose }) => {
  const [wishlist, setWishlist] = useState([])
  const navigate = useNavigate()

  const fetchWishlist = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      setWishlist([])
      return
    }
    try {
      const res = await fetch(`${API_BASE}/api/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (res.ok) {
        setWishlist(data)
      } else {
        console.error("Failed to fetch wishlist:", data.message)
        setWishlist([])
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error)
      setWishlist([])
    }
  }

  const handleRemoveFromWishlist = async (itemId) => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`${API_BASE}/api/wishlist/${itemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        alert("Item removed from wishlist!")
        fetchWishlist()
      } else {
        const data = await res.json()
        alert(data.message || "Failed to remove item")
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error)
    }
  }

  useEffect(() => {
    fetchWishlist()
  }, [])

  return (
    <div className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg p-6 z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out translate-x-0">
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-500" />
          Items
        </h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>
      {wishlist.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No items in wishlist</p>
      ) : (
        <div className="space-y-4">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
            >
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={80}
                height={80}
                className="object-contain rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-700 text-base font-bold">${item.price?.toFixed(2) || "0.00"}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="flex items-center gap-0.5 mr-2">
                    <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                    <Star className="w-4 h-4 fill-gray-300 stroke-gray-300" />
                    <Star className="w-4 h-4 fill-gray-300 stroke-gray-300" />
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleRemoveFromWishlist(item._id)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
                aria-label={`Remove ${item.name} from wishlist`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default WishlistDrawer