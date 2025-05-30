import React, { useEffect, useState } from "react";

import classes from "./Result.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductCard from "../../Components/Product/ProductCard";
import { productUrl } from "../../Api/apiEndpoints";
import Loader from "../../Components/Loader/Loder";

function Results() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { catagoryName } = useParams();
  console.log(catagoryName);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/category/${catagoryName}`) //https://fakestoreapi.com/products/category/
      .then((res) => {
        console.log(res);
        setIsLoading(false);

        setResults(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [catagoryName]);
  console.log(results);
  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {catagoryName} </p>
        <hr />
      </section>

      {isLoading ? (
        <Loader />
      ) : (
        <div className={classes.products_container}>
          {results?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              renderDesc={false}
              renderAdd={true}
            />
          ))}
        </div>
      )}
    </LayOut>
  );
}

export default Results;
