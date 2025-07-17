// src/pages/HomePage.jsx

import { useEffect, useState } from "react"
import { ChevronRight, ChevronDown } from "lucide-react"
import Header from "../components/Header"
import ProductCard from "../components/ProductCard"
import WishlistDrawer from "../components/WishlistDrawer"
import AddCategoryModal from "../components/AddCategoryModal"
import AddSubCategoryModal from "../components/AddSubCategoryModal"
import AddProductModal from "../components/AddProductModal"
import { API_BASE } from "../utils/api"

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [showWishlist, setShowWishlist] = useState(false)
  const [modalType, setModalType] = useState(null) 
  const [expandedCategories, setExpandedCategories] = useState({}) 
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalItems, setTotalItems] = useState(0)

  const [categoriesData, setCategoriesData] = useState([]) 

  const fetchProducts = async (page = 1, limit = 10, subCategory = null) => {
    try {
      let url = `${API_BASE}/api/products?page=${page}&limit=${limit}`
      if (subCategory) {
        url += `&subCategory=${subCategory}`
      }
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data = await res.json()
      if (data && Array.isArray(data.products)) {
        setProducts(data.products)
        setTotalItems(data.total)
        setCurrentPage(data.currentPage)
      } else {
        console.warn("API returned unexpected data for products:", data)
        setProducts([])
        setTotalItems(0)
      }
    } catch (error) {
      console.error("Failed to fetch products:", error)
      setProducts([])
      setTotalItems(0)
    }
  }


  useEffect(() => {
    fetchProducts(currentPage, itemsPerPage)
    fetchCategories() // Fetch categories on mount
  }, [currentPage, itemsPerPage]) // Re-fetch products when page or itemsPerPage changes





  const handleAddWishlist = async (productId) => {
  const token = localStorage.getItem("token")
  console.log("Adding to wishlist:", productId, "with token:", token);
  
  try {
    const res = await fetch(`${API_BASE}/api/wishlist/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ productId })
    })
    const data = await res.json()
    if (res.ok) {
      alert("Product added to wishlist!")
    } else {
      alert(data.message || "Failed to add to wishlist")
    }
  } catch (err) {
    console.error("Error adding to wishlist:", err)
  }
}










  const closeModal = () => setModalType(null)

    // Toggle category expand/collapse
  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  // Handle checkbox toggle
  const handleSubcategoryCheck = (categoryId, subId) => {
    const updated = categoriesData.map((cat) => {
      if (cat._id === categoryId) {
        const updatedSubs = cat.subcategories.map((sub) => {
          if (sub._id === subId) {
            return { ...sub, checked: !sub.checked }
          }
          return sub
        })
        return { ...cat, subcategories: updatedSubs }
      }
      return cat
    })
    setCategoriesData(updated)
  }

// Fetch categories and subcategories separately then merge
  const fetchCategories = async () => {
    try {
      const res1 = await fetch(`${API_BASE}/api/categories`)
      if (!res1.ok) throw new Error(`Category error: ${res1.status}`)
      const categories = await res1.json()

      const res2 = await fetch(`${API_BASE}/api/categories/subcategories`)
      if (!res2.ok) throw new Error(`Subcategory error: ${res2.status}`)
      const subcategories = await res2.json()

      const merged = categories.map((cat) => {
        const subs = subcategories
          .filter((sub) => sub.category._id === cat._id)
          .map((sub) => ({
            _id: sub._id,
            name: sub.name,
            checked: false,
          }))
        return { ...cat, subcategories: subs }
      })

      setCategoriesData(merged)
    } catch (error) {
      console.error("Failed to fetch categories with subcategories:", error)
      setCategoriesData([])
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])


  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        onOpenWishlist={() => setShowWishlist(true)}
        onOpenModals={(type) => setModalType(type)}
        cartItemCount={0}
        wishlistCount={0}
      />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center text-gray-600 text-lg">
            Home <ChevronRight className="w-5 h-5 mx-2" />
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setModalType("category")}
              className="bg-[#ff9900] text-white px-4 py-2 rounded-md hover:bg-[#e68a00] transition-colors font-semibold text-sm"
            >
              Add category
            </button>
            <button
              onClick={() => setModalType("subcategory")}
              className="bg-[#ff9900] text-white px-4 py-2 rounded-md hover:bg-[#e68a00] transition-colors font-semibold text-sm"
            >
              Add sub category
            </button>
            <button
              onClick={() => setModalType("product")}
              className="bg-[#ff9900] text-white px-4 py-2 rounded-md hover:bg-[#e68a00] transition-colors font-semibold text-sm"
            >
              Add product
            </button>
          </div>
        </div>

        {/* Main Content Grid: Sidebar + Products */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  All categories
                </a>
              </li>
              {categoriesData.map((category) => (
                <li key={category._id}>
                  <div
                    className="flex items-center justify-between cursor-pointer py-1"
                    onClick={() => toggleCategory(category._id)}
                  >
                    <span className="font-semibold text-gray-800">{category.name}</span>
                    {expandedCategories[category._id] ? (
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                  {expandedCategories[category._id] && category.subcategories.length > 0 && (
                    <ul className="ml-4 mt-2 space-y-2">
                      {category.subcategories.map((sub) => (
                        <li key={sub._id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`sub-${sub._id}`}
                            checked={sub.checked || false} // Ensure checked is always a boolean
                            onChange={() => handleSubcategoryCheck(category._id, sub._id)}
                            className="mr-2 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <label htmlFor={`sub-${sub._id}`} className="text-gray-700">
                            {sub.name}
                          </label>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </aside>

          {/* Product Grid */}
          <main className="md:col-span-3 lg:col-span-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.length > 0 ? (
                products.map((p) => <ProductCard key={p._id} product={p} onAddWishlist={handleAddWishlist} />)
              ) : (
                <p className="col-span-full text-center text-gray-600">No products found.</p>
              )}
            </div>

            {/* Pagination */}
            {totalItems > 0 && (
              <div className="flex flex-col sm:flex-row justify-between items-center mt-8 p-4 bg-white rounded-lg shadow-md">
                <div className="text-gray-600 mb-4 sm:mb-0">
                  {`${(currentPage - 1) * itemsPerPage + 1} to ${Math.min(
                    currentPage * itemsPerPage,
                    totalItems,
                  )} of ${totalItems} items`}
                </div>
                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-md font-semibold ${
                        currentPage === page ? "bg-[#ff9900] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      } transition-colors`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <div className="flex items-center mt-4 sm:mt-0">
                  <span className="text-gray-600 mr-2">Show</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number.parseInt(e.target.value))
                      setCurrentPage(1) // Reset to first page on items per page change
                    }}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff9900]"
                  >
                    <option value="10">10 rows</option>
                    <option value="20">20 rows</option>
                    <option value="50">50 rows</option>
                  </select>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Modals */}
      {modalType === "category" && <AddCategoryModal onClose={closeModal} onSuccess={() => fetchCategories()} />}
      {modalType === "subcategory" && <AddSubCategoryModal onClose={closeModal} onSuccess={() => fetchCategories()} />}
      {modalType === "product" && <AddProductModal onClose={closeModal} onSuccess={() => fetchProducts()} />}

      {/* Offcanvas Drawer */}
      {showWishlist && <WishlistDrawer onClose={() => setShowWishlist(false)} />}
    </div>
  )
}

export default HomePage
