// src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import WishlistDrawer from "../components/WishlistDrawer";
import AddCategoryModal from "../components/AddCategoryModal";
import AddSubCategoryModal from "../components/AddSubCategoryModal";
import AddProductModal from "../components/AddProductModal";
import { API_BASE } from "../utilse/api";


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);
  const [modalType, setModalType] = useState(null); // 'category', 'subcategory', 'product'

  const fetchProducts = async () => {
    const res = await  fetch(`${API_BASE}/api/products`)
;
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddWishlist = async (productId) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/api/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();
    if (res.ok) alert("Added to wishlist");
    else alert(data.message || "Something went wrong");
  };

  const closeModal = () => setModalType(null);

  return (
    <div>
      <Header
        onOpenWishlist={() => setShowWishlist(true)}
        onOpenModals={(type) => setModalType(type)}
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {products.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            onAddWishlist={handleAddWishlist}
          />
        ))}
      </div>

      {/* Modals */}
      {modalType === "category" && (
        <AddCategoryModal onClose={closeModal} onSuccess={fetchProducts} />
      )}
      {modalType === "subcategory" && (
        <AddSubCategoryModal onClose={closeModal} />
      )}
      {modalType === "product" && (
        <AddProductModal onClose={closeModal} onSuccess={fetchProducts} />
      )}

      {/* Offcanvas Drawer */}
      {showWishlist && (
        <WishlistDrawer onClose={() => setShowWishlist(false)} />
      )}
    </div>
  );
};

export default HomePage;
