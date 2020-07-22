const fs = require("fs");
const data = require("./data.json");
// const Recipes = require("../models/Recipes");

module.exports = {
  index(req, res) {
     return res.render("admin/index", { recipes: data.recipes});
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
    let { name, author, recipe_url, ingredients, prepares, info } = req.body;

    const id = Number(data.recipes.length + 1);

    data.recipes.push({
      id,
      name,
      author,
      recipe_url,
      ingredients,
      prepares,
      info,
    });
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
      if (err) return res.send("erro ao carregar");

      return res.redirect("/admin/recipes");
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
    const foundRecipe = data.recipes.find(function (recipe, foundRecipe) {
      if (id == recipe.id) {
        index = foundRecipe;
        return true;
      }
    });
    if (!foundRecipe) return res.send("Receita não encontrada");
    const recipe = {
      ...foundRecipe,
      ...req.body,
    };
    data.recipes[index] = recipe;
  
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
      if (err) return res.send("Erro no arquivo");
  
      return res.redirect(`/admin/recipes/${id}`);
    });
  },
  delete(req, res) {
    const { id } = req.body;
    const filterRecipe = data.recipes.filter(function (recipe) {
      return recipe.id != id;
    });
    data.recipes = filterRecipe;
  
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
      if (err) return res.send("Falha no arquivo");
  
      return res.redirect("/admin/recipes");
    });
  },
  
};





