const express = require("express");
const morgan = require("morgan");
const { db, Page, User } = require("./models");
const wikiRouter = require("./routes/wiki");
const userRouter = require("./routes/users");

const app = express();

// Logging middleware
app.use(morgan("dev"));

// Body parsing middleware
app.use(express.urlencoded({ extended: false }));

app.use("/wiki", wikiRouter);

// Serve static files
app.use(express.static("public"));

const { layout } = require("./views");

app.get("/", (req, res) => {
  res.redirect("/wiki");
});

db.authenticate().then(() => {
  console.log("connected to the database");
});

const PORT = 3000;
const init = async () => {
  await Page.sync({ force: true });
  await User.sync({ force: true });
  // make sure that you have a PORT constant
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
};

init();
