import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { ACTIONS } from "../context/reducer";

function CartItem({ cartItem }) {
  const [{ cartItems }, dispatch] = useStateValue();
  const [quantity, setQuantity] = useState();;

  useEffect(() => {
    setQuantity(cartItem?.quantity || 1);
  }, [cartItem]);

  const cartDispacth = (updatedCartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    dispatch({ type: ACTIONS.SET_CART_ITEMS, payload: updatedCartItems})
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
    const updatedCartItems = cartItems?.map((item) => item.id === cartItem.id ? {...item, quantity: quantity + 1} : item);
    cartDispacth(updatedCartItems);
  };

  const decreaseQuantity = () => {
    if(quantity > 1) {
      setQuantity((prev) => prev - 1);
      const updatedCartItems = cartItems?.map((item) => item.id === cartItem.id ? {...item, quantity: quantity - 1} : item);
      cartDispacth(updatedCartItems);
    };

    if(quantity === 1) {
      const updatedCartItems = cartItems?.filter((item) => item.id !== cartItem.id);
      cartDispacth(updatedCartItems);
    }
  };

  return (
    <div
      className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2"
    >
      <img
        src={cartItem?.imageURL}
        alt="cart-item"
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
      />

      {/* Name Section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{cartItem?.title}</p>
        <p className="text-sm block text-gray-300 font-semibold">
          ₹{parseFloat(cartItem?.price) * quantity}
        </p>
      </div>

      {/* Button Section */}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.7 }}
          className="w-5 h-5 flex items-center justify-center hover:bg-cartBg"
          onClick={decreaseQuantity}
        >
          <BiMinus className="text-gray-50" />
        </motion.div>
        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {quantity}
        </p>

        <motion.div
          whileTap={{ scale: 0.9 }}
          className="w-5 h-5 flex items-center justify-center hover:bg-cartBg"
          onClick={increaseQuantity}
        >
          <BiPlus className="text-gray-50" />
        </motion.div>
      </div>
    </div>
  );
}

export default CartItem;
