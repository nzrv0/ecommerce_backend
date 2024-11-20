import fs from "fs";
import mongoose from "mongoose";
import Product from "./models/product.model.js";
const path = "./data/static";
export async function create_images() {
    const files = fs.readdirSync(path);

    files.forEach(async (item) => {
        const files_format = item.split(".")[0];
        const base = fs.readFileSync(`${path}/${item}`, "base64");
        const product = await Product.findOneAndUpdate(
            { name: files_format },
            { image: base }
        );
        console.log(product);
    });
}
