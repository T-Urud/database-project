const express = require("express");
const auth = require("auth");
const router = express.Router();

const stuffCtrl = require("../controllers/stuff");

// comme on utilise un router, on remplace tout les app. par router.
// /api/stuff est la route de base de l'api

// app.post permet au middleware de seulement répondre aux POST request
// Placer la route POST au-dessus du middleware pour les GET request

router.post("/", auth, stuffCtrl.createThing);
router.put("/:id", auth, stuffCtrl.modifyThing);
router.delete("/:id", auth, stuffCtrl.deleteThing);
router.get("/:id", auth, stuffCtrl.getOneThing);
router.get("/", auth, stuffCtrl.getAllThing);

module.exports = router;
