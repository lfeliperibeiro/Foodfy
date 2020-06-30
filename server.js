const express = require("express");
const nunjucks = require("nunjucks");
const data = require("./data");

const server = express();

server.set("view engine", "njk");

server.use(express.static("public"));

nunjucks.configure("views", {
  express: server,
  noCache: true,
});

server.get("/", (req, res) => {
  return res.render("index", { items: data });
});

server.get("/recipes", (req, res) => {
  return res.render("recipes", { items: data });
});

server.get("/about", (req, res) => {
  return res.render("about");
});

server.get("/recipe/:id", (req, res) => {
  const id = req.params.id;
  const recipe = data.find((recipe) => {
    return recipe.id == id;
  });
  if (!recipe.id) {
    return res.send("Page not found");
  }

  return res.render("recipe", { item: data });
});

server.listen(5000, () => {
  console.log("server is running");
});
