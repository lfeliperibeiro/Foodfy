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
  create(data, callback) {
    const query = `
        INSERT INTO recipes(
            image,
            title,
            ingredients,
            preparations, 
            information,
            created_at
        ) VALUES($1,$2,$3,$4,$5,$6)
        RETURNING id`;

    const values = [
      data.image,
      data.title,
      data.ingredients,
      data.preparations,
      data.information,
      date(Date.now()).iso,
    ];
    db.query(query, values, (err, results) => {
      if (err) throw `Database Error ${err}`;

     return  callback(results.rows[0]);
    });
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
  update(data, callback) {
    const query = `
    UPDATE recipes SET
    image=($1),
    title=($2),
    ingredients=($3),
    preparations=($4), 
    information=($5),
    chef_id=($6)
    WHERE id=$7`;
    const values = [
      data.image,
      data.title,
      data.ingredients,
      data.preparations,
      data.information,
      data.chef_id,
      data.id,
    ]
    db.query(query,values, (err, results)=>{
      if(err) throw `DataBase error ${err}`

      return callback()
    })
  },
  delete(id, callback){
    db.query(`
    DELETE FROM recipes WHERE id=$1`, [id], (err, results)=>{
      if(err) throw `Database error ${err}`

      return callback()
    })
  },
  allChefs(callback){
    db.query(`SELECT id, name FROM chefs`, (err, results)=>{
      if(err) throw `Database error ${err}`
      
      callback(results.rows)
    })
  }
};
