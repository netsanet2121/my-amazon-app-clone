import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/apiEndpoints";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loder";
function ProductDetail() {
  const { productId } = useParams();

  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [productId]);
  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard
          key={product.id}
          product={product}
          flex={true}
          add_description={true}
          add_button={true}
          renderDesc={true}
          renderAdd={true}
          // showFullDescription={true} // Show full description
        />
      )}
    </LayOut>
  );
}

export default ProductDetail;
