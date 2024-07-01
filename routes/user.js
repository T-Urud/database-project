const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
// route POST car on envoie des infos

//  le segment de route indiqué ici est uniquement le segment final, car le reste de l'adresse de la route sera déclaré dans l'application Express

module.exports = router;
