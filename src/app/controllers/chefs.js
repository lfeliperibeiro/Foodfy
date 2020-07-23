const db = require("../../config/db");
const { date } = require("../../lib/utils");
const Chefs = require("../models/Chefs");

module.exports = {
  index(req, res) {
    return res.render("chefs/index");
  },
  create(req, res) {
    return res.render("chefs/create");
  },
  post(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Por favor preencha todos os campos");
      }
    }
    Chefs.create(req.body, (chef) => {
      return res.redirect(`/chefs/${chef.id}`);
    });
  },
};
