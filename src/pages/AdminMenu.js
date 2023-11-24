import React, { useEffect, useState } from "react";
import axiosClient from "../API/axiosClient";
import { useRestaurantContext } from "../store/RestaurantContextProvider";
import AdminCategoryList from "../components/AdminCategoryList";
import "../styles/CommonStyle.css";
import { Link, Navigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

function AdminMenu() {
  const { restaurant, setRestaurant } = useRestaurantContext();

  const [refresh, setRefresh] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    if (Object.keys(restaurant).length == 0) setLoggedIn(false);
    else setLoggedIn(true);
  }, []);

  const [menuData, setMenuData] = useState([]);
  const [status, setStatus] = useState(restaurant.isOpen);
  const [viewQR, setViewQR] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const name = restaurant.restaurantName;
    name.replace(" ", "%20");
    setUrl(`http://54.187.252.65:3000/restaurant/${name}`);

    // Big Problem
    setTimeout(() => {
      // console.log("Modern Menu");
      document.documentElement.style.setProperty("--hbg", "#000");
      axiosClient
        .get(`/api/v1/menu?restaurantName=${restaurant.restaurantName}`)
        .then((data) => {
          setMenuData(Object.entries(data.data));
        });
    }, 500);
  }, [refresh]);

  const changeStatus = () => {
    axiosClient
      .patch(
        `/api/v1/restaurnat/notify?restaurantName=${restaurant.restaurantName}`
      )
      .then(() => {
        setStatus((pre) => !pre);
      });
  };

  useEffect(() => {
    const newRes = { ...restaurant };
    newRes.isOpen = status;
    setRestaurant(newRes);
  }, [status]);

  const viewQRfunction = () => {
    setViewQR((prev) => !prev);
  };

  // Need to customize the QR according to the colors.
  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={url}
      size={300}
      bgColor={"#e0dfd5"}
      level={"L"}
      fgColor={"#f06543"}
      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
    />
  );

  console.log(restaurant.address);
  return loggedIn ? (
    <div className="menu">
      <div className="restaurant-title">
        <Link
          to={`/restaurant/${restaurant.restaurantName}`}
          className="login-reg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h1 className={status ? "active" : "closed"}>
            {restaurant.restaurantName}
          </h1>
        </Link>
        <div className="res">
          <div className="res_block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="location"
            >
              <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"></path>
            </svg>
            <p className="res_detail">{restaurant.address}</p>
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
              <a className="res_detail" href={"tel:" + restaurant.contactNo}>
                {restaurant.contactNo}
              </a>
            </div>
          </div>
        </div>
        <div>
          <button onClick={viewQRfunction} className="action-btn">
            View QR
          </button>

          {viewQR ? <div className="qr">{qrcode}</div> : <></>}
          <button
            onClick={() => {
              changeStatus();
            }}
            className="action-btn"
          >
            {status ? "Close" : "Open"}
          </button>
          <button
            onClick={() => {
              setLoggedIn(false);
            }}
            className="action-btn"
          >
            Logout
          </button>
        </div>
      </div>
      <Link to="/admin/add" className="link add">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="icon"
        >
          <path d="M18 15L17.999 18H21V20H17.999L18 23H16L15.999 20H13V18H15.999L16 15H18ZM11 18V20H3V18H11ZM21 11V13H3V11H21ZM21 4V6H3V4H21Z"></path>
        </svg>
        Add Item
      </Link>

      {menuData.map((data) => {
        return (
          <AdminCategoryList
            category={data}
            refresh={setRefresh}
            key={data[0]}
          />
        );
      })}
    </div>
  ) : (
    <Navigate to="/login"></Navigate>
  );
}

export default AdminMenu;
