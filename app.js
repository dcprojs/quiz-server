const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");

require("./security/passport")(passport);

// routes
const AuthRoute = require("./routes/auth.route");

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// route middlewares
app.use("/api/v1/auth", AuthRoute);

module.exports = app;
