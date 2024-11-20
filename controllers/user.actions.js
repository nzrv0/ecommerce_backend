import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import Category from "../models/category.model.js";
import Product from "../models//product.model.js";
export async function fetchUserInfo(email) {
    try {
        const data = await User.findOne({ email: email }, "-password").populate(
            [
                { path: "whishlist", model: Product },
                { path: "orders.order", model: Product },
                { path: "purches.purched", model: Product },
            ]
        );
        return data;
    } catch (error) {
        throw new Error(`Can't find user realted to email: ${error.message}`);
    }
}

export async function updateUser(
    firstName,
    lastName,
    email,
    address,
    password,
    newPassword
) {
    try {
        const validate = await userValidate(email, password);
        if (validate) {
            const hashPassword = await bcrypt.hash(newPassword, 10);
            await User.findOneAndUpdate(
                { email: email },
                {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    address: address,
                    password: hashPassword,
                }
            );
        }
    } catch (error) {
        throw new Error(`Faild to update user: ${error}`);
    }
}

export async function userValidate(email, password) {
    try {
        const user = await User.findOne({ email: email }, "password");
        if (!user) throw new Error("Wrong Email");

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) throw new Error("Wrong password");
        return user;
    } catch (error) {
        throw new Error(`Faild to get user ${error}`);
    }
}

export async function userCreate(firstName, lastName, email, password) {
    try {
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return "User already exists";
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const user = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashPassword,
            });
            await user.save();
        }
    } catch (error) {
        throw new Error(`Faild to create user ${error}`);
    }
}

export async function addWishList(email, wish) {
    try {
        const match = await User.findOne({ email: email }, "whishlist");
        if (match.whishlist?.includes(wish)) {
            await User.updateOne(
                { email: email },
                {
                    $pull: { whishlist: wish },
                }
            );
        } else {
            await User.findOneAndUpdate(
                { email: email },
                {
                    $addToSet: { whishlist: wish },
                }
            );
        }
    } catch (err) {
        throw new Error(`Faild to add wish ${err}`);
    }
}
export async function addToCart(email, id, quantity) {
    try {
        const match = await User.findOne({
            email: email,
            "orders.order": id,
        });

        if (match) {
            await User.updateOne(
                { email: email, "orders.order": id },
                {
                    $inc: { "orders.$.quantity": quantity },
                }
            );
        } else {
            await User.findOneAndUpdate(
                { email: email },
                {
                    $addToSet: {
                        orders: { order: id, quantity: quantity },
                    },
                }
            );
        }
        await User.findOneAndUpdate(
            { email: email, "orders.order": id },
            {
                $pull: { orders: { quantity: 0 } },
            }
        );
    } catch (err) {
        throw new Error(`Faild to add to cart ${err}`);
    }
}
export async function addToPurches(email, id, quantity) {
    try {
        await User.findOneAndUpdate(
            { email: email },
            {
                $addToSet: {
                    purches: { purched: id, quantity: quantity },
                },
            }
        );
    } catch (err) {
        throw new Error(`Faild to add to cart ${err}`);
    }
}
