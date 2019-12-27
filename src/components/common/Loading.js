import React from "react";
import {
  Loader,
} from "tabler-react";


function Loading() {
  return (
    <div style={{
      padding: "100px 0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Loader />
    </div>
  );
};


export default Loading;