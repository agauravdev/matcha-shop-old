import useMainState from "../contexts/MainContextProvider";
import SingleProductWishlist from "../components/WishlistCard";

const style = {
  display: "flex",
  flexWrap: "wrap",
  maxWidth: "900px",
  justifyContent: "center",
  marginLeft: "auto",
  marginRight: "auto",
};

const Wishlist = () => {
  const {
    state: { wishlist },
  } = useMainState();
  
  console.log({wishlist});
  return (
    <div style={style}>
      {!!wishlist &&
        wishlist.map((product) => (
          <SingleProductWishlist key={product._id} product={product} />
        ))}
    </div>
  );
};

export default Wishlist;
