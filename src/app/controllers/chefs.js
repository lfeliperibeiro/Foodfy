const db = require("../../config/db");
const {date} = require("../../lib/utils")

module.exports ={
    index(req,res){
        return res.render("chefs/index")
    }
}