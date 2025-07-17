// src/components/ProductCard.jsx


import { Heart, Star } from "lucide-react"

const ProductCard = ({ product, onAddWishlist }) => {
  const handleWishlistClick = (e) => {
    e.stopPropagation() // Prevent navigating to product details
    onAddWishlist(product._id)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative group cursor-pointer border border-gray-200 hover:shadow-lg transition-shadow">
      <button
        onClick={handleWishlistClick}
        className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10"
        aria-label="Add to wishlist"
      >
        <Heart className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors" />
      </button>
      <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-contain p-4" />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-gray-700 text-xl font-bold mb-2">${product.varientprice?.toFixed(2) || "0.00"}</p>
        <div className="flex items-center text-sm text-gray-500">
          <div className="flex items-center gap-0.5 mr-2">
            <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
            <Star className="w-4 h-4 fill-gray-300 stroke-gray-300" />
            <Star className="w-4 h-4 fill-gray-300 stroke-gray-300" />
          </div>
          <span>(0 reviews)</span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
