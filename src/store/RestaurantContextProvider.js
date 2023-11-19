import React, { useContext, useEffect, useState } from "react";

const RestaurantContext = React.createContext();

export function useRestaurantContext() {
  return useContext(RestaurantContext);
}

export const RestaurantContextProvider = ({ children }) => {
  const [restaurant, setRestaurant] = useState(() => {
    const stored = localStorage.getItem("restaurant");
    return JSON.parse(stored);
  });

  const [category, setCategory] = useState(() => {
    const stored = localStorage.getItem("category");
    return JSON.parse(stored);
  });

  useEffect(() => {
    localStorage.setItem("restaurant", JSON.stringify(restaurant));
  }, [restaurant]);

  useEffect(() => {
    localStorage.setItem("category", JSON.stringify(category));
  }, [category]);

  return (
    <RestaurantContext.Provider
      value={{
        restaurant,
        category,
        setRestaurant,
        setCategory,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};
