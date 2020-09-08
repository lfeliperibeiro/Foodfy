const Recipes = require("../models/Recipes");

module.exports = {
  async index(request, response) {
      const indexRecipes = (await Recipes.all()).rows
      return response.render("admin/recipes/index", { recipes: indexRecipes });
    
  },
  async create(request, response) {
    const chefs = (await Recipes.allChefs()).rows;
   
      return response.render("admin/recipes/create", { chefs });
   
  },
  async post(request, response) {
    const keys = Object.keys(request.body);
    for (key of keys) {
      if (request.body[key] == "") {
        return response.send("Preencha todos os campos");
      }
    }
    const data = request.body;
    const recipeId = (await Recipes.create(data)).rows[0].id;
    console.log(`Id da receita criada ${recipeId}`)
    
    return response.redirect('/admin/recipes');   
  },
  async show(request, response) {
    const {id} = request.params;
    const showRecipe = (await Recipes.find(id)).rows[0];
   
   return response.render("admin/recipes/show", { recipe: showRecipe });
    
  },
  async edit(request, response) {
    const {id} = request.params
    const chefs = (await Recipes.allChefs()).rows;
    const recipeFound = await Recipes.find(id)

    const recipe = {
      ...recipeFound,
      chefs
    }
    
        return response.render("admin/recipes/edit", { recipe });
   
  },
  async put(request, response) {
    const keys = Object.keys(request.body);
    for (key of keys) {
      if (request.body[key] == "") {
        return response.send("Preencha os campos vazios");
      }
    }
    const data = request.body;
    await Recipes.update(data);
  
    return response.redirect('/admin/recipes');
   
  },
  async delete(request, response) {
    const {id} = request.body
    await Recipes.delete(id)
   
    return response.redirect("/admin/recipes");
  }
};
