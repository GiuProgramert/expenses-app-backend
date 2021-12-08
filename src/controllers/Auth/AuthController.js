const express = require("express");
const jwtMiddleware = require("../../middlewares/jwtMiddleware");

const login = require("./loginRoute");
const register = require("./registerRoute");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/test_token", jwtMiddleware, (req, res) =>
  res.send("Token is valid")
);

module.exports = router;
