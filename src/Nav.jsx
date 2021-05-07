import {useCart} from "./hooks/useCart";
import {useRouter} from "./hooks/useRoute";
import {ROUTES} from "./enums";

export const Nav = () => {
    const {state} = useCart();
    const {setRoute} = useRouter();
    return (
        <nav className="navigation">
            <ul className="nav--primary">
                <li><button onClick={() => setRoute(ROUTES.homepage)} className="button">Home</button></li>
                <li><button onClick={() => setRoute(ROUTES.productListing)} className="button">Products</button></li>
                {/*add these buttons on the right when you figure out the navigation*/}
                <li>
                    <button onClick={() => setRoute(ROUTES.cart)} className="button">
                        <div className="badge--container">
                            <i className="fas fa-shopping-cart" style={{fontSize : "2rem"}}/>
                            <span className="badge badge--icon" >{state.cart.length}</span>
                        </div>

                    </button>
                </li>
                <li>
                    <button onClick={() => setRoute(ROUTES.wishlist)} className="button">
                        <div className="badge--container">
                            <i className="far fa-heart" style={{fontSize : "2rem"}}/>
                            <span className="badge badge--icon" >{state.wishlist.length}</span>
                        </div>
                    </button>
                </li>
            </ul>
        </nav>
    )
}