import Product from "../models/product.model.js";
export async function fetchProdcuts(category) {
    try {
        const data = Product.find({ category: category });

        return data;
    } catch (error) {
        throw new Error(`Faild to catch categories ${error}`);
    }
}

export async function fetchProductById(id) {
    try {
        const data = await Product.findById(id);
        return data;
    } catch (err) {
        throw new Error(`Could not get a product from database ${err}`);
    }
}
export async function fetchAllProduct(size) {
    try {
        const data = await Product.find().limit(size);
        return data;
    } catch (err) {
        throw new Error(`Could not get a product from database ${err}`);
    }
}
export async function fetchProduct(name) {
    try {
        if (name) {
            const product = Product.find({
                name: { $regex: name, $options: "i" },
            }).limit(5);
            return product;
        }
    } catch (err) {
        throw new Error(`Could not get a product from database ${err}`);
    }
}
