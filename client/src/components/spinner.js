import React, { useState } from "react";
import { RiseLoader  } from "react-spinners";

const Spinner = () => {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#2f2f2f"); // You can change this color

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5", // Optional
      }}
    >
      <RiseLoader 
        color={color}
        loading={loading}
        size={30} // This is the box size (not the entire spinner)
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier={2}
      />
    </div>
  );
};

export default Spinner;
