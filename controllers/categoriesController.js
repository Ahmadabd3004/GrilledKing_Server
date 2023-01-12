const { Category, sequelize } = require("../models");
class Controller {
  static async fetchCategories(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const categories = await Category.findAll({ transaction: t });
      t.commit();
      res.status(200).json(categories);
    } catch (error) {
      t.rollback();
      next(error);
    }
  }
  static async addCategories(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name } = req.body;
      const category = await Category.create({ name }, { transaction: t });
      if (!category) {
        throw { name: "Data not Found" };
      }
      t.commit();
      res.status(201).json({ msg: "success add category" });
    } catch (error) {
      t.rollback();
      next(error);
    }
  }
  static async updateCategories(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { name } = req.body;
      const category = await Category.findByPk(id);
      if (!category) {
        throw { name: "Data not Found" };
      }
      await Category.update({ name }, { where: { id }, transaction: t });
      if (!category) {
        throw { name: "Data not Found" };
      }
      t.commit();
      res.status(200).json({ msg: "Succes Update Category" });
    } catch (error) {
      t.rollback();
      next(error);
    }
  }
  static async deleteCategory(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) {
        throw new Error("Data not Found");
      }
      await Category.destroy({ where: { id }, transaction: t });
      if (!category) {
        throw new Error("Something went wrong");
      }
      t.commit();
      res.status(200).json({ msg: "Succes delete Category" });
    } catch (error) {
      t.rollback();
      next(error);
    }
  }
}
module.exports = Controller;
