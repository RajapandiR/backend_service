import { express } from "../../helpers/path";
import UserController from "./controller"
const app = express.Router();

app.route("/").get(UserController.getUsers)
app.route("/mark").post(UserController.createMark)
app.route("/mark").get(UserController.getMarks)

export const UserRouter = app;