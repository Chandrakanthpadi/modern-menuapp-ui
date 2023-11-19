import React, { useState, useRef, useEffect } from "react";
import { Toggle } from "./Toggle";
import axiosClient from "../API/axiosClient";
import { useRestaurantContext } from "../store/RestaurantContextProvider";
import { type } from "@testing-library/user-event/dist/type";

function AdminItem({ name, price, status, id, categoryCurent, type, refresh }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const { restaurant, category } = useRestaurantContext();
  const [typeC, setTypeC] = useState("Veg");
  // const [CName, setCName] = useState(category);
  const [currentCategory, setCurrentCategory] = useState(categoryCurent);
  const [show, setShow] = useState(false);
  const [itemStatus, setItemStatus] = useState(status);

  const iName = useRef();
  const rate = useRef();
  const cName = useRef();

  // useEffect(() => {
  //   axiosClient
  //     .get(
  //       `/api/v1/restaurnat/category?restaurantId=${restaurant.restaurantId}`
  //     )
  //     .then((data) => {
  //       setCategory(data.data);
  //       if (data.data.length == 0) setShow(true);
  //     });
  // }, []);

  const changeStatus = () => {
    axiosClient.patch(`/api/v1/item/notify?itemId=${id}`, {}).then((data) => {
      if ((data.status = 200)) {
        refresh((val) => !val);
        setItemStatus((status) => !status);
      }
    });
    // window.location.reload(true);
    // setLocaStatus((st) => !st);
  };

  const showModal = () => {
    setShowEditModal((val) => !val);
  };

  const onCategoryChange = (e) => {
    e.target.value == "Other" ? setShow(true) : setShow(false);
    setCurrentCategory(e.target.value);
  };
  const onTypeChange = (e) => {
    setTypeC(e.target.value);
  };

  const updateItemAction = (e, itemId) => {
    e.preventDefault();

    console.log(itemId);

    axiosClient
      .patch(
        `/api/v1/item/update?itemId=${itemId}`,
        JSON.stringify({
          itemName: iName.current.value,
          price: rate.current.value,
          type: typeC,
          restaurantId: restaurant.restaurantId,
          categoryName:
            currentCategory === "Other" ? cName.current.value : currentCategory,
        })
      )
      .then((data) => {
        if ((data.status = 200)) {
          setShowEditModal((val) => !val);
          refresh((val) => !val);
        }
      });
  };

  const deleteItemAction = (e, itemId) => {
    e.preventDefault();

    console.log(itemId);

    axiosClient
      .delete(`/api/v1/item/remove`, {
        data: JSON.stringify({
          itemName: iName.current.value,
          price: rate.current.value,
          type: typeC,
          restaurantId: restaurant.restaurantId,
          categoryName: currentCategory,
        }),
      })
      .then((data) => {
        if ((data.status = 200)) {
          setShowEditModal((val) => !val);
          refresh((val) => !val);
        }
      });
  };

  // console.log(category);

  return (
    <div>
      <div className={status == true ? "item" : "item disable"}>
        <div className="item-block" onClick={showModal}>
          <div className="item-box">
            <div
              className={type == "Non-Veg" ? "box non-veg" : "box veg"}
            ></div>
            <div className="item-name">{name}</div>
          </div>
          <div className="price admin">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-currency-rupee"
              viewBox="0 0 16 16"
            >
              <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z" />
            </svg>
            <div>{price}</div>
          </div>
        </div>
        <Toggle onClick={changeStatus} toggled={itemStatus}></Toggle>
      </div>
      {showEditModal ? (
        <div className="admin-login-wrapper">
          <form className="login-box">
            <label>Item Name</label>
            <input
              ref={iName}
              className="login-item"
              defaultValue={name}
            ></input>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.1rem",
              }}
            >
              Price{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-currency-rupee"
                viewBox="0 0 16 16"
              >
                <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z" />
              </svg>
            </label>
            <input
              ref={rate}
              className="login-item"
              type="number"
              defaultValue={price}
            ></input>
            <label>Type</label>
            <select
              onChange={onTypeChange}
              className="login-item"
              defaultValue={type}
            >
              <option>Veg</option>
              <option>Non-Veg</option>
            </select>
            <label>Category</label>
            {/* <input ref={cName} className="login-item"></input> */}
            <select
              onChange={onCategoryChange}
              className="login-item"
              defaultValue={currentCategory}
            >
              {category.map((item) => {
                return <option key={item}>{item}</option>;
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
            <button
              type="submit"
              onClick={(e) => updateItemAction(e, id)}
              className="login-item"
            >
              Update Item
            </button>
            <button
              type="submit"
              onClick={(e) => deleteItemAction(e, id)}
              className="login-item"
            >
              Delete Item
            </button>
          </form>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AdminItem;
