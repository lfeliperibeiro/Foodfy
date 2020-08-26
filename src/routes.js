const express = require("express");
const routes = express.Router();
const recipes = require("./app/controllers/recipes");
const chefs = require("./app/controllers/chefs")
const admin = require("./app/controllers/admin")
const users = require('./app/controllers/users')
const data = require("./data.json");


routes.get('/admin', admin.index)

//  Rotas das receitas do adm

routes.get("/admin/recipes", recipes.index);
routes.get("/admin/recipes/create", recipes.create);
routes.get("/admin/recipes/:id", recipes.show);
routes.get("/admin/recipes/:id/edit", recipes.edit);


routes.post("/admin/recipes", recipes.post);
routes.put("/admin/recipes", recipes.put);
routes.delete("/admin/recipes", recipes.delete);

// Rotas dos Chefs

routes.get("/admin/chefs", chefs.index)
routes.get("/admin/chefs/create", chefs.create)
routes.get("/admin/chefs/:id", chefs.show)
routes.get("/admin/chefs/:id/edit", chefs.edit)

routes.post("/admin/chefs", chefs.post)
routes.put("/admin/chefs", chefs.put)
routes.delete("/admin/chefs", chefs.delete)

// Rotas do index da Página

routes.get("/", users.index);


routes.get("/about", (request, response) => {
  return response.render("users/about");
});

routes.get("/recipes", users.show);

routes.get("/recipes/:id", users.show_single);

routes.get("/chefs", users.chef_index)


module.exports = routes;
