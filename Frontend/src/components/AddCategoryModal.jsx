// src/components/AddCategoryModal.jsx
import { useState } from "react"
import { API_BASE } from "../utils/api"

const AddCategoryModal = ({ onClose, onSuccess }) => {
  const [name, setName] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem("token")
    console.log("Token:", token)
    if (!token) {
      alert("You must be logged in to add a category.")
      return
    }

    try {
      const res = await fetch(`${API_BASE}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({name: name }),
      })

      const data = await res.json()

      if (res.ok) {
        alert("Category created!")
        onSuccess?.()
        onClose()
      } else {
        alert(data.message || "Failed to create category.")
      }
    } catch (error) {
      console.error("Error creating category:", error)
      alert("Something went wrong while adding the category.")
    }
  }

  return (
    <div className="fixed inset-0 bg-[#0000004D] bg-opacity-100 flex items-center justify-center z-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Category</h2>
        <input
          type="text"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-[#ff9900]"
        />
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors font-semibold"
          >
            DISCARD
          </button>
          <button
            type="submit"
            className="bg-[#ff9900] text-white px-6 py-2 rounded-md hover:bg-[#e68a00] transition-colors font-semibold"
          >
            ADD
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddCategoryModal
