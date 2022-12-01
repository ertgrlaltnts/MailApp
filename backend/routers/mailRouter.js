const express = require("express");
const mailController = require("../controllers/mailController");
const router = express.Router();

router.post("/send", mailController.createMail);
router.post("/reply", mailController.replyMail);
router.put("/read", mailController.readMail);
router.get("/open/:_id", mailController.openId);

module.exports = router;
