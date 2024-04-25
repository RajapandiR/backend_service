import { express } from "../../helpers/path";
import UserController from "./controller"
const app = express.Router();

app.route("/").get(UserController.getUsers)

export const UserRouter = app;