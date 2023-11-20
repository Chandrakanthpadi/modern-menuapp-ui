import React, { useEffect } from "react";
import axiosClient from "../API/axiosClient";
import { useState } from "react";
import CategoryList from "../components/CategoryList";
import "../styles/menuStyles.css";
import { useParams } from "react-router-dom";

function Menu() {
  const params = useParams();
  const [menuData, setMenuData] = useState([]);

  const [restaurantDetails, setrestaurantDetails] = useState([]);

  useEffect(() => {
    axiosClient
      .get(`/api/v1/menu?restaurantName=${params.restaurantName}`)
      .then((data) => {
        setMenuData(Object.entries(data.data));
      });

    axiosClient
      .get(`/api/v1/restaurnat?restaurantName=${params.restaurantName}`)
      .then((data) => {
        console.log(data.data);
        setrestaurantDetails(data.data);
      });
  }, []);

  return (
    <div className="menu">
      <div className="restaurant-title">
        <h1>{restaurantDetails.restaurantName}</h1>
        <div className="res">
          <div className="res_block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="location"
            >
              <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"></path>
            </svg>
            <p className="res_detail">{restaurantDetails.address}</p>
          </div>
          <div className="res">
            <div className="res_block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="location"
              >
                <path d="M21 16.42V19.9561C21 20.4811 20.5941 20.9167 20.0705 20.9537C19.6331 20.9846 19.2763 21 19 21C10.1634 21 3 13.8366 3 5C3 4.72371 3.01545 4.36687 3.04635 3.9295C3.08337 3.40588 3.51894 3 4.04386 3H7.5801C7.83678 3 8.05176 3.19442 8.07753 3.4498C8.10067 3.67907 8.12218 3.86314 8.14207 4.00202C8.34435 5.41472 8.75753 6.75936 9.3487 8.00303C9.44359 8.20265 9.38171 8.44159 9.20185 8.57006L7.04355 10.1118C8.35752 13.1811 10.8189 15.6425 13.8882 16.9565L15.4271 14.8019C15.5572 14.6199 15.799 14.5573 16.001 14.6532C17.2446 15.2439 18.5891 15.6566 20.0016 15.8584C20.1396 15.8782 20.3225 15.8995 20.5502 15.9225C20.8056 15.9483 21 16.1633 21 16.42Z"></path>
              </svg>
              <p className="res_detail">{restaurantDetails.contactNo}</p>
            </div>
          </div>
        </div>
      </div>
      {menuData.map((data) => {
        return <CategoryList category={data} />;
      })}
    </div>
  );
}

export default Menu;
