import express from"express";
import { getProducts, 
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getNewArrivals,
    getCategories,
    getCategory
} from "../controller/productController.js";
import {protect, admin} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/newArrivals').get(getNewArrivals);
router.route('/byId/:id').get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);
router.route('/byId/:id/reviews').post(protect, createProductReview);
router.route('/category').get(getCategories);
router.route('/category/:name').get(getCategory);

export default router;