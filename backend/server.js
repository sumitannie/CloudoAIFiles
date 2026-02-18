import express from "express";
import authRoutes from "./routes/authRoutes.js";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import fileRoutes from "./routes/fileRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Keep-alive route
app.get("/ping", (req, res) => {
  res.send("Pong! Server is awake.");
});

// Test route
app.get("/", (req, res) => {
  res.send("CloudoFilesAI Backend Running");
});

app.use("/api/auth", authRoutes);

app.use("/api/files", fileRoutes);

// Connect DB + Start Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    
    const PORT = process.env.PORT || 5000;
    
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.log(err));


  //token after Login in thunder Client: 
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzI2YTc2NzA4NzFhYmJiYjQzODJjZSIsImlhdCI6MTc2NTU0MDIwNSwiZXhwIjoxNzY2MTQ1MDA1fQ.v-oAPe5KTFqM1mhlVYb1crVhWyBbMC8kqly7hQ2WAR0

// response from hoppscotch:

//   {
//   "msg": "Image uploaded successfully",
//   "image": {
//     "url": "https://res.cloudinary.com/dcczapkci/image/upload/v1765561313/imageVaultUploads/ikwekfmh2jsorxfgfrmm.png",
//     "public_id": "imageVaultUploads/ikwekfmh2jsorxfgfrmm",
//     "owner": "69326a7670871abbbb4382ce",
//     "_id": "693c53e240c711b50747290f",
//     "createdAt": "2025-12-12T17:41:54.075Z",
//     "updatedAt": "2025-12-12T17:41:54.075Z",
//     "__v": 0
//   }
// }



// token after login:

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzI2YTc2NzA4NzFhYmJiYjQzODJjZSIsImlhdCI6MTc2NjU4MDUyNywiZXhwIjoxNzY3MTg1MzI3fQ.3q-AIEITFtLxZ18XkQJaGKMznsbQ_meB_rqW0CN-mRc
