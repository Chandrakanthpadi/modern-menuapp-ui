import React, { useEffect, useState } from "react";
import AdminItem from "./AdminItem";

function AdminCategoryList({ category, refresh, showCategory }) {
  const [showCategoryState, setShowCategoryState] = useState(false);

  return (
    <div className="menu-category">
      <h2
        className={showCategory ? "menuh active" : "menuh"}
        onClick={() => {
          setShowCategoryState((value) => !value);
        }}
      >
        {category[0]}
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
