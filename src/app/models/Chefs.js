const db = require("../../config/db");
const { date } = require("../../lib/utils");

module.exports = {
  all(callback) {
    db.query(
      `SELECT chefs.*, count(recipes) AS total_recipes
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        GROUP BY chefs.id
        ORDER BY total_recipes DESC`,
      (err, results) => {
        if (err) throw `Database error ${err}`;

        callback(results.rows);
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
        db.query(query, values, (err,results)=>{
            if (err) throw `DataBase error ${err}`

            callback(results.rows[0])
        })

  },
};
