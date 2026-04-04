
const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/vaultpass');
    console.log("MongoDB connected".bgCyan.black.bold);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = connectDB;