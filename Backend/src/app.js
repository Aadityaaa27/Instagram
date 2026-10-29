const express = require('express');
const cookieParser = require("cookie-parser")
const cors = require("cors")
const morgan = require("morgan")
const path = require("path")


const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(morgan("dev"))
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: [ "GET", "POST", "PUT", "DELETE" ],
}))

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" })
})

/* require routes */
const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")
const userRouter = require("./routes/user.routes")

/* using routes */
app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)
app.use("/api/users", userRouter)

const frontendDistPath = path.join(__dirname, "../../Frontend/dist")
app.use(express.static(frontendDistPath))
app.use((req, res, next) => {
    if (req.method !== "GET" || req.path.startsWith("/api/")) {
        return next()
    }

    res.sendFile(path.join(frontendDistPath, "index.html"))
})

module.exports = app;