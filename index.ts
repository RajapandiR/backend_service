import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
const port = 8080;

app.get("/", (req, res) => {
    res.send("Rajapandi@")
})

app.listen(port, () => {
    console.log(`Server running at ${port}`);
})