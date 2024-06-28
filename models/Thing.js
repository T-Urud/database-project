const mongoose = require("mongoose");

const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});
// Schéma de données. ID AUTOMATIQUEMENT GENERE PAR MONGOOSE --> pas besoin de faire une ligne

module.exports = mongoose.model("Thing", thingSchema);
// La méthode model transforme thingSchema en un modèle utilisable
// 1er argument: nom du model (Thing dans le cas), 2e argument: le schéma qu'on va utiliser
