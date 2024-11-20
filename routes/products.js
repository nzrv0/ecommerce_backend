import express from "express";
import {
    fetchProductById,
    fetchProdcuts,
    fetchAllProduct,
    fetchProduct,
} from "../controllers/product.actions.js";

const router = express.Router();

router.get("/products/product/id/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await fetchProductById(id);
        res.status(200).json(product);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

router.get("/products/product/category/:category", async (req, res) => {
    try {
        const { category } = req.params;
        const product = await fetchProdcuts(category);
        res.status(200).json(product);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});
router.get("/products", async (req, res) => {
    try {
        const { size } = req.query;
        const product = await fetchAllProduct(size);
        res.status(200).json(product);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});
router.get("/product", async (req, res) => {
    try {
        const { name } = req.query;
        const product = await fetchProduct(name);
        res.status(200).json(product);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});
export default router;
