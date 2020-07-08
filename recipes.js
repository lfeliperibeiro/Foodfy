const fs = require("fs");
const data = require("./data.json");

exports.index = function (req, res) {
  return res.render("admin/index", { recipes: data.recipes });
};

exports.create = function (req, res) {
  return res.render("admin/create");
};

exports.post = function (req, res) {
  const key = Object.keys(req.body);
  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Preencha todos os campos");
    }
  }
  let { recipe_url, ingredients, prepare, info } = req.body;

  const id = Number(data.recipes.length + 1);

  data.recipes.push({
    id,
    recipe_url,
    ingredients,
    prepare,
    info,
  });
  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("erro ao carregar");

    return res.redirect("/recipes");
  });
};
