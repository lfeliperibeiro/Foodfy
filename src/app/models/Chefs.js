const db = require("../../config/db");
const { date } = require("../../lib/utils");


module.exports = {
  all(callback) {
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
  create(data, callback) {
    const query = `
      INSERT INTO chefs(
          name,
          avatar_url,
          created_at
      )VALUES($1, $2,$3)
      RETURNING id`;

    const values = [data.name, data.avatar_url, date(Date.now()).iso];
    db.query(query, values, (err, results) => {
      if (err) throw `DataBase error ${err}`;

      return callback(results.rows[0]);
    });
  },
  find(id, callback) {
    db.query(
      `SELECT chefs.id, chefs.name, chefs.avatar_url,
      (Select Count(recipes.id) FROM recipes WHERE chef_id = chefs.id) AS total_recipes
      FROM chefs WHERE id = ${id}
      `,     
      (err, results) => {
        if (err) throw `Database error ${err}`;

        return callback(results.rows[0]);
      }
    );
  },
  findRecipesByChef(id, callback){
    const query = `
    SELECT recipes.id,
      recipes.title,
      recipes.image,
      chefs.name AS chef_name
      FROM recipes
      INNER JOIN chefs on (chefs.id = recipes.chef_id)
      WHERE chefs.id = ${id}
    `
    db.query(query, (err, results)=>{
      if (err) throw `Database error ${err}`
      return callback(results.rows)
    })
  },
  update(data, callback) {
    const query = `
      UPDATE chefs SET
      avatar_url=($1),
      name=($2)
      WHERE id=$3`;

    const values = [data.avatar_url, data.name, data.id];

    db.query(query, values, (err, results) => {
      if (err) throw `Database error ${err}`;

      return callback();
    });
  },
  delete(id, callback) {
    db.query(
      `
      DELETE FROM chefs WHERE id = $1`,
      (err, results) => {
        if (err) throw `Database error ${err}`;

        return callback();
      }
    );
  },  
};
