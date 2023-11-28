import React, { useState } from "react";
import DisconnectPopup from "../popups/disconnectPopup";

const SwitchButton = () => {
  const [isOn, setIsOn] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // state variable to manage popup visibility

  const handleToggle = () => {
    setIsOn(!isOn);
    if (!isOn) {
      setShowPopup(true); // Show popup on checkbox check
    } else {
      setShowPopup(false); // Hide popup on checkbox uncheck
    }
  };

  const handleOnclose = () => setShowPopup(false);

  return (
    <div className="switch-button">
      <label>
        <input type="checkbox" checked={isOn} onChange={handleToggle} />
        <span className="slider"></span>
      </label>
      {showPopup && (
        <DisconnectPopup onClose={handleOnclose} visible={showPopup} />
      )}
    </div>
  );
};

export default SwitchButton;
