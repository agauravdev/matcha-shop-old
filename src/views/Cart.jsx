import useMainState from "../contexts/MainContextProvider";
import SingleProduct from "../components/SingleProductInProductsList";

const style = {
  display: "flex",
  flexWrap: "wrap",
  maxWidth: "900px",
  justifyContent: "center",
  marginLeft: "auto",
  marginRight: "auto",
};

const Cart = () => {
  const {
    state: { cart },
  } = useMainState();
  
  return (
    <div style={style}>
      {!!cart &&
        cart.map((product) => (
          <SingleProduct key={product._id} product={product} />
        ))}
    </div>
  );
};

export default Cart;
