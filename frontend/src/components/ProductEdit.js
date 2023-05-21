import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ProductEdit.css";

const ProductEdit = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:4001/products/getProductbyId/${id}`
      );
      setData(response.data);
      setName(response.data.name);
      setDescription(response.data.description);
      setPrice(response.data.price);
      setQuantity(response.data.quantity);
      setCategory(response.data.category);
      setImageUrl(response.data.imageUrl);
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("category", category);

    if (imageUrl instanceof File) {
      formData.append("image", imageUrl, imageUrl.name);
    } else {
      formData.append("imageUrl", imageUrl);
    }

    await axios.patch(`http://localhost:4001/products/update/${id}`, formData);
    alert("Product updated!");
    console.log("id");
    navigate(`/products/${id}`);
    // window.location.href = `http://localhost:3000/products/${id}`;
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-edit-lol">
      <div className="product-edit">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Price:</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <label>Image:</label>
          <img src={imageUrl} />

          <label>Image URL:</label>
          <input
            type="file"
            onChange={(e) => {
              setImageUrl(e.target.files[0]);
              const reader = new FileReader();
              reader.onload = (e) => {
                const reader = new FileReader();
                setImagePreviewUrl(e.target.result);
              };
              reader.readAsDataURL(e.target.files[0]);
            }}
          />
          {imagePreviewUrl && <img src={imagePreviewUrl} alt="product-image" />}

          <button type="submit">Save</button>
          <Link to={`/products/${id}`}>Cancel</Link>
        </form>
      </div>
    </div>
  );
};

export default ProductEdit;
