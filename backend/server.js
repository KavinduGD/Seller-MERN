import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import productRouter from "./routes/productionRoute.js";

// config env
dotenv.config();

const app = express();

//middleware
//app.use(express.json());
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//
app.use("/products", productRouter);
app.use("/api/user", userRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>hi</h1>");
});

// //image
// import upload from "./multer.js";
// import cloudinary from "./cloudinary.js";
// import fs from "fs";
// app.use("/upload-image", upload.array("image"), async (req, res) => {
//   const uploader = async (path) => await cloudinary(path, "Images");
//   console.log("awa");
//   if (req.method === "POST") {
//     const urls = [];
//     const files = req.files;

//     for (const file of files) {
//       const { path } = file;
//       const newPath = await uploader(path);
//       urls.push(newPath);
//       fs.unlinkSync(path);
//     }

//     res.status(200).json({
//       message: "Image Upload Succcessfully",
//       data: urls,
//     });
//   } else {
//     res.status(405).json({
//       err: "not succeful",
//     });
//   }
// });

//db config
connectDB();

//Port
const PORT = process.env.PORT || 8080;
const MODE = process.env.DEV_MODE;

app.listen(PORT, () => {
  console.log(`server is running on ${MODE} mode on ${PORT}`);
});
