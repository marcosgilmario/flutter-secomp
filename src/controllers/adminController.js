const bcrypt = require("bcryptjs");
const { Admins } = require("../models/mainModel");

module.exports = {
  async listAdmins(req, res) {
    // #swagger.tags = ['Admins']
    try {
      const data = await Admins.findAll();
      return res.json(data);
    } catch (err) {
      return console.log("Erro na listagem: ", err);
    }
  },
  async getAdmin(req, res) {
    // #swagger.tags = ['Admins']
    try {
      const admin = await Admins.findOne({ where: { id: req.params.id } });
      return res.json(admin);
    } catch (err) {
      return console.log("Erro na busca: ", err);
    }
  },
  async getAdminByEmail(req, res) {
    // #swagger.tags = ['Admins']
    try {
      const admin = await Admins.findOne({ where: { email: req.email } });
      return admin;
    } catch (err) {
      return console.log("Erro na busca: ", err);
    }
  },
  async createAdmin(req, res) {
    // #swagger.tags = ['Admins']
    const { email, password, token } = req.body;
    try {
      const admin = await Admins.create({
        email,
        password: await bcrypt.hash(password, 10),
        token,
      });
      res.send(admin);
    } catch (err) {
      return console.log("Erro na criação", err);
    }
  },
  async updateAdmin(req, res) {
    // #swagger.tags = ['Admins']
    const Sequelize = require("sequelize");
    const Op = Sequelize.Op;
    const { email, password, token } = req.body;
    const id = req.params.id;
    try {
      await Admins.update(
        {
          email,
          password: await bcrypt.hash(password, 10),
          token,
        },
        { where: { id: { [Op.eq]: id } } }
      );
      return res.json({ msg: `Admins ${email} atualizado com sucesso!` });
    } catch (error) {
      return res.json({ msg: `Admins ${email} não foi atualizado` }, err);
    }
  },
  async deleteAdmin(req, res) {
    // #swagger.tags = ['Admins']
    try {
      await Admins.destroy({ where: { id: req.params.id } });
      return res.json({
        msg: `Exclusão de usuário com ID ${req.params.id} feita com sucesso!`,
      });
    } catch (err) {
      return console.log("Erro na exclusão: ", err);
    }
  },
};
