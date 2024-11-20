import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, min: 8, max: 20, required: true },

        orders: [
            {
                type: Object,
                order: {
                    type: String,
                    ref: "Product",
                },
                quantity: Number,
            },
        ],
        whishlist: [
            {
                type: String,
                ref: "Product",
            },
        ],

        purches: [
            {
                type: Object,
                purched: {
                    type: String,
                    ref: "Product",
                },
                quantity: Number,
            },
        ],
        address: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
