import { Request, Response, UserModel, Utils, Responder, Message } from "../../helpers/path";

class UserController {
    constructor() { }

    createUser = async (req: Request, res: Response) => {
        let data: any = req.body;
        data.password = Utils.createHashPwd(data.password);
        let user = await UserModel.findOne({ email: data.email });
        if (user) return Responder.sendFailureConflictMessage(Message.userExist404, res)
        let userData = await UserModel.create(data);
        if (userData) Responder.sendSuccessMessage(Message.userCreated, res)
        else Responder.sendFailureForbiddenMessage(Message.userCreated404, res)

    }

    getUsers = async (req: Request, res: Response) => {
        let users = await UserModel.find({});
        if (users) Responder.sendSuccessData({ users }, Message.users, res)
        else Responder.sendFailureForbiddenMessage(Message.users404, res)
    }
}

export default new UserController();