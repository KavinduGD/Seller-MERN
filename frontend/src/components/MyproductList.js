import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProductList.css";
import { useAuthContext } from "../hooks/useAuthContext";

const MyProductList = ({ searchTerm }) => {
  const [data, setData] = useState(null);
  const { user } = useAuthContext();
  //console.log(user.sellerID);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const seller = user.sellerID;
        const response = await axios.get(
          `http://localhost:4001/products/getProductbySellerId/${seller}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, searchTerm]); // Remove the extra square brackets

  if (!data) {
    return <div>Loading...</div>;
  }

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="product-list" style={{ marginBottom: "190px" }}>
        {filteredData.map((item) => (
          <div className="product-list-item" key={item._id}>
            <Link to={`/products/${item._id}`}>
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
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProductList;
