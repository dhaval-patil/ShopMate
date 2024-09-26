import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from 'fs'

export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { image } = req.files;

        // validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is Required' })
            case !description:
                return res.status(500).send({ error: 'description is Required' })
            case !price:
                return res.status(500).send({ error: 'price is Required' })
            case !category:
                return res.status(500).send({ error: 'Category is Required' })
            case !quantity:
                return res.status(500).send({ error: 'Quantity is Required' })
            case image && image.size > 1000000:
                return res.status(500).send({ error: 'Photo is required and should be less than 1MB' })
        }
        const products = new productModel({ ...req.fields, slug: slugify(name) })
        if (image) {
            products.image.data = fs.readFileSync(image.path)
            products.image.contentType = image.type
        }

        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Creaated Successfully",
            products
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Creating product'
        })
    }
};

// get all productss

export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-image").limit(12).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: 'AllProducts',
            countTotal: products.length,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting products',
            error: error.message,
        })

    }
};

// single get product

export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");
        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Eror while getitng single product",
            error,
        });
    }
};

// get image
export const productImageController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("image")
        if (product.image.data) {
            res.set('Content-type', product.image.contentType)
            return res.status(200).send(product.image.data)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while getting image",
            error,
        })

    }
};


// delete product

export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success:true,
            message:"Product Deleted SuccessFully",
        })
    } catch (error) {
        console.log(error),
            res.status(500).send({
                success: false,
                message: "Error while deleting Product",
                error
            })
    }
};

// update product
export const updateProductController = async(req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { image } = req.files;

        // validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is Required' })
            case !description:
                return res.status(500).send({ error: 'description is Required' })
            case !price:
                return res.status(500).send({ error: 'price is Required' })
            case !category:
                return res.status(500).send({ error: 'Category is Required' })
            case !quantity:
                return res.status(500).send({ error: 'Quantity is Required' })
            case image && image.size > 1000000:
                return res.status(500).send({ error: 'Photo is required and should be less than 1MB' })
        }
        const products = await productModel.findByIdAndUpdate(req.params.pid,
            {...req.fields, slug:slugify(name)}, {new:true}
        )
        if (image) {
            products.image.data = fs.readFileSync(image.path)
            products.image.contentType = image.type
        }

        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            products
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Updating product'
        })
    }
};