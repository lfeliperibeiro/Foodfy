const { date } = require("../../lib/utils");
const Users = require("../models/Users");
const chefs = require("./chefs");


module.exports = {
async index(request, response) {
    const recipes = (await Users.all()).rows  
    return response.render("users/index", { recipes });
  },
  async recipes(request, response) {
    const recipes = (await Users.all()).rows;
    return response.render("users/recipes", {recipes})
  },
  async recipe(request, response){
    const {id} = request.params
    const recipe = (await Users.findRecipes(id)).rows[0];
    return response.render("users/recipe", {recipe})
  },
  async chefs(request, response) {
    const chefs = (await Users.findAllChefs()).rows

    return response.render("users/chefs", {chefs})
  },
  about(request, response){
    return response.render("users/about")
  },
  async search(request, response){
    const {filter} = request.query
    const recipes = (await Users.searchRecipes(filter)).rows;
    return response.render("users/search", {recipes, filter})
  }
}

 

