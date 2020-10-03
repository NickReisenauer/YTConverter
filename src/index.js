const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on: ${process.env.PORT || 3000}`);
});
