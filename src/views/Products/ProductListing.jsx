import useMainState from "../../contexts/MainContextProvider";
import SingleProduct from "../../components/ProductCard";
// todo later : when importing directly, it's showing error 
import { useSearchParams } from "../../../node_modules/react-router-dom/index";
import React from "react";


const style = {
  display: "flex",
  flexWrap: "wrap",
  maxWidth: "900px",
  justifyContent: "center",
  marginLeft: "auto",
  marginRight: "auto",
};

const ProductListing = () => {
  const {
    state: { products },
  } = useMainState();
  console.log(products);

  let [searchParams] = useSearchParams(); 
  const searchTerm = searchParams.get('search')?.toLowerCase();
  
  const filteredProducts = searchTerm ? products.filter((product) => product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm)) : products;

  return (
    <div style={style}>
      {!!products &&
        filteredProducts.map((product) => (
          <SingleProduct key={product._id} product={product} />
        ))}
    </div>
  );
};

export default ProductListing;
