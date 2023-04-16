import mongoose from "mongoose";

const connectDB = async () => {
  // mongoose.set("useCreateIndex", true);
  mongoose.set("strictQuery", false);
  try {
    const URL =
      "mongodb+srv://Udemy:123456321@cluster0.fwjii.mongodb.net/?retryWrites=true&w=majority";
    const conn = await mongoose.connect(URL, {
      dbName: "HIGHON",
      autoIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB", conn.connection.host);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
