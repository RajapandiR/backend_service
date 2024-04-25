import { Jwt, Message, Request, Responder, Response, UserModel } from "../helpers/path";
class MiddlewareClass {
    async loginMiddleware(req: Request, res: Response, next) {
        if (!req.headers["authorization"]) return Responder.sendFailureUnAuthMessage(Message.notToken404, res)
        let decoded = Jwt.verifyToken(req.headers["authorization"].split(' ')[1]);
        if (!decoded) return Responder.sendFailureForbiddenMessage(Message.token404, res)
        let user = await UserModel.find({ _id: decoded.userId }, { password: 0 });
        if (!user) return Responder.sendFailureUnAuthMessage(Message.unAuth, res)
        req["user"] = user;
        next()
    }
}

export const Middleware = new MiddlewareClass();