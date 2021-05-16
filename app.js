// Importing required modules
const express = require("express");
const routers = require("./sources/routers/routers");
const ejs = require("ejs");
const path = require("path");
const passport = require("passport");
require("./authentication/local_auth")(passport);
const session = require("express-session");
const flash = require("connect-flash");
require("./sources/db/connection");

// creating express app
const app = express();

// port and host
const port = process.env.PORT || 8000;
const host = "127.0.0.1";

// file paths
const staticPath = path.join(__dirname, "assets");
const viewsPath = path.join(__dirname, "MVC/views");

// use static files
app.use(express.static(staticPath));

// use express parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express session middleware
app.use(
  session({
    secret: "FuckSecret",
    resave: true,
    saveUninitialized: true,
  })
);

// connecting flash
app.use(flash());

// global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// setting up router
app.use(routers);

// setting up view engine
app.set("view engine", "ejs");

// setting up views path
app.set("views", viewsPath);

// running server
app.listen(port, host, () =>
  console.log(`Server running at http://${host}:${port}/`)
);
