import Product from "../models/productModel.js";
import cloudinary from "../cloudinary.js";
import axios from "axios";

import fs from "fs";

export const createProductController = async (req, res) => {
  const uploader = async (path) => await cloudinary(path, "Images");

  const file = req.file;

  console.log(file);
  const { path } = file;
  const newPath = await uploader(path);
  const url = newPath.url;
  fs.unlinkSync(path);
  console.log(url);
  // res.status(200).json({
  //   message: "Image Upload Succcessfully",
  //   data: urls,
  // });

  const { name, description, price, quantity, category } = req.body;
  const { sellerId } = req.params;
  try {
    const newProduct = await Product.create({
      name,
      description,
      price,
      quantity,
      category,
      imageUrl: url,
      seller: sellerId,
    });
    console.log(newProduct);

    res.status(201).json(newProduct._id.toString());
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//update by id

export const updateProductController = async (req, res) => {
  const uploader = async (path) => await cloudinary(path, "Images");

  const file = req.file;
  let url;
  if (file) {
    console.log(file);
    const { path } = file;
    const newPath = await uploader(path);
    url = newPath.url;
    fs.unlinkSync(path);
  }

  const { id } = req.params;
  const { name, description, price, quantity, category } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, quantity, category, imageUrl: url },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//delete by id

export const deleteProductController = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    res.status(200).json(deletedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//get product by id

export const getProductbyIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// get all products
export const getAllProductsController = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//get product by Name
export const getProductByNameController = async (req, res) => {
  const { name } = req.params;

  try {
    const product = await Product.findOne({ name });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
//get product by sellerId
export const getProductbySellerIdController = async (req, res) => {
  const { sellerId } = req.params;
  const seller = sellerId;
  try {
    const product = await Product.find({ seller });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const ImageUploaderCtrl1 = async (req, res) => {
  const uploader = async (path) => await cloudinary(path, "Images");

  if (req.method === "POST") {
    const urls = [];
    const files = req.files;

    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }

    res.status(200).json({
      message: "Image Upload Succcessfully",
      data: urls,
    });
  } else {
    res.status(405).json({
      err: "not succeful",
    });
  }
};

export const ImageUploaderCtrl = async (req, res) => {
  const uploader = async (path) => await cloudinary(path, "Images");

  if (req.method === "POST") {
    const urls = [];
    const file = req.file;

    const { path } = file;
    const newPath = await uploader(path);
    urls.push(newPath);
    fs.unlinkSync(path);

    res.status(200).json({
      message: "Image Upload Succcessfully",
      data: urls,
    });
  } else {
    res.status(405).json({
      err: "not succeful",
    });
  }
};
