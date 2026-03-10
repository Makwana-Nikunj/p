import { Router } from "express";
import {
    createProduct,
    getProducts,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    approveProduct,
    rejectProduct,
    getPendingProducts,
    getApprovedProducts,
    getRejectedProducts
} from "../controllers/product.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt, isAdmin } from "../middlewares/auth.middleware.js";


const router = Router();

// ============================================
// USER ROUTES
// ============================================

router.route("/sell-product").post(
    verifyJwt,
    upload.fields([{ name: "productImage", maxCount: 1 }]),
    createProduct
);
router.route("/products").get(getProducts);
router.route("/products/:id").patch(
    verifyJwt,
    upload.fields([{ name: "productImage", maxCount: 1 }]),
    updateProduct
);
router.route("/products/:id")
    .delete(verifyJwt, deleteProduct)
    .get(getProductById);

// ============================================
// ADMIN ROUTES
// ============================================

router.route("/products/:id/approve").patch(verifyJwt, isAdmin, approveProduct);
router.route("/products/:id/reject").patch(verifyJwt, isAdmin, rejectProduct);
router.route("/products/pending").get(verifyJwt, isAdmin, getPendingProducts);
router.route("/products/approved").get(verifyJwt, isAdmin, getApprovedProducts);
router.route("/products/rejected").get(verifyJwt, isAdmin, getRejectedProducts);
router.route("/all-products").get(verifyJwt, isAdmin, getAllProducts);




export default router;