import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { useStateValue } from "../context/StateProvider";
import { ACTIONS } from "../context/reducer";
import EmptyCart from "../Images/emptyCart.svg";
import CartItem from "./CartItem";

function CartContainer() {
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const [totalCost, setTotalCost] = useState();
  const DELIVERYCHARGE = 60;

  useEffect(() => {
    const totalAmount = cartItems?.reduce((accumulator, currentValue) => {
      return accumulator + parseFloat(currentValue?.price) * parseFloat(currentValue?.quantity)
    }, 0)
    setTotalCost(totalAmount);
  }, [cartItems]);
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      end={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      <div className="w-full flex items-center justify-between p-4">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => {
            dispatch({ type: ACTIONS.SET_CART_SHOW, payload: !cartShow });
          }}
        >
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl cursor-pointer" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>
        <motion.p
          onClick={() => {
            dispatch({ type: ACTIONS.SET_CART_ITEMS, payload: [] });
            localStorage.removeItem("cartItems");
          }}
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-textColor text-base"
        >
          Clear
          <RiRefreshFill />
        </motion.p>
      </div>

      {/* Bottom */}
      {cartItems && cartItems?.length ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          {/* Cart-items */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* Cart Item */}
            {cartItems?.map((cartItem) => (
              <CartItem cartItem={cartItem} key={cartItem.id.seconds} />
            ))}
          </div>

          {/* Cart Total */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-{2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">SubTotal</p>
              <p className="text-gray-400 text-lg">₹ {totalCost}</p>
            </div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">₹ {DELIVERYCHARGE}</p>
            </div>

            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">₹ {totalCost + DELIVERYCHARGE}</p>
            </div>

            {user ? (
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                className="rounded-full w-full p-2 bg-gradient-to-tr from-orange-400 to to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Check out
              </motion.button>
            ) : (
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                className="rounded-full w-full p-2 bg-gradient-to-tr from-orange-400 to to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Login to check out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} alt="empty-cart" className="w-300" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default CartContainer;
