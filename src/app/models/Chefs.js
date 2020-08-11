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
    db.query(query, values, (err, results) => {
      if (err) throw `DataBase error ${err}`;

      callback(results.rows[0]);
    });
  },
  find(id, callback) {
    db.query(
      `SELECT chefs.*, 
      count(recipes) AS total_recipes
      FROM chefs 
      LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
      WHERE chefs.id = $1
      GROUP BY chefs.id
      `,
      [id],
      (err, results) => {
        if (err) throw `Database error ${err}`;

        callback(results.rows[0], results.rowCount);
      }
    );
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

      callback();
    });
  },
  delete(id, callback) {
    db.query(
      `
      DELETE FROM chefs WHERE id = $1`,
      [id],
      (err, results) => {
        if (err) throw `Database error ${err}`;

        callback();
      }
    );
  },
  chefRecipes(id, callback) {
    db.query(`
       SELECT *
       FROM chefs 
      LEFT JOIN recipes
       ON (recipes.chef_id = chefs.id) 
      WHERE chefs.id = $1
      `, [id], (err, results) => {
        if (err) throw `Database error ${err}`;

        callback(results.rows);
    });
  },
};
