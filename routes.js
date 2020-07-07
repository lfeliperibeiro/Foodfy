const express = require("express");
const routes = express.Router();
const recipes = require("./data");

// routes.get("/admin/recipes", recipes.index);
// routes.get("/admin/recipes/create", recipes.create);
// routes.get("/admin/recipes/:id", recipes.show);
// routes.get("/admin/recipes/:id/edit", recipes.edit);

// routes.post("/admin/recipes", recipes.post);
// routes.put("/admin/recipes", recipes.put);
// routes.delete("/admin/recipes", recipes.delete);

routes.get("/", (req, res) => {
  return res.render("index", { items: recipes });
});

routes.get("/about", (req, res) => {
  return res.render("about");
});

routes.get("/recipes", (req, res) => {
  return res.render("recipes", { items: recipes });
});

routes.get("/recipe/:id", (req, res) => {
  const id = req.params.id;

  const recipe = recipes.find((recipe) => {
    return recipe.id == id;
  });
  if (!recipe) {
    return res.status(404).render("notfound");
  }

  return res.render("recipe", { item: recipe });
});

module.exports = routes;
