// src/components/WishlistDrawer.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WishlistDrawer = ({ onClose }) => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const fetchWishlist = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/wishlist", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) setWishlist(data);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 z-50 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4 flex justify-between">
        Wishlist
        <button
          onClick={onClose}
          className="text-red-600 text-sm underline"
        >
          Close
        </button>
      </h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">No items in wishlist</p>
      ) : (
        wishlist.map((item) => (
          <div
            key={item._id}
            className="border-b py-2 cursor-pointer hover:bg-gray-100 px-2 rounded"
            onClick={() => navigate(`/product/${item._id}`)}
          >
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-600">
              {item.description?.slice(0, 50)}...
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default WishlistDrawer;
