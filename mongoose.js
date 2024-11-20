import mongoose from "mongoose";

const connectDB = async () => {
    // mongoose.set("strictQuery", true);

    if (!process.env.MONGODB) return console.log("There is not a correct url");
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Succsesfuly connected");
        mongoose.set("debug", true);
    } catch (err) {
        console.log(err);
    }
};
export default connectDB;
