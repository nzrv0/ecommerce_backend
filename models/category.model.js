import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        _id: String,
        name: { type: String, required: true, unique: true },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
    },
    { collection: "categories" }
);

const Category =
    mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
