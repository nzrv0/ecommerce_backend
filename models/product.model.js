import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        _id: String,
        name: { type: String, unique: true, required: true },
        image: String,
        description: { type: String, required: true },
        price: { type: Number, required: true },
        rating: { type: Number, max: 5, min: 0 },
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        category: { type: "String", required: true },
        inStock: Boolean,
        colours: [{ type: String, required: true }],
        quantity: { type: Number, required: true, min: 1 },
        discount: Number,
    },
    { collection: "fake_data" }
);

productSchema.index({ name: "text" });
const Product =
    mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
