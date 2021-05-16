const mongoose = require("mongoose");

// CONNECT MONGODB COMPASS
// mongoose
//   .connect("mongodb://localhost:27017/User-Management-System", {
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useFindAndModify: false,
//   })
//   .then(() => console.log(`Connection to the DB is Successful.`))
//   .catch((err) => console.log(`Connection to the DB is Broken.`));

// CONNECT MONGODB ATLAS
mongoose
  .connect(
    "mongodb+srv://nishankadel:nishankadel@usermanage.1tw9h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log(`Connection to the DB is Successful.`))
  .catch((err) => console.log(`Connection to the DB is Broken.`));