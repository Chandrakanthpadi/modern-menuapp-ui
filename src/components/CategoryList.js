import React, { useState } from "react";
import Item from "./Item";

function CategoryList({ category }) {
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
      </h2>
      {showCategoryState ? (
        <div className="menu-list">
          {category[1].map((item) => {
            return (
              <Item
                name={item.itemName}
                price={item.price}
                status={item.status}
                type={item.type}
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

export default CategoryList;
