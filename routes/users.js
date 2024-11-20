import express from "express";
import { SignJWT } from "jose";
import {
    userCreate,
    fetchUserInfo,
    userValidate,
    addWishList,
    addToCart,
    updateUser,
    addToPurches,
} from "../controllers/user.actions.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.get("/user/validate", verifyToken, async (req, res) => {
    try {
        const { email } = req.user;
        const user = await fetchUserInfo(email);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

router.post("/user/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userValidate(email, password);
        const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
        const token = await new SignJWT({ email: email })
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setExpirationTime("7d")
            .sign(secret);
        delete user.password;
        res.status(200).json({ user, token });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

router.post("/user/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const resoult = await userCreate(firstName, lastName, email, password);
        res.status(201).json({ message: resoult });
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
});

router.post("/user/update", verifyToken, async (req, res) => {
    try {
        const { firstName, lastName, email, address, password, newPassword } =
            req.body;
        const resoult = await updateUser(
            firstName,
            lastName,
            email,
            address,
            password,
            newPassword
        );
        res.status(200).json(resoult);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.post("/user/addwish", verifyToken, async (req, res) => {
    try {
        const { email } = req.user;
        const { wish } = req.body;

        const resoult = await addWishList(email, wish);
        res.status(200).json({ message: resoult });
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
});

router.post("/user/addcart", verifyToken, async (req, res) => {
    try {
        const { email } = req.user;
        const { id, quantity } = req.body;
        const resoult = await addToCart(email, id, quantity);
        res.status(200).json({ message: resoult });
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
});

router.post("/user/addpurches", verifyToken, async (req, res) => {
    try {
        const { email } = req.user;
        const { id, quantity } = req.body;
        const resoult = await addToPurches(email, id, quantity);
        res.status(200).json({ message: resoult });
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
});

export default router;
