import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getProductController, getSingleProductController, productImageController, updateProductController } from "../controllers/ProductController.js";
import formidable from "express-formidable";

const router = express.Router()

// routess
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

// get Products
router.get('/get-product', getProductController)

//single get product
router.get('/get-product/:slug', getSingleProductController)

//get photo
router.get("/product-image/:pid", productImageController);

//get delete
router.delete("/product", deleteProductController);

//Update routess
router.post('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)


export default router;