const express = require("express");
const router = express.Router();
const stuffCtrl = require("../controllers/stuff");

// comme on utilise un router, on remplace tout les app. par router.
// /api/stuff est la route de base de l'api

// app.post permet au middleware de seulement répondre aux POST request
// Placer la route POST au-dessus du middleware pour les GET request

router.post("/", stuffCtrl.createThing);
router.put("/:id", stuffCtrl.modifyThing);
router.delete("/:id", stuffCtrl.deleteThing);
router.get("/:id", stuffCtrl.getOneThing);
router.get("/", stuffCtrl.getAllThing);

module.exports = router;
