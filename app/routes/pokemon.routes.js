module.exports = app => {
  const pokemons = require("../controllers/pokemon.controller.js");

  var router = require("express").Router();

  // Create a new Pokemon
  router.post("/", pokemons.create);

  // Retrieve all Tutorials
  router.get("/", pokemons.findAll);

  // Retrieve a single Pokemon with id
  router.get("/:id", pokemons.findOne);

  // // Update a Pokemon with id
  // router.put("/:id", pokemons.update);

  // Delete a Pokemon with id
  router.delete("/:id", pokemons.delete);
 
  // // Delete all Tutorials
  // router.delete("/", pokemons.deleteAll);

  app.use('/api/pokemons', router);
};
