// importing required modules
const express = require("express");
const controllers = require("../../MVC/controllers/controllers");
const services = require("../services/services");
const auth = require("../../authentication/auth");

//creating router
const router = express.Router();

// routing GET methods
router.get("/", auth.unEnsuredAuth, services.getHome); // For routing index page
router.get("/dashboard", auth.ensureAuth, services.getDashboard); // For routing dashboard page
router.get("/management", auth.ensureAuth, services.getManagement); // For routing management page
router.get("/users/register", auth.unEnsuredAuth, services.getRegister); // For routing register page
router.get("/users/login", auth.unEnsuredAuth, services.getLogin); // For routing login page
router.get("/add-user", auth.ensureAuth, services.getAddUser); // For routing add user page
router.get("/edit-user/:id", auth.ensureAuth, services.getEditUser); // For routing update user page
router.get("/users/logout", services.getLogout); // For routing update user page

// routing POST methods
router.post("/add-user", controllers.postAddUser); // For routing add user page
router.post("/users/register", controllers.postRegister); // For routing add user page
router.post("/users/login", controllers.postLogin); // For routing add user page

// routing DELETE methods
router.post("/delete-user/:id", controllers.deleteUser); // For routing delete user page

// routing UPDATE methods
router.post("/update-user/:id", controllers.updateUser); // For routing update user page

// exporting router
module.exports = router;
