const { date } = require("../../lib/utils");
const Principals = require("../models/Principals");

module.exports = {
  index(req, res) {
    Principals.all((principals) => {
      return res.render("recipes/chefs", { principals });
    });
  },
  principal(req, res) {
    Principals.home((principals) => {
      return res.render("recipes/index", { principals });
    });
  },
};
