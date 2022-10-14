require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const admins = require("../controllers/adminController");
const auth = require("../middleware/auth");

const app = express();

app.use(express.json({ limit: "50mb" }));

module.exports = {
  async register(req, res) {
    // #swagger.tags = ['Auth']
    try {
      const { email, password } = req.body;

      if (!(email && password)) {
        res.status(400).send("Todos os campos são obrigatórios");
      }

      const oldAdmin = await admins.getAdminByEmail({ email });

      if (oldAdmin) {
        return res
          .status(409)
          .send("Usuário já cadastrado! Por favor, faça login.");
      }

      const admin = await admins.createAdmin(req, res);
      const token = jwt.sign(
        { admin_id: admin.id, email: email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      admin.token = token;

      return res.status(201).json(admin);
    } catch (err) {
      console.log(err);
    }
  },

  async login(req, res) {
    // #swagger.tags = ['Auth']
    try {
      const { email, password } = req.body;

      if (!(email && password)) {
        res.status(400).send("Todos os campos são obrigatórios");
      }

      const admin = await admins.getAdminByEmail({ email });
      if (admin && (await bcrypt.compare(password, admin.password))) {
        const token = jwt.sign(
          { admin_id: admin.id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );

        admin.token = token;

        return res.status(200).json(admin);
      }
      res.status(400).send("Credenciais inválidas");
    } catch (err) {
      console.log(err);
    }
  },

  async verifyEmail(req, res) {
    // #swagger.tags = ['Auth']
    const { email } = req.body;
    const oldAdmin = await admins.getAdminByEmail({ email });

    if (oldAdmin) {
      return res.status(409).send(true);
    } else {
      res.status(404).send(false);
    }
  },
};
