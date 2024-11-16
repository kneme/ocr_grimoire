const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const owasp = require("owasp-password-strength-test");

exports.signup = (req, res, next) => {
  owasp.config({
    allowPassphrases: true,
    maxLength: 20,
    minLength: 10,
    minOptionalTestsToPass: 4,
  });
  const password = req.body.password;
  const result = owasp.test(password);
  if (!result.strong) {
    console.error("Weak password error:", result.errors);
    return res.status(400).json({
      message:
        "Le mot de passe doit avoir entre 10 et 20 caractères en majuscule et minuscule ainsi que des chiffres",
      errors: result.errors,
    });
  }
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Informations de connexion incorrectes" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Informations de connexion incorrectes" });
          }
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
          });
          res.status(200).json({
            userId: user._id,
            token: token,
          });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
