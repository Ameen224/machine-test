// controllers/wishlistControllerse

const User = require("../models/User")
const Product = require("../models/Product")


// to get user wishlist
const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate({
            path: "wishlist",
            populate: [
                { path: "category", select: "name" },
                { path: "subCategory", select: "name" },
            ],
        })
        res.json(user.wishlist)
    } catch (error) {
                console.log(error);

        res.status(500).json({ message: "Server error", error: error.message })
    }
}

// to Add  wishlist
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(req.user._id);

    // Optional fallback if wishlist is undefined
    if (!user.wishlist) user.wishlist = [];

    if (user.wishlist.includes(product._id)) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    user.wishlist.push(product._id);
    await user.save();

    res.json({ message: "Product added to wishlist" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove from wishlist
const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params

        const user = await User.findById(req.user._id)
        user.wishlist = user.wishlist.filter((id) => id.toString() !== productId)
        await user.save()

        res.json({ message: "Product removed from wishlist" })
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

module.exports = {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
}
