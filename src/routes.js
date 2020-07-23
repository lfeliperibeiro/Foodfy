const express = require("express");
const routes = express.Router();
const recipes = require("./app/controllers/recipes");
const chefs = require("./app/controllers/chefs")
const data = require("./data.json");

routes.get("/admin/recipes", recipes.index);
routes.get("/admin/recipes/create", recipes.create);
routes.get("/admin/recipes/:id", recipes.show);
routes.get("/admin/recipes/:id/edit", recipes.edit);


routes.post("/admin/recipes", recipes.post);
routes.put("/admin/recipes", recipes.put);
routes.delete("/admin/recipes", recipes.delete);

routes.get("/admin/chefs", chefs.index)

routes.get("/", (req, res) => {
  return res.render("recipes/index", { recipes: data.recipes });
});

routes.get("/about", (req, res) => {
  return res.render("recipes/about");
});

routes.get("/recipes", (req, res) => {
  return res.render("recipes/recipes", { recipes: data.recipes });
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
  return res.render("recipes/recipe", { recipe });
});
routes.get("/chefs", (req, res)=>{
  return res.render("recipes/chefs")
})

module.exports = routes;
