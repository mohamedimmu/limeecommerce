import { fetchCart, fetchUser } from "../utils/fetchLocalStorageData"

// If user is logged in then the details will fetch from the local storage, otherwise it will return null. 
const userInfo = fetchUser();
// If the user has added items to the cart then the cartinfo array will be fetched, otherwise empty array will be returned
const cartInfo = fetchCart();

export const initialState = {
  user: userInfo,
  menuItems: null,
  cartShow: false,
  cartItems: cartInfo 
}