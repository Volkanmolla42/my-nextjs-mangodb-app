import mongoose from "mongoose";

const uri =
  "mongodb+srv://mollavolkan11:5w28qhZz3VLDQ5cW@chatappcluster.im9ox.mongodb.net/portfolio?retryWrites=true&w=majority";

async function connectToDatabase() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB bağlantısı sağlandı.");
  } catch (error) {
    console.error("MongoDB bağlantısı sağlanamadı:", error);
  }
}

connectToDatabase();
