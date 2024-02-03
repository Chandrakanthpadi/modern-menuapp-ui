import React, { useEffect, useRef, useState } from "react";
import axiosClient from "../API/axiosClient";
import { Navigate } from "react-router-dom";
import { useRestaurantContext } from "../store/RestaurantContextProvider";
import "../styles/loginStyles.css";

function AddItem() {
  const { restaurant } = useRestaurantContext();
  const [typeC, setTypeC] = useState("Veg");
  const [CName, setCName] = useState("Other");
  const [addSuccess, setAddSuccess] = useState(false);
  const [category, setCategory] = useState([]);
  const [show, setShow] = useState(true);

  const iName = useRef();
  const rate = useRef();
  const cName = useRef();

  useEffect(() => {
    axiosClient
      .get(
        `/api/v1/restaurnat/category?restaurantId=${restaurant.restaurantId}`
      )
      .then((data) => {
        setCategory(data.data);
        if (data.data.length == 0) setShow(true);
      });
  }, []);

  const onCategoryChange = (e) => {
    e.target.value == "Other" ? setShow(true) : setShow(false);
    setCName(e.target.value);
  };
  const onTypeChange = (e) => {
    setTypeC(e.target.value);
  };

  const performLogin = (e) => {
    e.preventDefault();

    const item = {
      itemName: iName.current.value,
      price: rate.current.value,
      type: typeC,
    };
    let addRequest = JSON.stringify({
      restaurantId: restaurant.restaurantId,
      categoryName: CName === "Other" ? cName.current.value : CName,
      items: [item],
    });

    console.log(addRequest);

    axiosClient.post("/api/v1/item/add", addRequest).then((data) => {
      if ((data.status = 200)) {
        setAddSuccess(true);
      }
    });
  };

  return (
    <div>
      {addSuccess ? (
        <Navigate to="/admin/menu"></Navigate>
      ) : (
        <div className="login-wrapper">
          <form className="login-box">
            <label>Item Name</label>
            <input ref={iName} className="login-item"></input>
            <label>Price</label>
            <input ref={rate} className="login-item" type="number"></input>
            <label>Type</label>
            <select onChange={onTypeChange} className="login-item">
              <option>Veg</option>
              <option>Non-Veg</option>
            </select>
            <label>Category</label>
            {/* <input ref={cName} className="login-item"></input> */}
            <select onChange={onCategoryChange} className="login-item">
              {category.map((item) => {
                return <option>{item}</option>;
              })}
              <option>Other</option>
            </select>

            {show ? (
              <>
                <label>Category Name</label>
                <input className="login-item" ref={cName}></input>
              </>
            ) : (
              <></>
            )}

            <br />
            <button type="submit" onClick={performLogin} className="login-item">
              Add Item
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddItem;
