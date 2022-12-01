const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

//AUTH
router.post("/create", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/:token", userController.getUser);

//STARS
router.post("/stars", userController.mailToStars);
router.post("/stars/remove", userController.starsToMail);
router.post("/stars/trash", userController.starsToTrash);

//TRASH
router.post("/trash", userController.mailToTrash);
router.post("/trash/remove", userController.trashToMail);
router.post("/trash/clear", userController.clearTrash);

module.exports = router;
