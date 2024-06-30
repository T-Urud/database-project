const Thing = require("../models/Thing");

exports.createThing = (req, res, next) => {
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
