const { date } = require("../../lib/utils");
const Chefs = require("../models/Chefs");
const { response } = require("express");


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
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Por favor preencha todos os campos");
      }
    }
    Chefs.create(request.body, (chefs) => {
      return response.redirect('admin/chefs');
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
     return res.render("admin/chefs/edit", { chef });
    });
  },
  put(request, response) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Por favor preencha todos os campos");
      }
    }
    Chefs.update(request.body, (chef) => {
      return res.redirect('/admin/chefs');
    });
  },
  delete(request, response) {
    const {id} = request.body
    Chefs.delete(id, (chefs) => {
      return res.redirect("/admin/chefs");
    });
  },
};
