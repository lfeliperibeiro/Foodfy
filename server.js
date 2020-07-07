const express = require("express");
const nunjucks = require("nunjucks");
const recipes = require("./data");
const routes = express.Router();

const server = express();

server.set("view engine", "njk");
server.use(routes);
server.use(express.static("public"));

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true,
});

server.get("/", (req, res) => {
  return res.render("index", { items: recipes });
});

server.get("/about", (req, res) => {
  return res.render("about");
});

server.get("/recipes", (req, res) => {
  return res.render("recipes", { items: recipes });
});

server.get("/recipe/:id", (req, res) => {
  const id = req.params.id;

  const recipe = recipes.find((recipe) => {
    return recipe.id == id;
  });
  if (!recipe) {
    return res.status(404).render("notfound");
  }

  return res.render("recipe", { item: recipe });
});

server.listen(5000, () => {
  console.log("server is running");
});

module.exports = routes;
