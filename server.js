const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport"); // wybieram model JWT autoryzacji
const path = require("path");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const articles = require("./routes/api/articles");

const app = express();
const keys = require("./config/keys");

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect to MongoDb
//Map global promieses
mongoose.Promise = global.Promise;
//Mongoose connect
mongoose
  .connect(keys.getDbConnectionString(), { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
//Wybor JWT Strategii, mozna local albo google OAuth
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/articles", articles);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`SERVER RUNNING ON PORT ${port}`));
