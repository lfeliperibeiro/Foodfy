const db = require("../../config/db");
const { date } = require("../../lib/utils");


module.exports = {
  all() {
    try{
      const query = `SELECT chefs.id, chefs.name, chefs.avatar_url,
      (select Count(recipes.id) FROM recipes WHERE chef_id = chefs.id) AS total_recipes
        FROM chefs`
        return db.query(query)
    } catch(error){
      console.log(error)
    } 
  },
  create(data) {
    try {
      const query = `
      INSERT INTO chefs(
          name,
          avatar_url,
          created_at
      )VALUES($1, $2,$3)
      RETURNING id`;

      const values = [data.name, data.avatar_url, date(Date.now()).iso];
        return db.query(query, values)
    }catch(error){
      console.log(error)
    }    
  },
  find(chefId) {
    try {
      const query = `SELECT chefs.id, chefs.name, chefs.avatar_url,
      (Select Count(recipes.id) FROM recipes WHERE chef_id = chefs.id) AS total_recipes
      FROM chefs WHERE id = ${chefId}
      `
      return db.query(query)
    }catch(error){
      console.log(error)
    }   
  },
  findRecipesByChef(chefId) {
    try {
      const query = `
    SELECT recipes.id,
      recipes.title,
      recipes.image,
      chefs.name AS chef_name
      FROM recipes
      INNER JOIN chefs on (chefs.id = recipes.chef_id)
      WHERE chefs.id = ${chefId}
    `
    return db.query(query)
    }catch(error){
      console.log(error)
    }   
  },
  update(data) {
    try {
      const query = `
      UPDATE chefs SET
      avatar_url=($1),
      name=($2)
      WHERE id=$3`;

      const values = [data.avatar_url, data.name, data.id];

      return db.query(query, values)  
    }catch(error){
      console,log(error)
    }   
  },
  delete(chefId) {
    try {
      const query = `
      DELETE FROM chefs WHERE id = ${chefId}`

      return db.query(query)
    }catch(error){
      console.log(error)
    }    
  },  
};
