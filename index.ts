import { LoginUserRouter, UserRouter, express, mongoose, Middleware } from "./src/helpers/path"
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("Rajapandi@")
})

const options: any = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
};
mongoose.connect(process.env.DB_URL, options);

app.use("/api/user/auth", LoginUserRouter)
app.use("/api/user", Middleware.loginMiddleware, UserRouter)
app.listen(port, () => {
    console.log(`Server running at ${port}`);
})