// import { useState, CSSProperties } from "react";
// import { ClipLoader } from "react-spinners";
// import React from "react";

// const spinner = () => {
//   return (
//     <div class="d-flex justify-content-center spinner">
//       <div class="spinner-border" role="status">
//         <span class="visually-hidden">Loading...</span>
//       </div>
//     </div>
//   );
// };

// export default spinner;
import React from "react";

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center spinner">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
