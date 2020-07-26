const { date } = require("../../lib/utils");
const Index = require("../models/Principals");
const Principals = require("../models/Principals");

module.exports = {
  index(req, res) {
      Principals.all((principals)=>{
          
          return res.render("recipes/chefs", {principals});
      })
  }
}