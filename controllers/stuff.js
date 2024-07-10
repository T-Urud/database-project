const Thing = require("../models/Thing");

exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing);
  // envoie de données sous la forme form-data et non JSON

  delete thingObject._id;
  // supp _id car database en génère un nouveau
  delete thingObject._userId;
  // supp _userId de la req envoyée par client car peut pas trust (peut envoyer userId d'un autre)

  const thing = new Thing({
    ...thingObject,
    // spread operator pour faire une copie de tous les éléments
    userId: req.auth.userId,
    // Remplaçons en base de données par le _userId extrait du token par le middleware d’authentification.
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    // génère le chemin complet
  });

  thing
    .save()
    // enregistre Thing dans la database
    .then(() => res.status(201).json({ message: "Objet enregistré" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyThing = (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "objet modifié" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "objet supprimé" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    // retourne un seul Thing basé sur la fonction de comparaison qu'on lui passe (souvent pour récupérer un Thing par son identifiant unique)
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllThing = (req, res, next) => {
  // modifier app.use --> app.get
  Thing.find()
    .then((things) => {
      // things = tableau qui contient plusieurs objets
      res.status(200).json(things);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
