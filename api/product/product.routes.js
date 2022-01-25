const express = require("express");
const router = express.Router();

const product = require("./product.controller");


router.get("/", product.getAll);
router.post("/fill", product.fillData);
router.get("/:id", product.getById);



module.exports = router;