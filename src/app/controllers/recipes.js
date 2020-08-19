const Recipes = require("../models/Recipes");

module.exports = {
  index(request, response) {
    Recipes.all((Recipes) => {
      return response.render("admin/recipes/index", { recipes: Recipes });
    });
  },
  create(request, response) {
    Recipes.allChefs((chefs) => {
      return response.render("admin/recipes/create", { chefs });
    });
  },
  post(request, response) {
    const keys = Object.keys(request.body);
    for (key of keys) {
      if (request.body[key] == "") {
        return response.send("Preencha todos os campos");
      }
    }
    Recipes.create(request.body, (recipes) => {
      return response.redirect('/admin/recipes');
    });
  },
  show(request, response) {
    const {id} = request.params
    Recipes.find(id, (recipe) => {
      if (!recipe) return response.send("Receita não encontrada");

      return response.render("admin/recipe/show", { recipe });
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
    const keys = Object.keys(request.body);
    for (key of keys) {
      if (request.body[key] == "") {
        return response.send("Preencha os campos vazios");
      }
    }
    Recipes.update(request.body, () => {
      return response.redirect('/admin/recipes');
    });
  },
  delete(request, response) {
    const {id} = request.body
    Recipes.delete(id, () => {
      return response.redirect("/admin/recipes");
    });
  },
};
