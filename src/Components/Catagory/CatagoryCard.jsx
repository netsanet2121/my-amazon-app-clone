import React from "react";
import classes from "./Catagory.module.css";
import { Link } from "react-router-dom";

function CatagoryCard({ data }) {
  return (
    <div className={classes.category}>
      <Link to={`/catagory/${data.name}`}>
        <span>
          <h2>{data?.title}</h2>
        </span>
        <img src={data?.imgLink} alt="" />
        <p className={classes.shopNow}>Shop now</p>
      </Link>
    </div>
  );
}

export default CatagoryCard;
