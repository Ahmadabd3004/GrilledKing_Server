const { Food, User, Category, Ingredient, sequelize } = require("../models");
class Controller {
  static async fetchDataFood(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const food = await Food.findAll(
        {
          include: [
            {
              model: User,
              attributes: ["id", "email", "role"],
            },
            {
              model: Category,
              attributes: ["id", "name"],
            },
            {
              model: Ingredient,
            },
          ],
        },
        { transaction: t }
      );
      await t.commit();
      res.status(200).json(food);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async addDataFood(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {
        name,
        description,
        price,
        imgUrl,
        userId,
        categoryId,
        ingredients,
      } = req.body;
      const user = await Food.create(
        {
          name,
          description,
          price,
          imgUrl,
          userId,
          categoryId,
        },
        { transaction: t }
      );

      for (const item of ingredients) {
        await Ingredient.create(
          { name: item, foodId: user.id },
          { transaction: t }
        );
      }
      await t.commit();
      res.status(201).json(user);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async getDataFoodById(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const food = await Food.findByPk(
        id,
        {
          include: [
            {
              model: User,
            },
            {
              model: Category,
            },
          ],
        },
        { transaction: t }
      );
      if (!food) {
        throw { name: "Data not found" };
      }
      const ingredients = await Ingredient.findAll({ where: { foodId: id } });
      await t.commit();
      res.status(200).json({
        food,
        ingredients,
      });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async updateDataFood(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { name, description, price, imgUrl, userId, categoryId } = req.body;
      const food = await Food.findByPk(id, { transaction: t });
      if (!food) {
        throw { name: "Data not found" };
      }
      await Food.update(
        {
          name,
          description,
          price,
          imgUrl,
          userId,
          categoryId,
        },
        { where: { id }, transaction: t }
      );
      await t.commit();
      res.status(200).json({ msg: "success update food" });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
  static async deleteDataFood(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { name, description, price, imgUrl, userId, categoryId } = req.body;
      const food = await Food.findByPk(id, { transaction: t });
      if (!food) {
        throw { name: "Data not found" };
      }
      await Food.destroy({ where: { id }, transaction: t });
      await t.commit();
      res.status(200).json({ msg: "success delete food" });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}

module.exports = Controller;
