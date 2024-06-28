const express = require("express");
const mongoose = require("mongoose");
const Thing = require("./models/Thing");
const bodyParser = require("body-parser");

mongoose
  .connect(
    "mongodb+srv://bobtst:lolbeer@cluster0.mipioi0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // accès depuis n'importe quelle origine
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  // ajouter les headers mentionnés aux requêtes envoyées vers API
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  // envoyer des requètes avec les méthodes mentionnées
  next();
});

app.use(bodyParser.json());
// pour gérer POST request venant du frontend il faut extraire le corps JSON

app.post("/api/stuff", (req, res, next) => {
  // app.post permet au middleware de seulement répondre aux POST request
  delete req.body._id;
  // supprime le faux id envoyé par le front-end
  const thing = new Thing({
    ...req.body,
    // spread operator pour faire une copie de tous les éléments de req.body
  });
  thing
    .save()
    // enregistre Thing dans la database
    .then(() => res.status(201).json({ message: "Objet enregistré" }))
    .catch((error) => res.status(400).json({ error }));
});
// Placer la route POST au-dessus du middleware pour les GET request

app.get("/api/stuff", (req, res, next) => {
  // modifier app.use --> app.get
  Thing.find()
    .then((things) => {
      // things = tableau qui contient plusieurs objets
      console.log("Things found:", things);
      res.status(200).json(things);
    })
    .catch((error) => {
      console.log("Things not found:", error);
      res.status(400).json({ error });
    });
});

module.exports = app;
