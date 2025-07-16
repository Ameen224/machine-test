// middleware/upload

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

const fileFilter = function (req, file, cb) {
    const allowedExtensions = /jpeg|jpg|png|webp/;
    const fileExtension = allowedExtensions.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimeType = allowedExtensions.test(file.mimetype);

    if (fileExtension && mimeType) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed (jpeg, jpg, png, webp)"));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;
