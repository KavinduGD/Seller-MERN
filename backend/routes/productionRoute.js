import express from "express";
import { createProductController } from "../controllers/productController.js";
import { updateProductController } from "../controllers/productController.js";
import { deleteProductController } from "../controllers/productController.js";
import { getProductbyIdController } from "../controllers/productController.js";
import { getAllProductsController } from "../controllers/productController.js";
import { getProductByNameController } from "../controllers/productController.js";
import { ImageUploaderCtrl } from "../controllers/productController.js";
import { getProductbySellerIdController } from "../controllers/productController.js";
const router = express.Router();
import upload from "../multer.js";
// create product
router.post(
  "/addProducts/:sellerId",
  upload.single("image"),
  createProductController
);

router.patch("/update/:id", upload.single("image"), updateProductController);

router.delete("/delete/:id", deleteProductController);

router.get("/getProductbyId/:id", getProductbyIdController);

router.get("/all/", getAllProductsController);

router.get("/getProductbyName/:name", getProductByNameController);

router.get("/getProductbySellerId/:sellerId", getProductbySellerIdController);

router.post("/upload-image", upload.single("image"), ImageUploaderCtrl);
export default router;
