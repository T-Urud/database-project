const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
// ordre important, multer après auth !!!!

const stuffCtrl = require("../controllers/stuff");

// comme on utilise un router, on remplace tout les app. par router.
// /api/stuff est la route de base de l'api

// app.post permet au middleware de seulement répondre aux POST request
// Placer la route POST au-dessus du middleware pour les GET request

router.get("/", auth, stuffCtrl.getAllThing);
router.post("/", auth, multer, stuffCtrl.createThing);
router.get("/:id", auth, stuffCtrl.getOneThing);
router.put("/:id", auth, stuffCtrl.modifyThing);
router.delete("/:id", auth, stuffCtrl.deleteThing);

module.exports = router;
