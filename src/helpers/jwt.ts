import jwt from "jsonwebtoken"

class JwtClass {
    issueToken(payload) {
        return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1d' });
    }
    verifyToken(payload) {
        return jwt.verify(payload, process.env.TOKEN_SECRET)
    }
}

export const Jwt =  new JwtClass();


