import React, { useState } from "react";
import axios from "axios";
import "./AddProductForm.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("category", category);
    formData.append("image", image);

    const seller = user.sellerID;
    console.log(seller);

    try {
      const response = await axios.post(
        `http://localhost:4001/products/addProducts/${seller}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if (response.data) {
        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setImage("");
        setImagePreviewUrl(null);
        alert("Product added successfully!");
        console.log(response.data);
        navigate(`/products/${response.data}`);
        //window.location.href = `http://localhost:3000/products/${response.data}`;
      }
    } catch (error) {
      console.error(error);
      alert("Product Could not added!");
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreviewUrl(e.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  return (
    <div className="add-product-form-container">
      <div className="just text">
        <h1>Add a Product</h1>
      </div>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            className="form-control"
            type="text"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            className="form-control"
            type="number"
            id="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            className="form-control"
            type="number"
            id="quantity"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            className="form-control"
            type="text"
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            className="form-control"
            type="file"
            id="image"
            onChange={handleImageChange}
            required
          />
        </div>

        {imagePreviewUrl && (
          <div className="form-group">
            <label>Image Preview</label>
            <img
              src={imagePreviewUrl}
              alt="Selected product"
              style={{
                maxWidth: "100%",
                height: "300px",
                objectFit: "contain",
              }}
            />
          </div>
        )}
        <div className="button-container">
          <button className="btn btn-primary" type="submit">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
