const fs = require("fs");
const data = require("./data.json");

exports.index = function (req, res) {
  return res.render("admin/index", { recipes: data.recipes });
};

exports.create = function (req, res) {
  return res.render("admin/create");
};

exports.post = function (req, res) {
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
};

exports.show = function (req, res) {
  const { id } = req.params;
  const foundRecipe = data.recipes.find(function (recipe) {
    return recipe.id == id;
  });
  if (!foundRecipe) return res.send("Receita não encontrada");

  const recipe = {
    ...foundRecipe,
  };
  return res.render("./admin/show", { recipe });
};

exports.edit = function (req, res) {
  const { id } = req.params;
  const foundRecipe = data.recipes.find(function (recipe) {
    return recipe.id == id;
  });
  if (!foundRecipe) return res.send("Página não encontrada");

  const recipe = {
    ...foundRecipe,
  };
  return res.render("./admin/edit", { recipe });
};
