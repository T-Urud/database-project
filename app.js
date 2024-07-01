const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");
// const cors = require("cors");

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

// app.use(cors());
// The cors package makes it easier to handle CORS in Express applications.

app.use(bodyParser.json());
// pour gérer POST request venant du frontend il faut extraire le corps JSON

app.use("/api/stuff", stuffRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
