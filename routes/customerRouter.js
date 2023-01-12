const router = require("express").Router();
const Controller = require("../controllers/foodController");

router.get("/food", Controller.fetchDataFood);
router.get("/food/:id", Controller.getDataFoodById);

module.exports = router;
