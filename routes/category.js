import express from "express";
import { fetchCategory } from "../controllers/category.actions.js";

const router = express.Router();

router.get("/category", async (req, res) => {
    try {
        const { category } = req.params;
        const data = await fetchCategory(category);
        res.status(200).json(data);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});
export default router;
