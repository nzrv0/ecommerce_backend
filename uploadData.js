import ProductModel from "./models/product.model";
import CategoryModel from "./models/category.model";
import fakeData from "./data/fakeData.json";

export async function createProduct() {
    const productExists = await ProductModel.find();
    if (productExists.length === 0) {
        const data = await ProductModel.insertMany(fakeData);
    } else {
        console.log("products already exists");
    }
}

export async function createCategories() {
    const categoryExists = await CategoryModel.find();
    if (categoryExists.length === 0) {
        const get_name = await ProductModel.distinct("category");
        const category_names = get_name.map((item) => {
            return { name: item };
        });

        const data = await CategoryModel.insertMany(category_names);
    } else {
        console.log("category already exists");
    }
}
