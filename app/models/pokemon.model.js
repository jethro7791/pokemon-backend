const sql = require("./db.js");

// constructor
const Pokemon = function(pokemon) {
  this.id = pokemon.id;
  this.teamname = pokemon.teamname;
  this.experience = pokemon.experience;
  this.image = pokemon.image;
  this.abilities = pokemon.abilities;
  this.types = pokemon.types;
  this.name = pokemon.name;
};

Pokemon.create = (newTeam, result) => {
  try{ 
  let retID = 0;
 
  console.log('newTeam',newTeam)
  if (newTeam.id) {
      console.log("created test: ", { id: newTeam.id, ...newTeam });
      sql.query("INSERT INTO pokemon(team_id,base_experience,image,types,abilities, name) VALUES(?,?,?,?,?,?)", [newTeam.id,newTeam.experience,newTeam.image,newTeam.types,newTeam.abilities, newTeam.name], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        result(null, { rowid: res.insertId, ...newTeam }); 

      });
  }
  else{
  sql.query("INSERT INTO team(description) VALUES(?)", newTeam.teamname, (err, res) => {
    if (err) {
      console.log("error: ", err); 
      result(err, null);
      return;
    }
    else{
      retID = res.insertId
      console.log("created test: ", { id: res.insertId, ...newTeam });
      sql.query("INSERT INTO pokemon(team_id,base_experience,image,types,abilities, name) VALUES(?,?,?,?,?,?)", [retID,newTeam.experience,newTeam.image,newTeam.types,newTeam.abilities, newTeam.name], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        result(null, { id: res.insertId, ...newTeam });

      });
    }
  
  })
};

}
catch(err){
  console.log("err???",err.description);
}
};
 
Pokemon.findById = (id, result) => {
  sql.query(`SELECT t.id, t.description, t.creation_date, p.id as rowid, p.team_id, p.base_experience, p.image, p.types, p.abilities, p.name FROM team t INNER JOIN pokemon p ON t.id = p.team_id WHERE p.team_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
 
    if (res.length) {
      console.log("found pokemon: ", res);
      result(null, res);
      return;
    }

    // not found Pokemon with the id
    result({ kind: "not_found" }, null);
  });
};

Pokemon.findChildById = (id, result) => {
  sql.query(`SELECT p.id, p.team_id, p.image, p.types, p.abilities FROM pokemon p WHERE p.team_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
 
    if (res.length) {
      console.log("found pokemon: ", res);
      result(null, res);
      return;
    }

    // not found Pokemon with the id
    result({ kind: "not_found" }, null);
  }); 
};

Pokemon.getAll = (idchild,result) => {
  console.log('getAll id',idchild)
  let query = '';
  // if (idchild) 
  //   query= `SELECT p.id, p.team_id, p.image, p.types, p.abilities FROM pokemon p WHERE p.team_id = ${id}`;
  if (idchild)
    query= `SELECT p.id, p.team_id, p.image, p.types, p.abilities FROM pokemon p WHERE p.team_id = ${idchild}`;
  else
    query= "SELECT t.id, t.description, t.creation_date, SUM(p.base_experience) AS totExp, p.types FROM team t INNER JOIN pokemon p ON t.id = p.team_id GROUP BY t.id, t.description, t.creation_date, p.types ORDER BY t.creation_date";
    //query = "SELECT t.id, t.description, t.creation_date, p.id as rowid, p.team_id, p.base_experience, p.image, p.types, p.abilities, p.name FROM team t INNER JOIN pokemon p ON t.id = p.team_id";

    
  //   
  
    
  //   query += ` WHERE t.id LIKE '%${id}%'`;
  
console.log('query',query)
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Pokemon.updateById = (id, pokemon, result) => {
  sql.query(
    "UPDATE tean SET description = ? WHERE id = ?",
    [pokemon.description],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Pokemon with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated pokemon: ", { id: id, ...pokemon });
      result(null, { id: id, ...pokemon });
    }
  );
};

Pokemon.remove = (id, result) => {
  sql.query("DELETE FROM pokemon WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Pokemon with the id
      result({ kind: "not_found" }, null); 
      return;
    }

    console.log("deleted pokemon with id: ", id);
    result(null, res);
  });
};

Pokemon.removeAll = result => {
  sql.query("DELETE FROM team", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} team`);
    result(null, res);
  });
};

Pokemon.getPokemon = async result => {
  const res = await fetch(url)
  .then((data) => {
    return data;
  });
  
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  result(null, res);
  return;
}
module.exports = Pokemon;
