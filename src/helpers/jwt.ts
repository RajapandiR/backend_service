import jwt from "jsonwebtoken"

class JwtClass {
    issueToken(payload: any) {
        return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '2m' });
    }
    verifyToken(payload: any) {
        return jwt.verify(payload, process.env.TOKEN_SECRET)
    }
}

export const Jwt = new JwtClass();


