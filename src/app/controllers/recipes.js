const data = require("../../data.json");
const Recipe = require("../models/Recipe");

module.exports = {
  index(req, res) {
    return res.render("admin/index", { recipes: data.recipes });
  },
  create(req, res) {
    return res.render("admin/create");
  },
  post(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha todos os campos");
      }
    }
    Recipe.create(req.body, (recipe) => {
      return res.redirect(`/admin/recipes/${recipe.id}`);
    });
  },
  show(req, res) {
    const { id } = req.params;
    const foundRecipe = data.recipes.find(function (recipe) {
      return recipe.id == id;
    });
    if (!foundRecipe) return res.send("Receita não encontrada");

    const recipe = {
      ...foundRecipe,
    };
    return res.render("./admin/show", { recipe });
  },
  edit(req, res) {
    const { id } = req.params;
    const foundRecipe = data.recipes.find(function (recipe) {
      return recipe.id == id;
    });
    if (!foundRecipe) return res.send("Página não encontrada");

    const recipe = {
      ...foundRecipe,
    };
    return res.render("admin/edit", { recipe });
  },
  put(req, res) {
    const { id } = req.body;
    let index = 0;
    return;
  },
  delete(req, res) {
    const { id } = req.body;
    return res.redirect("/admin/recipes");
  },
};
