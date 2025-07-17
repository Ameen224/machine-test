// src/components/AddProductModal.jsx

import { useEffect, useState } from "react"
import { Plus, Minus, Upload } from "lucide-react"
import { API_BASE } from "../utils/api"

const AddProductModal = ({ onClose, onSuccess }) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [variants, setVariants] = useState([{ ram: "", price: "", quantity: 1 }])
    const [subCategories, setSubCategories] = useState([])
    const [subCategory, setSubCategory] = useState("")
    const [images, setImages] = useState([])

    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/categories/subcategories`)
                const data = await res.json()
                console.log("Fetched subcategories:", data)

                if (Array.isArray(data)) {
                    setSubCategories(data)
                } else {
                    setSubCategories([])
                    console.error("Expected an array but got:", data)
                }
            } catch (error) {
                console.error("Failed to fetch subcategories:", error)
                setSubCategories([])
            }
        }
        fetchSubCategories()
    }, [])

    const addVariant = () => {
        setVariants([...variants, { ram: "", price: "", quantity: 1 }])
    }

    const handleVariantChange = (i, field, value) => {
        const updated = [...variants]
        updated[i][field] = value
        setVariants(updated)
    }

    const handleQuantityChange = (i, delta) => {
        const updated = [...variants]
        updated[i].quantity = Math.max(1, (updated[i].quantity || 0) + delta)
        setVariants(updated)
    }

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files)
        setImages((prev) => [...prev, ...files])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")

        const formData = new FormData()
        formData.append("name", name)
        formData.append("description", description)
        formData.append("subCategory", subCategory)
        formData.append("variants", JSON.stringify(variants))
        images.forEach((file) => formData.append("images", file))
        console.log("Submitting product with data:", formData);
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }



        try {
            const res = await fetch(`${API_BASE}/api/products`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                    // Do NOT set Content-Type; browser sets it with boundary
                },
                body: formData,
            })

            const data = await res.json()

            if (res.ok) {
                alert("Product added!")
                onSuccess?.()
                onClose()
            } else {
                alert(data.message || "Error")
            }
        } catch (err) {
            console.error("Submit error:", err)
            alert("Something went wrong")
        }
    }

    return (
        <div className="fixed inset-0 bg-[#0000004D] bg-opacity-50 flex items-center justify-center z-50 p-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>

                {/* Title */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Title :</label>
                    <input
                        placeholder="HP AMD Ryzen 3"
                        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff9900]"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                {/* Variants */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Variants :</label>
                    {variants.map((variant, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row gap-3 mb-3 items-center">
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <span className="text-gray-600">Ram:</span>
                                <input
                                    placeholder="4 GB"
                                    className="border border-gray-300 p-2 rounded-md w-full sm:w-24 focus:outline-none focus:ring-2 focus:ring-[#ff9900]"
                                    value={variant.ram}
                                    onChange={(e) => handleVariantChange(idx, "ram", e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <span className="text-gray-600">Price:</span>
                                <input
                                    type="number"
                                    placeholder="$529.99"
                                    className="border border-gray-300 p-2 rounded-md w-full sm:w-28 focus:outline-none focus:ring-2 focus:ring-[#ff9900]"
                                    value={variant.price}
                                    onChange={(e) => handleVariantChange(idx, "price", e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <span className="text-gray-600">Qty:</span>
                                <div className="flex items-center border border-gray-300 rounded-md">
                                    <button
                                        type="button"
                                        onClick={() => handleQuantityChange(idx, -1)}
                                        className="p-2 hover:bg-gray-100 rounded-l-md"
                                    >
                                        <Minus className="w-4 h-4 text-gray-600" />
                                    </button>
                                    <input
                                        type="number"
                                        className="w-12 text-center border-x border-gray-300 p-2 focus:outline-none"
                                        value={variant.quantity}
                                        onChange={(e) =>
                                            handleVariantChange(idx, "quantity", parseInt(e.target.value) || 1)
                                        }
                                        min="1"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleQuantityChange(idx, 1)}
                                        className="p-2 hover:bg-gray-100 rounded-r-md"
                                    >
                                        <Plus className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addVariant}
                        className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors mt-2"
                    >
                        Add Variant
                    </button>
                </div>

                {/* Subcategory */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Sub category :</label>
                    <select
                        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff9900]"
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Subcategory</option>
                        {subCategories.map((sub) => (
                            <option key={sub._id} value={sub._id}>
                                {sub.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Description :</label>
                    <textarea
                        placeholder="Enter product description..."
                        className="w-full border border-gray-300 p-3 rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#ff9900]"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                {/* Images */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Upload Images:</label>
                    <div className="flex items-center gap-4 flex-wrap">
                        {images.map((file, index) => (
                            <div key={index} className="relative w-24 h-24 border border-gray-300 rounded-md overflow-hidden">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                        <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                            <input type="file" multiple onChange={handleImageUpload} className="hidden" accept="image/*" />
                            <Upload className="w-8 h-8 text-gray-400" />
                        </label>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 font-semibold"
                    >
                        DISCARD
                    </button>
                    <button
                        type="submit"
                        className="bg-[#ff9900] text-white px-6 py-2 rounded-md hover:bg-[#e68a00] font-semibold"
                    >
                        ADD
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddProductModal
