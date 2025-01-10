import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productImageController, productListController, realtedProductController, searchProductController, updateProductController } from "../controllers/ProductController.js";
import formidable from "express-formidable";

const router = express.Router()

// routess
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

// get Products
router.get('/get-product', getProductController)

//single get product
router.get('/get-product/:slug', getSingleProductController)

//get photo
router.get('/product-photo/:pid', productImageController);

//get delete
router.delete("/delete-product/:pid", deleteProductController);

//Update routess
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)

//filter prodict
router.post('/product-filters', productFiltersController)

//count product
router.get('/product-count', productCountController)

// product page per
router.get('/product-list/:page', productListController)

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

export default router;