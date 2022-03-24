require("dotenv").config();
const express = require("express");
const cookieSession = require("cookie-session");
const cors = require("cors");

const connect = require("./configs/db");
const passport = require("./configs/google-oauth");
const authController = require("./controllers/auth.controller");
const userController = require("./controllers/user.controller");
const productController = require("./controllers/product.controller");

let app = express();

app.use(express.json());

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authController);
app.use("/users", userController);
app.use("/products", productController);

app.get("/", (req, res) => {
  res.status(200).send("Home Page");
});

app.listen(process.env.BACKEND_PORT, async () => {
  try {
    await connect();
    console.log("Running on PORT: ", process.env.BACKEND_PORT);
  } catch (e) {
    console.log(e.message);
  }
});
