const { date } = require("../../lib/utils");
const Users = require("../models/Users");


module.exports = {
index(request, response) {
  Users.all((Recipes) => {
    return response.render("users/index", { recipes: Recipes });
  });
 },
 show(request, response){
   Users.all((Recipes)=>{
     return response.render("users/recipes",{recipes: Recipes})
   })
 },
 show_single(request, response) {
  const {id} = request.params
  Users.find(id, (recipe) => {
    if (!recipe) return response.send("Receita não encontrada");

    return response.render("users/recipe", { recipe });
  });
},
chef_index(request, response) {
  Users.chefAll((chefs) => {
    return response.render("users/chefs", { chefs, total_recipes: 0 });
  });
},
}

 

