// src/pages/ProductDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    const res = await fetch(`http://localhost:5000/api/products/${id}`);
    const data = await res.json();
    if (res.ok) setProduct(data);
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>

      <h3 className="font-semibold mb-2">Variants</h3>
      <ul className="space-y-2">
        {product.variants.map((v, i) => (
          <li
            key={i}
            className="border p-2 rounded flex justify-between text-sm"
          >
            <span>RAM: {v.ram}</span>
            <span>₹{v.price}</span>
            <span>Qty: {v.quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDetailPage;
