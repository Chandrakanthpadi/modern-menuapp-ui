import { useState } from "react";
import "../styles/CommonStyle.css";

export const Toggle = ({ toggled, onClick }) => {
  const [isToggled, setToggle] = useState(toggled);

  const callback = () => {
    onClick(!isToggled);
  };

  return (
    <div className="checkbox-wrapper">
      <input
        type="checkbox"
        defaultChecked={isToggled}
        onClick={callback}
        className="react-switch-checkbox"
      />
    </div>
  );
};
