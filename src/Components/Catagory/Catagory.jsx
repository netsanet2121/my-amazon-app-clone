import React from "react";
import { categoryInfos } from "./categoryInfos";
import CatagoryCard from "./CatagoryCard";
import classes from "./Catagory.module.css";

const Catagory = () => {
  return (
    <div className={classes.cont}>
      {categoryInfos.map((item, index) => (
        <CatagoryCard key={index} data={item} />
      ))}
    </div>
  );
};

export default Catagory;
