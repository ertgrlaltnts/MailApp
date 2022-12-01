const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    name: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mail",
      },
    ],
    stars: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mail",
      },
    ],
    trash: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mail",
      },
    ],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
