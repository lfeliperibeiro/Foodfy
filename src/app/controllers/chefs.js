const { date } = require("../../lib/utils");
const Chefs = require("../models/Chefs");



module.exports = {
  index(request, response) {
    Chefs.all((chefs) => {
      return response.render("admin/chefs/index", { chefs, total_recipes:0 });
    });
  },
  create(request, response) {
    return response.render("admin/chefs/create");
  },
  post(request, response) {
    const keys = Object.keys(request.body);
    for (key of keys) {
      if (request.body[key] == "") {
        return response.send("Por favor preencha todos os campos");
      }
    }
    Chefs.create(request.body, (chefs) => {
      return response.redirect('/admin/chefs');
    });
  },
  show(request, response) {
    const {id} = request.params
    Chefs.findRecipeByChef(id, (recipes) => {
      chef.created_at = date(chef.created_at).format;
      Chefs.find(id, (chef)=>{
        return response.render("admin/chefs/show", {chef, recipes});        
      })
    });    
  },
  edit(request, response) {
    const {id} = request.params
    Chefs.find(id, (chef) => {
     return response.render("admin/chefs/edit", { chef });
    });
  },
  put(request, response) {
    const keys = Object.keys(request.body);
    for (key of keys) {
      if (request.body[key] == "") {
        return response.send("Por favor preencha todos os campos");
      }
    }
    Chefs.update(request.body, (chef) => {
      return response.redirect('/admin/chefs');
    });
  },
  delete(request, response) {
    const {id} = request.body
    Chefs.delete(id, (chefs) => {
      return response.redirect("/admin/chefs");
    });
  },
};
