import { NextFunction } from "express";
import { Jwt, Message, Request, Responder, Response, UserModel } from "../helpers/path";
import jwt from "jsonwebtoken"
class MiddlewareClass {
    loginMiddleware = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.headers["authorization"]) return Responder.sendFailureUnAuthMessage(Message.notToken404, res)
            const token = req.headers["authorization"].split(' ')[1]
            let { userId, } = await Jwt.verifyToken(token);
            // if (exp > Date.now()) return Responder.sendFailureForbiddenMessage("token expired", res)
            let user = await UserModel.find({ _id: userId }, { password: 0 });
            if (!user) return Responder.sendFailureUnAuthMessage(Message.unAuth, res)
            req["user"] = user;
            next()
        } catch (err) {
            return Responder.sendFailureUnAuthMessage(Message.notToken404, res)
        }
    }
}

export const Middleware = new MiddlewareClass();