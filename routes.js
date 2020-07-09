const express = require("express");
const routes = express.Router();
const allRecipes = require("./data");
const recipes = require("./recipes");
const data = require("./data.json");

routes.get("/admin/recipes", recipes.index);
routes.get("/admin/recipes/create", recipes.create);
routes.get("/admin/recipes/:id", recipes.show);
routes.get("/admin/recipes/:id/edit", recipes.edit);

routes.post("/admin/recipes", recipes.post);
// routes.put("/admin/recipes", recipes.put);
// routes.delete("/admin/recipes", recipes.delete);

routes.get("/", (req, res) => {
  return res.render("index", { recipes: data.recipes });
});

routes.get("/about", (req, res) => {
  return res.render("about");
});

routes.get("/recipes", (req, res) => {
  return res.render("recipes", { items: allRecipes });
});

routes.get("/recipes/:id", (req, res) => {
  const { id } = req.params;
  const foundRecipe = data.recipes.find(function (recipe) {
    return recipe.id == id;
  });
  if (!foundRecipe) return res.send("Receita não encontrada");

  const recipe = {
    ...foundRecipe,
  };
  return res.render("recipe", { recipe });
});

module.exports = routes;
