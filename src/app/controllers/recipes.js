const { date } = require("../../lib/utils");
const Recipes = require("../models/Recipes");

module.exports = {
  index(req, res) {
    Recipes.all((recipes) => {
      return res.render("admin/index", { recipes });
    });
  },
  create(req, res) {
    return res.render("admin/create");
  },
  post(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha todos os campos");
      }
    }
    Recipes.create(req.body, (recipe) => {
      return res.redirect(`/admin/recipes/${recipe.id}`);
    });
  },
  show(req, res) {
    Recipes.find(req.params.id, (recipe) => {
      if (!recipe) return res.send("Receita não encontrada");

      return res.render("admin/show", { recipe });
    });
  },
  edit(req, res) {
    Recipes.find(req.params.id, (recipe)=>{
      if(!recipe) return res.send("Receita não encontrada")
      
      return res.render("admin/edit", {recipe})
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body)
    for(key of keys){
      if(req.body[key] == ""){
        return res.send("Preencha os campos vazios")
      }
    }
    Recipes.update(req.body, ()=>{
      return res.redirect(`/admin/recipes/${req.body.id}`)
    })
    
  },
  delete(req, res) {
    Recipes.delete(req.body.id, ()=>{
      return res.redirect("/admin/recipes")
    })
    
    
  },
};
