const db = require("../../config/db");
const { date } = require("../../lib/utils");

module.exports = {
  all(callback) {
    const query = `   
    SELECT  
        rec.id,
        rec.image,
        rec.title,
        chf.name As Chef_Name
        FROM recipes rec
        Inner Join chefs chf On (chf.id = rec.chef_id)
             `
      db.query(query, (err, results) => {
        if (err) throw `Database error ${err}`;

         return callback(results.rows);
      }
    );
  },
  find(id, callback) {
    db.query(
      `
      SELECT recipes.chef_id,
             recipes.id,
             recipes.title,
             recipes.image,
             recipes.ingredients,
             recipes.preparations,
             recipes.information,
             chefs.name AS author 
        FROM recipes
        INNER JOIN chefs ON (chefs.id = recipes.chef_id)
        WHERE recipes.id = $1`, [id]
      ,
      (err, results) => {
        if (err) throw `Database error ${err}`;
        return callback(results.rows[0]);
      }
    );
  },
  chefAll(callback) {
    db.query(
      `SELECT chefs.id, chefs.name, chefs.avatar_url,
      (select Count(recipes.id) FROM recipes WHERE chef_id = chefs.id) AS total_recipes
        FROM chefs`
        ,
      (err, results) => {
        if (err) throw `Database error ${err}`;

        return callback(results.rows);
      }
    );
  },
}