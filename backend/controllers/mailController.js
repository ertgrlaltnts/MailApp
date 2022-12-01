const Mail = require("../models/Mail");
const User = require("../models/User");
const moment = require("moment");

const createMail = async (req, res) => {
  try {
    const { senderEmail, receiverEmail, title, message } = req.body;

    const senderUser = await User.findOne({ email: senderEmail });
    const receiverUser = await User.findOne({ email: receiverEmail });

    if (!receiverUser || !senderUser) {
      res.json({
        res: 3,
      });
    } else {
      const messageObj = {
        sender: senderEmail,
        receiver: receiverEmail,
        message: message,
        date: moment().format("LLL"),
      };
      const mail = await Mail.create({
        senderEmail: senderEmail,
        receiverEmail: receiverEmail,
        title: title,
        messages: messageObj,
      });

      senderUser.messages.push(mail._id);
      receiverUser.messages.push(mail._id);
      senderUser.save();
      receiverUser.save();

      res.json({
        res: 1,
        mail,
      });
    }
  } catch (error) {
    res.json({
      res: 2,
      error,
    });
  }
};

const replyMail = async (req, res) => {
  try {
    const { mailID, senderEmail, receiverEmail, message } = req.body;
    const receiver = await User.findOne({ email: receiverEmail });
    mailFindId = receiver.messages.findIndex(
      (item) => item._id.toString() === mailID
    );
    starsFindId = receiver.stars.findIndex(
      (item) => item._id.toString() === mailID
    );
    trashFindId = receiver.trash.findIndex(
      (item) => item._id.toString() === mailID
    );
    if (mailFindId === -1 && starsFindId === -1 && trashFindId === -1) {
      receiver.messages.push(mailID);
      receiver.save();
    }
    const responseObj = {
      sender: senderEmail,
      receiver: receiverEmail,
      message: message,
      date: moment().format("LLL"),
    };
    const mail = await Mail.findOne({ _id: mailID });
    mail.messages.push(responseObj);
    mail.save();
    res.json({
      res: 1,
      mail,
    });
  } catch (error) {
    res.json({
      res: 2,
      error,
    });
  }
};

const readMail = async (req, res) => {
  try {
    const { mailID, receiverEmail } = req.body;
    const mail = await Mail.findOne({ _id: mailID });
    mail.messages.forEach((element, index) => {
      if (element.receiver === receiverEmail) {
        mail.messages[index].isRead = true;
      }
    });
    mail.save();

    res.json({
      res: 1,
      mail,
    });
  } catch (error) {
    res.json({
      res: 2,
      error,
    });
  }
};

const openId = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findOne({ _id: _id });
    const messagesData = await Mail.find()
      .where("_id")
      .in(user.messages)
      .exec();
    const starsData = await Mail.find().where("_id").in(user.stars).exec();
    const trashData = await Mail.find().where("_id").in(user.trash).exec();

    res.json({
      res: 1,
      messagesData,
      starsData,
      trashData,
    });
  } catch (error) {
    res.json({
      res: 2,
      error,
    });
  }
};

module.exports = { createMail, replyMail, readMail, openId };
