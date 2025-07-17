// src/components/AddSubCategoryModal.jsx

import { useEffect, useState } from "react"
import { API_BASE } from "../utils/api"

const AddSubCategoryModal = ({ onClose, onSuccess }) => {
    const [name, setName] = useState("")
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState("")

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/categories`)
                const data = await res.json()
                setCategories(data)
            } catch (error) {
                console.error("Failed to fetch categories:", error)
            }
        }
        fetchCategories()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        const res = await fetch(`${API_BASE}/api/categories/subcategories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name, categoryId }),
        })
        const data = await res.json()
        if (res.ok) {
            alert("Subcategory created!")
            onSuccess?.()
            onClose()
        } else {
            alert(data.message || "Error")
        }
    }

    return (
        <div className="fixed inset-0 bg-[#0000004D] bg-opacity-50 flex items-center justify-center z-50 p-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Add Sub Category</h2>
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#ff9900]"
                    required
                >
                    <option value="" disabled>
                        -- Select a Category --
                    </option>
                    {Array.isArray(categories) && categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Enter sub category name"
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

export default AddSubCategoryModal
