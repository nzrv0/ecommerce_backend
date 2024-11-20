import express from "express";
import connectDB from "./mongoose.js";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import productsRoute from "./routes/products.js";
import categoryRoute from "./routes/category.js";
import usersRoute from "./routes/users.js";

import { create_images } from "./upload_images.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());

app.use("/", productsRoute);
app.use("/", usersRoute);
app.use("/", categoryRoute);

const PORT = process.env.PORT || 6001;
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port: ${PORT}`);
});
app.get("/loadimages", async (req, res) => {
    await create_images();
    res.status(200).send("everyhtin okey");
});
app.get("*", async (req, res) => {
    await connectDB();
    res.status(200).send("working");
});
// module.exports = app;

// createProduct();
// createCategories();
