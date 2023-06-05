const Pokemon = require("../models/pokemon.model.js");

// Create and Save a new Pokemon
exports.create = (req, res) => {
  console.log('req4',req.body);
  console.log('req5',req.body.pName); 
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!" 
    });
  }

  // Create a Pokemon
  const pokemon = new Pokemon({
    id:req.body.id,
    description: req.body.pName,
    teamname: req.body.pTeamname,
    experience: req.body.pExperience,
    image: req.body.pImage,
    abilities: req.body.pAbilities,
    types: req.body.pTypes
  });

  // Save Pokemon in the database
  Pokemon.create(pokemon, (err, data) => {
    
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pokemon."
      });
    else 
    {
      console.log('data res create',data)
      res.send(data);
    }
  });
}; 

// Retrieve all pokemons from the database (with condition).
exports.findAll = (req, res) => {
  const id = req.query.id;

  Pokemon.getAll(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pokemons."
      });
    else 
    {
      console.log('res',data); 
      res.send(data);
    }
  });
};

// Find a single Pokemon by Id
exports.findOne = (req, res) => { 
  console.log('I AM HERE ',req.params.id)
  Pokemon.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Pokemon with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Pokemon with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Pokemon identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Pokemon.updateById(
    req.params.id,
    new Pokemon(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Pokemon with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Pokemon with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Pokemon with the specified id in the request
exports.delete = (req, res) => {
  Pokemon.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Pokemon with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Pokemon with id " + req.params.id
        });
      }
    } else res.send({ message: `Pokemon was deleted successfully!` });
  });
};

// Delete all pokemons from the database.
exports.deleteAll = (req, res) => {
  Pokemon.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all pokemons."
      });
    else res.send({ message: `All pokemons were deleted successfully!` });
  });
};

exports.getPokemonAPI = (req, res) => {
  const ret = fetch(url)
    .then((data) => {
      return data;
  });
  
  if (err)
    ret.status(500).send({
      message:
        err.message || "Some error occurred while retrieving pokemons."
    });
  else res.send(ret);
};