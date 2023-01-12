const router = require("express").Router();

const userController = require("../controllers/userController");
const Controller = require("../controllers/foodController");
const categoriesController = require("../controllers/categoriesController");

router.get("/food", Controller.fetchDataFood);
router.get("/food/:id", Controller.getDataFoodById);
router.post("/food", Controller.addDataFood);
router.put("/food/:id", Controller.updateDataFood);
router.delete("/food/:id", Controller.deleteDataFood);

router.post("/register", userController.userRegister);
router.post("/login", userController.userLogin);

router.get("/categories", categoriesController.fetchCategories);
router.post("/categories", categoriesController.addCategories);
router.put("/categories/:id", categoriesController.updateCategories);
router.delete("/categories/:id", categoriesController.deleteCategory);

module.exports = router;
