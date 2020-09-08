const db = require("../../config/db");
const { date } = require("../../lib/utils");

module.exports = {
  all() {
    try{
      const query = `   
    SELECT  
        rec.id,
        rec.image,
        rec.title,
        chf.name As Chef_Name
        FROM recipes rec
        Inner Join chefs chf On (chf.id = rec.chef_id)
             `
        return db.query(query)
    }catch(error){
      console.log(error)
    }    
  },
  create(data) {
    try{
      const query = `
        INSERT INTO recipes(
            image,
            title,
            ingredients,
            preparations, 
            information,
            created_at,
            chef_id
        ) VALUES($1,$2,$3,$4,$5,$6, $7)
        RETURNING id`;

    const values = [
      data.image,
      data.title,
      data.ingredients,
      data.preparations,
      data.information,
      date(Date.now()).iso,
      data.chef_id
    ];
    
    return db.query(query, values) 
  }catch(error){
    console.log(error)
  }
  },
  find(recipeId) {
    try {
      const query =  `
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
        WHERE recipes.id = ${recipeId}`

        return db.query(query)
    }catch(error){
      console.log(error)
    }   
  },
  update(data) {
    try {
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
    ];
      return db.query(query, values)
    }catch(error){
      console.log(error)
    }    
  },
  delete(recipeId){
    try {
      const query = `
      DELETE FROM recipes WHERE id=${recipeId}`
      
      return db.query(query) 
    }catch(error){
      console.log(error)
    }  
  },
  allChefs(){
    try {
      const query = `SELECT id, name FROM chefs`

      return db.query(query)
    }catch(error){
      console.log(error)
    }   
  }
};
