import { Request, Response, UserModel, Utils, Responder, Message, HttpStatus, Jwt } from "../../helpers/path";
import { IMark, MarkModel } from "../../schemas/markSchema";

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
        console.log("ssss");

        let users = await UserModel.find({}, { password: 0 });
        if (users) Responder.sendSuccessData({ users }, Message.users, res)
        else Responder.sendFailureForbiddenMessage(Message.users404, res)
    }

    loginUser = async (req: Request, res: Response) => {
        console.log("ssss");

        let data = req.body;
        let pwd = Utils.createHashPwd(data.password);
        let user = await UserModel.findOne({ email: data.email, password: pwd });
        if (!user) return Responder.sendFailureUnAuthMessage(Message.invalid, res);
        const token = Jwt.issueToken({ userId: user._id });
        Responder.sendSuccessData({ user: user, token: token }, Message.login, res)
    }


    createMark = async (req: any, res: Response) => {
        let data: any = req.body;
        data.user = req.user._id;
        let userData = await MarkModel.create(data);
        if (userData) Responder.sendSuccessMessage("Mark created", res)
        else Responder.sendFailureForbiddenMessage(Message.userCreated404, res)
    }

    getMarks = async (req: any, res: Response) => {
        console.log("mark list");
        const query: any = req.query;
        const options: any = Utils.returnPaginatinPageLimit(query);
        options.sort = { _id: -1 }
        options.populate = { path: "user", select: "username _id", }

        let marks = await MarkModel.paginate(query, options)
        if (marks) Responder.sendPaginateSuccessData(marks, Message.users, res, "marks")
        else Responder.sendFailureForbiddenMessage(Message.users404, res)
    }
}

export default new UserController();