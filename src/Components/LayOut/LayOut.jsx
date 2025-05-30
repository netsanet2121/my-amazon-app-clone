import React from "react";
import Header from "../Header/Header";

const LayOut = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default LayOut;
