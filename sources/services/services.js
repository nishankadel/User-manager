// import here
const People = require("../../MVC/models/users/People");
const passport = require("passport");

// write the GET methods code here
// for index page rendering
exports.getHome = (req, res) => {
  res.render("index");
};

// for dashboard page rendering
exports.getDashboard = (req, res) => {
  res.render("users/dashboard", { user: req.user });
};

// for management page rendering
exports.getManagement = async (req, res) => {
  let authorized = req.user.email;
  const people = await People.find({"author":authorized}).sort({ date: -1 });
  res.render("users/management", { people: people });
};

// for login page rendering
exports.getRegister = (req, res) => {
  res.render("auth/register");
};

// for register page rendering
exports.getLogin = (req, res) => {
  res.render("auth/login");
};

// for add user page rendering
exports.getAddUser = (req, res) => {
  res.render("users/add_user");
};

// for edit user page rendering
exports.getEditUser = async (req, res) => {
  let id = req.params.id;
  const people = await People.findOne({ _id: id });

  res.render("users/edit_user", { people: people });
};

// get logout  handle
exports.getLogout = (req, res) => {
  req.logout();
  req.flash("success_msg", "you are logout ");
  res.redirect("/users/login");
};
