import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
export async function fetchCategory() {
    try {
        const data = await Category.find({}, "name");
        return data;
    } catch (error) {
        throw new Error(`Faild to catch categories ${error}`);
    }
}
