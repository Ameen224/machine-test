// src/components/Header.jsx
import { useNavigate } from "react-router-dom";

const Header = ({ onOpenWishlist, onOpenModals }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1
        onClick={() => navigate("/home")}
        className="text-xl font-bold cursor-pointer"
      >
        MyShop
      </h1>
      <div className="space-x-2">
        <button
          onClick={() => onOpenModals("category")}
          className="bg-white text-blue-600 px-3 py-1 rounded"
        >
          + Category
        </button>
        <button
          onClick={() => onOpenModals("subcategory")}
          className="bg-white text-blue-600 px-3 py-1 rounded"
        >
          + Subcategory
        </button>
        <button
          onClick={() => onOpenModals("product")}
          className="bg-white text-blue-600 px-3 py-1 rounded"
        >
          + Product
        </button>
        <button
          onClick={onOpenWishlist}
          className="bg-white text-blue-600 px-3 py-1 rounded"
        >
          Wishlist
        </button>
      </div>
    </header>
  );
};

export default Header;
