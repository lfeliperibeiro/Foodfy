const { date } = require("../../lib/utils");
const Chefs = require("../models/Chefs");



module.exports = {
   async index(request, response) {
     const chefs = (await Chefs.all()).rows
      return response.render("admin/chefs/index", { chefs });
    ;
  },
  create(request, response) {
    return response.render("admin/chefs/create");
  },
  async post(request, response) {
    const keys = Object.keys(request.body);
    for (key of keys) {
      if (request.body[key] == "") {
        return response.send("Por favor preencha todos os campos");
      }
    }

    const data = request.body;
    const results = await Chefs.create(data)
    console.log(`Chef criado com ID ${results.rows[0].id}`)
    
      return response.redirect('/admin/chefs');
    ;
  },
  async show(request, response) {
    const {id} = request.params
    const showChef = (await Chefs.find(id)).rows[0];
    const listRecipes = (await Chefs.findRecipesByChef(id)).rows
    
    return response.render("admin/chefs/show", {chef: showChef, recipes: listRecipes});        
      
       
  },
  async edit(request, response) {
    const {id} = request.params
    const editChef = (await Chefs.find(id)).rows[0];
    
     return response.render("admin/chefs/edit", { chef: editChef });
    
  },
  async put(request, response) {
    const keys = Object.keys(request.body);
    for (key of keys) {
      if (request.body[key] == "") {
        return response.send("Por favor preencha todos os campos");
      }
    }
    const data = request.body;
    await Chefs.update(data)

   
    return response.redirect('/admin/chefs');
   
  },
  async delete(request, response) {
    const {id} = request.body
    const results = await Chefs.delete(id);    
   
    return response.redirect("/admin/chefs");
   
  },
};
