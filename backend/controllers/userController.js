const User = require("../models/User");
const bcrypt = require("bcryptjs");
const createJWT = require("../helper/createJWT");
const jwt = require("jsonwebtoken");
const Mail = require("../models/Mail");

const createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const isAvailable = await User.findOne({ email: email });
    if (isAvailable) {
      res.json({
        res: 2,
        isAvailable,
      });
    } else {
      const user = await User.create(req.body);
      res.json({
        res: 1,
        user,
      });
    }
  } catch (error) {
    res.json({
      res: 3,
      error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    User.findOne({ email: email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            const token = createJWT(user._id);
            res.json({
              res: 1,
              token,
            });
          } else {
            res.json({
              res: 2,
            });
          }
        });
      } else {
        res.json({
          res: 3,
        });
      }
    });
  } catch (error) {
    res.json({
      res: 4,
      error,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { token } = req.params;
    const jwtVerify = jwt.verify(token, "taskprivatekey");
    const user = await User.findOne({ _id: jwtVerify._id });
    res.json({
      res: 1,
      user,
    });
  } catch (error) {
    res.json({
      res: 2,
      error,
    });
  }
};

const mailToStars = async (req, res) => {
  try {
    const { _id, mailList } = req.body;
    const user = await User.findOne({ _id: _id });

    user.messages = user.messages.filter(
      (item) => !mailList.includes(item.toString())
    );
    mailList.forEach((element) => {
      user.stars.push(element);
    });
    user.save();
    res.json({
      res: 1,
      user,
    });
  } catch (error) {
    res.json({
      res: 2,
      error,
    });
  }
};

const mailToTrash = async (req, res) => {
  try {
    const { _id, mailList } = req.body;
    const user = await User.findOne({ _id: _id });
    user.messages = user.messages.filter(
      (item) => !mailList.includes(item.toString())
    );
    mailList.forEach((element) => {
      user.trash.push(element);
    });
    user.save();
    res.json({
      res: 1,
      user,
    });
  } catch (error) {
    res.json({
      res: 2,
      error,
    });
  }
};

const starsToMail = async (req, res) => {
  try {
    const { _id, mailList } = req.body;
    const user = await User.findOne({ _id: _id });

    user.stars = user.stars.filter(
      (item) => !mailList.includes(item.toString())
    );
    mailList.forEach((element) => {
      user.messages.push(element);
    });
    user.save();
    res.json({
      res: 1,
      user,
    });
  } catch (error) {
    res.json({
      res: 2,
      error,
    });
  }
};

const starsToTrash = async (req, res) => {
  try {
    const { _id, mailList } = req.body;
    const user = await User.findOne({ _id: _id });

    user.stars = user.stars.filter(
      (item) => !mailList.includes(item.toString())
    );
    mailList.forEach((element) => {
      user.trash.push(element);
    });
    user.save();
    res.json({
      res: 1,
      user,
    });
  } catch (error) {
    res.json({
      res: 2,
      error,
    });
  }
};

const trashToMail = async (req, res) => {
  try {
    const { _id, mailList } = req.body;
    const user = await User.findOne({ _id: _id });

    user.trash = user.trash.filter(
      (item) => !mailList.includes(item.toString())
    );
    mailList.forEach((element) => {
      user.messages.push(element);
    });
    user.save();
    res.json({
      res: 1,
      user,
    });
  } catch (error) {
    res.json({
      res: 2,
      error,
    });
  }
};

const clearTrash = async (req, res) => {
  try {
    const { _id, mailList } = req.body;
    const user = await User.findOne({ _id: _id });

    user.trash = user.trash.filter(
      (item) => !mailList.includes(item.toString())
    );

    mailList.forEach(async (element) => {
      const mail = await Mail.findOne({ _id: element });
      const user1 = await User.findOne({ email: mail.senderEmail });
      const user2 = await User.findOne({ email: mail.receiverEmail });
      if (
        user1.messages.findIndex((item) => item.toString() === element) ===
          -1 &&
        user1.stars.findIndex((item) => item.toString() === element) === -1 &&
        user1.trash.findIndex((item) => item.toString() === element) === -1 &&
        user2.messages.findIndex((item) => item.toString() === element) ===
          -1 &&
        user2.stars.findIndex((item) => item.toString() === element) === -1 &&
        user1.trash.findIndex((item) => item.toString() === element) === -1
      ) {
        await Mail.findOneAndDelete({ _id: element });
      }
    });

    user.save();
    res.json({
      res: 1,
      user,
    });
  } catch (error) {
    res.json({
      res: 2,
      error,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  getUser,
  mailToStars,
  mailToTrash,
  starsToMail,
  starsToTrash,
  trashToMail,
  clearTrash,
};
