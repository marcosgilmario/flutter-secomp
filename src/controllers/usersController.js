const { Users } = require("../models/mainModel");

module.exports = {
  async listUsers(req, res) {
    // #swagger.tags = ['Users']
    try {
      const data = await Users.findAll();
      return res.json(data);
    } catch (err) {
      return console.log("Erro na listagem: ", err);
    }
  },
  async getUser(req, res) {
    // #swagger.tags = ['Users']
    try {
      const user = await Users.findOne({ where: { id: req.params.id } });
      return res.json(user);
    } catch (err) {
      return console.log("Erro na busca: ", err);
    }
  },
  async createUser(req, res) {
    // #swagger.tags = ['Users']
    const { name, phone, email, cpf, address } = req.body;
    try {
      const oldUserEmail = await Users.findOne({ where: { email: email } });
      const oldUserCpf = await Users.findOne({ where: { cpf: cpf } });
      if (oldUserEmail || oldUserCpf) {
        res.status(409).send({
          msg: `${
            oldUserEmail
              ? "O email inserido já está em uso"
              : "Já exite um usuário cadastrado com esse cpf"
          }`,
        });
      } else {
        const user = await Users.create({
          name,
          phone,
          email,
          cpf,
          address,
        });
        return res.status(201).json(user);
      }
    } catch (err) {
      console.log("Erro na criação", err);
      return res.status(201).json({ msg: "Erro ao inserir usuário" });
    }
  },
  async updateUser(req, res) {
    // #swagger.tags = ['Users']
    const Sequelize = require("sequelize");
    const Op = Sequelize.Op;
    const { name, phone, email, cpf, address } = req.body;
    const id = req.params.id;
    try {
      await Users.update(
        {
          name,
          phone,
          email,
          cpf,
          address,
        },
        { where: { id: { [Op.eq]: id } } }
      );
      return res
        .status(200)
        .json({ msg: `Usuário ${name} atualizado com sucesso!` });
    } catch (error) {
      return res
        .status(401)
        .json({ msg: `Usuário ${name} não foi atualizado` }, err);
    }
  },
  async deleteUser(req, res) {
    // #swagger.tags = ['Users']
    try {
      await Users.destroy({ where: { id: req.params.id } });
      return res.status(200).json({
        msg: `Exclusão de usuário realizada com sucesso!`,
      });
    } catch (err) {
      console.log("Erro na exclusão: ", err);
      return res
        .status(401)
        .json({ msg: `Não foi possível excluir usuário` }, err);
    }
  },
};
