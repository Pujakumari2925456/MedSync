import { useState, CSSProperties } from "react";
import { ClipLoader } from "react-spinners";
import React from "react";

const spinner = () => {
  return (
    <div class="d-flex justify-content-center spinner">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default spinner;
