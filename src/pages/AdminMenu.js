import React, { useEffect, useState } from "react";
import axiosClient from "../API/axiosClient";
import { useRestaurantContext } from "../store/RestaurantContextProvider";
import AdminCategoryList from "../components/AdminCategoryList";
import "../styles/CommonStyle.css";
import { Link, Navigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

function AdminMenu() {
  const { restaurant } = useRestaurantContext();

  const [refresh, setRefresh] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    if (Object.keys(restaurant).length == 0) setLoggedIn(false);
    else setLoggedIn(true);
  }, []);

  const [menuData, setMenuData] = useState([]);
  const [viewQR, setViewQR] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const name = restaurant.restaurantName;
    name.replace(" ", "%20");
    setUrl(`http://192.168.1.5:3000/restaurant/${name}`);

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

  return loggedIn ? (
    <div className="menu">
      <div className="restaurant-title">
        <Link
          to={`/restaurant/${restaurant.restaurantName}`}
          className="login-reg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h1>{restaurant.restaurantName}</h1>
        </Link>
        <button onClick={viewQRfunction} className="logout-btn">
          View QR
        </button>

        {viewQR ? <div className="qr">{qrcode}</div> : <></>}

        <button
          onClick={() => {
            setLoggedIn(false);
          }}
          className="logout-btn"
        >
          Logout
        </button>
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
