const db = require("../../config/db");
const { date } = require("../../lib/utils");

module.exports = {
  all() {
    try {
      const query = `   
    SELECT  
        rec.id,
        rec.image,
        rec.title,
        chf.name As author
        FROM recipes rec
        Inner Join chefs chf On (chf.id = rec.chef_id)
             `

        return db.query(query)
    }catch(error){
      console.log(error)
    }   
  },
  findAllChefs() {
    try{
      const query = `SELECT chefs.id,
                            chefs.name,
                            chefs.avatar_url,
                            (SELECT count(recipes.id) FROM recipes WHERE chef_id = chefs.id) AS total_recipes
                            FROM chefs                
      `
      return db.query(query)
    }catch(error){
      console.log(error)
    }   
  },
  searchRecipes(filter) {
    try {
      const query = `SELECT rec.id,
                            rec.image,
                            rec.title,
                            chf.name AS author
                        FROM recipes rec
                        INNER JOIN chefs chf ON (chf.id = rec.chef_id)
                        WHERE rec.title ILIKE'%${filter}%'`
                return db.query(query)
    }catch(error){
      console.log(error)
    }    
  },
}