const { hashCompare, createToken } = require("../helper/helper");
const { User, sequelize } = require("../models");
class Controller {
  static async userRegister(req, res, next) {
    const t = await sequelize.transaction();
    try {
      let { email, password, phoneNumber, address } = req.body;
      const user = await User.create(
        { email, password, role: "Admin", phoneNumber, address },
        { transaction: t }
      );
      await t.commit();
      res.status(201).json(user);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
  static async userLogin(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email }, transaction: t });
      if (!user) {
        throw { name: "User Not Found" };
      }
      const validatePassword = hashCompare(password, user.password);
      if (!validatePassword) {
        throw { name: "User Not Found" };
      }
      const payload = {
        id: user.id,
      };

      const access_token = createToken(payload);

      await t.commit();
      res.status(200).json({ access_token, userId: user.id });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}
module.exports = Controller;
