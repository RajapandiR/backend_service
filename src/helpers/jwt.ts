import jwt from "jsonwebtoken"

class JwtClass {
    issueToken(payload) {
        return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1d' });
    }
    verifyToken(payload) {
        return jwt.verify(payload, process.env.TOKEN_SECRET)

        // jwt.verify(payload, process.env.TOKEN_SECRET, (err, user) => {
        //     if (err) {
        //         console.log("err", err);
        //         return null
        //     }
        //     else user
        // })

    }
}

export const Jwt = new JwtClass();


