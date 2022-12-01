const mongoose = require("mongoose");

const connectDb = async (db_url) => {
  try {
    const dbOptions = {
      dbName: "mbl",
    };

    await mongoose.connect(db_url, dbOptions);
    console.log("DB'ye bağlanıldı");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
