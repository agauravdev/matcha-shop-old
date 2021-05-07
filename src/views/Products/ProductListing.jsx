import useMainState from "../../contexts/MainContextProvider";
import SingleProduct from "../../components/SingleProductInProductsList";

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
  
  return (
    <div style={style}>
      {!!products &&
        products.map((product) => (
          <SingleProduct key={product._id} product={product} />
        ))}
    </div>
  );
};

export default ProductListing;
