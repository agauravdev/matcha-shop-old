import useMainState from "../contexts/MainContextProvider";
import SingleProductCart from "../components/CartCard";

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
  
  console.log({cart});
  return (
    <div style={style}>
      {!!cart &&
        cart.map((cartItem) => (
          <SingleProductCart key={cartItem._id} product={cartItem.product} quantity={cartItem.quantity} />
        ))}
    </div>
  );
};

export default Cart;
