import React, { useEffect, useState } from "react";
import AdminItem from "./AdminItem";

function AdminCategoryList({ category, refresh, showCategory }) {
  const [showCategoryState, setShowCategoryState] = useState(false);

  return (
    <div className="menu-category">
      <h2
        className="menuh"
        onClick={() => {
          setShowCategoryState((value) => !value);
        }}
      >
        {category[0]}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={!showCategoryState ? "icon" : "icon iconactive"}
        >
          <path d="M12 16L6 10H18L12 16Z"></path>
        </svg>
      </h2>

      {showCategoryState ? (
        <div className="menu-list">
          {category[1].map((item) => {
            return (
              <AdminItem
                key={item.itemName}
                name={item.itemName}
                price={item.price}
                status={item.status}
                id={item.itemId}
                type={item.type}
                categoryCurent={item.categoryName}
                refresh={refresh}
              />
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AdminCategoryList;
