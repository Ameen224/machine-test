// src/components/AddProductModal.jsx
import { useEffect, useState } from "react";

const AddProductModal = ({ onClose, onSuccess }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [variants, setVariants] = useState([{ ram: "", price: "", quantity: "" }]);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/categories/subcategories")
      .then((res) => res.json())
      .then((data) => setSubCategories(data));
  }, []);

  const addVariant = () => {
    setVariants([...variants, { ram: "", price: "", quantity: "" }]);
  };

  const handleVariantChange = (i, field, value) => {
    const updated = [...variants];
    updated[i][field] = value;
    setVariants(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, description, variants, subCategory }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Product added!");
      onSuccess?.();
      onClose();
    } else {
      alert(data.message || "Error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-lg"
      >
        <h2 className="text-xl font-bold mb-4">Add Product</h2>
        <input
          placeholder="Name"
          className="w-full border p-2 rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <select
          className="w-full border p-2 rounded mb-4"
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

        <h4 className="font-semibold mb-2">Variants:</h4>
        {variants.map((variant, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              placeholder="RAM"
              className="border p-1 rounded w-1/3"
              value={variant.ram}
              onChange={(e) => handleVariantChange(idx, "ram", e.target.value)}
            />
            <input
              placeholder="Price"
              className="border p-1 rounded w-1/3"
              value={variant.price}
              onChange={(e) => handleVariantChange(idx, "price", e.target.value)}
            />
            <input
              placeholder="Qty"
              className="border p-1 rounded w-1/3"
              value={variant.quantity}
              onChange={(e) => handleVariantChange(idx, "quantity", e.target.value)}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addVariant}
          className="text-sm text-blue-600 underline mb-4"
        >
          + Add Variant
        </button>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductModal;
