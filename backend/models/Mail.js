const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MailSchema = new Schema(
  {
    senderEmail: String,

    receiverEmail: String,

    title: {
      type: String,
      require: true,
    },

    messages: [
      {
        sender: String,

        receiver: String,

        message: {
          type: String,
          require: true,
        },

        isRead: {
          type: Boolean,
          default: false,
        },

        date: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Mail = mongoose.model("Mail", MailSchema);

module.exports = Mail;
