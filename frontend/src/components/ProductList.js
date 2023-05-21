import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProductList.css";

const ProductList = ({ searchTerm }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:4001/products/all/");
      setData(response.data);
    };
    //("http://localhost:8080/products/getProductbySellerId/seller");
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bigbox">
      <div className="product-list">
        {filteredData.map((item) => (
          <div className="product-list-item" key={item._id}>
            <img src={item.imageUrl} alt={item.name} />
            <div>
              <h5>{item.name}</h5>
              <p>
                <span className="price">Price: ${item.price}</span>
              </p>
              <p>
                <span className="quantity">Quantity: {item.quantity}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
