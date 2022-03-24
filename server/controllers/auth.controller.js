const express = require("express");

const User = require("../models/User.model");
const authenticate = require("../middlewares/authenticate.middleware");

const passport = require("../configs/google-oauth");
const { newToken } = require("../configs/jwt");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    // 1. check if the email is already in user
    let user = await User.findOne({ email: req.body.email });
    // 2. if user exists, do not create a new user and inform that try with a different email
    if (user) {
      return res
        .status(400)
        .json("User already exists, try with a diferent email adddres");
    }
    let payload = req.body;
    if (!payload.roles && payload.roles.length === 0) {
      payload.roles = ["customer"];
    }
    // 3. if user does not exists, create one
    user = await User.create(payload);

    let token = newToken(user);
    //
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ status: "failed", message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    // 1. does user exists
    let user = await User.findOne({ email: req.body.email });
    // 2. if does not then return 400
    if (!user) {
      return res.status(400).json("User email or password is incorrect");
    }
    // 3. if exists then check if password is matching
    const matching = user.checkPassword(req.body.password);
    // 4. if not matching then throw 400
    if (!matching) {
      return res.status(400).json("User email or password is incorrect");
    }
    // 5. if matching then give him the token
    let token = newToken(user);
    return res.status(200).json({ token, user });
  } catch (err) {
    return res.status(500).json({ status: "failed", message: err.message });
  }
});

router.get("/login/failure", (req, res) => {
  return res.status(400).send("Authentication failed!");
});

router.get("/login/check", authenticate, async (req, res) => {
  if (!req.user) {
    return res.status(400).send("Authentication failed!");
  }
  const { email } = req.user;
  const user = await User.findOne({ where: { email } });
  let token = newToken(user);
  return res.status(200).send({ token, user });
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.status(200).json({ message: "Logged out!" });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "auth/login/failure",
  })
);

module.exports = router;
