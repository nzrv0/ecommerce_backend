import { jwtVerify } from "jose";

export async function verifyToken(req, res, next) {
    try {
        let token = req.header("Authorization");
        if (!token) return res.status(403).send("Accsess denied");
        if (token?.startsWith("token ")) {
            token = token.slice(5, token.length).trimLeft();
        }
        const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

        const { payload } = await jwtVerify(token, secret);
        req.user = payload;
        next();
    } catch (err) {
        throw new Error(`something get wronge ${err}`);
    }
}
