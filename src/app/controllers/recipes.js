const { date } = require("../../lib/utils");
const Recipes = require("../models/Recipes");

module.exports = {
  index(request, response) {
    Recipes.all((recipes) => {
      return res.render("admin/recipes/index", { recipes });
    });
  },
  create(request, response) {
    Recipes.allChefs((chefs) => {
      return response.render("admin/recipes/create", { chefs });
    });
  },
  post(request, response) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha todos os campos");
      }
    }
    Recipes.create(request.body, (recipes) => {
      return res.redirect('/admin/recipes');
    });
  },
  show(request, response) {
    const {id} = request.params
    Recipes.find(id, (recipe) => {
      if (!recipe) return res.send("Receita não encontrada");

      return response.render("admin/recipe/recipe", { recipe });
    });
  },
  edit(request, response) {
    const {id} = request.params
    Recipes.allChefs((chefs) => {
        Recipes.chefSelectOptions(id, (recipe) => {
        return response.render("admin/recipe/edit", { recipe, chefs });
      });
    });
  },
  put(request, response) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha os campos vazios");
      }
    }
    Recipes.update(request.body, () => {
      return response.redirect('/admin/recipes');
    });
  },
  delete(request, response) {
    const {id} = request.body
    Recipes.delete(id, () => {
      return res.redirect("/admin/recipes");
    });
  },
};
