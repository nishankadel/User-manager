// import here
const People = require("../models/users/People");
const User = require("../models/auth/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// write the POST methods code here

// for POST of add user
exports.postAddUser = async (req, res) => {
  try {
    const { fullname, email, address, phonenumber } = req.body;

    // find unique email address
    await People.findOne({ email: email })
      .then((people) => {
        if (!people) {
          // code for saving user
          const newPeople = new People({
            fullname: fullname,
            email: email,
            address: address,
            phonenumber: phonenumber,
            author: req.user.email,
          });

          newPeople
            .save()
            .then(() => {
              req.flash("success_msg", "Successfully add User");
              res.redirect("/add-user");
            })
            .catch((err) => {
              console.log("error saving user");
            });
        } else {
          console.log("User already exists");
          res.render("users/add_user");
        }
      })
      .catch((err) => {
        console.log("error finding user user");
      });
  } catch (error) {
    console.log("Error adding user " + error);
  }
};

// for DELETE of user
exports.deleteUser = async (req, res) => {
  let id = req.params.id;
  await People.findByIdAndDelete(id);
  res.redirect("/management");
};

// for update of user
exports.updateUser = async (req, res) => {
  let id = req.params.id;
  const { fullname, email, address, phonenumber } = req.body;

  await People.findByIdAndUpdate(
    id,
    {
      $set: {
        fullname: fullname,
        email: email,
        address: address,
        phonenumber: phonenumber,
      },
    },

    { new: true },

    (err, people) => {
      if (err) {
        console.log(err);
        res.render("users/update_user", { people: req.body });
      }
      res.redirect("/management");
    }
  );
};

// post register page
exports.postRegister = async (req, res) => {
  const { fullname, email, password, confirmpassword } = req.body;
  let errors = [];

  //   check if passwords matched
  if (password !== confirmpassword) {
    errors.push({ msg: "Passwords are not matched" });
  }

  //   check length of password
  if (password.length < 6) {
    errors.push({ msg: "Passwords should be at least 6 characters" });
  }

  // check if errors
  if (errors.length > 0) {
    res.render("auth/register", { errors });
  } else {
    // validation pass
    await User.findOne({ email: email }).then((user) => {
      if (user) {
        // user exists
        errors.push({ msg: "Email is already registered " });
        res.render("auth/register", { errors });
      } else {
        // create new User
        const user = new User({
          fullname: fullname,
          email: email,
          password: password,
        });

        // hash password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;

            // set password to hash
            user.password = hash;
            user
              .save()
              .then((user) => {
                //   flash messages
                req.flash("success_msg", "Successfully registered, login now.");
                res.redirect("/users/login");
              })
              .catch((err) => {
                console.log(err);
              });
          });
        });
      }
    });
  }
};

// post login page
exports.postLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
};
