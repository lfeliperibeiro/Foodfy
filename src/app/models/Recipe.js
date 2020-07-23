const db = require("../../config/db");
const {date} = require("../../lib/utils")

module.exports = {
  all(callback) {
    db.query(
      `
        SELECT * FROM recipes`,
      (err, results) => {
        if (err) throw `Database error ${err}`;

        callback(results.rows);
      }
    );
  },
  create(data, callback) {
    const query = `
        INSERT INTO recipes(
            image,
            title,
            ingredients,
            preparation, 
            information,
            author,
            created_at
        ) VALUES($1,$2,$3,$4,$5,$6,$7)
        RETURNING id`;

    const values = [
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.author,
      date(Date.now()).iso,
    ];
    db.query(query,values, (err, results)=>{
        if(err) throw `Database Error ${err}`

        callback(results.rows[0])
    })
  },
};
