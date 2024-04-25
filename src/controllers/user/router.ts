import { express } from "../../helpers/path";
import UserController from "./controller"
const app = express.Router();

app.route("/")
    .post(UserController.createUser)
    .get(UserController.getUsers)

export const UserRouter = app;