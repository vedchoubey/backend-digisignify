const { default: mongoose } = require("mongoose");

const database = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        console.log("Connected to the databse");
      })
      .catch((error) => {
        console.log("could not connect to the databse", error);
      });
  } catch (error) {
    console.log("could not connect to the databse", error);
  }
};

module.exports = database;
