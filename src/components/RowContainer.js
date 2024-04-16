import React, { forwardRef } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../Images/NotFound.svg";
import Loader from "../components/Loader";
import { useStateValue } from "../context/StateProvider";
import { ACTIONS } from "../context/reducer";

const RowContainer = forwardRef(({ flag, menuItem }, ref) => {
  const [{ cartItems }, dispatch] = useStateValue();
  return (
    <div
      ref={ref}
      className={`w-full my-12 drop-shadow-2xl flex items-center  gap-2  ${
        flag
          ? "overflow-x-scroll scrollbar-none scroll-smooth"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {!menuItem ? (
        <div className="my-12 h-[212px] flex items-center justify-center w-full">
          <Loader />
        </div>
      ) : menuItem?.length ? (
        menuItem?.map((menu) => (
          <div
            className="w-300 min-w-[300px] md:w-340 md:min-w-[340px] h-auto bg-cardOverlay rounded-lg p-2 shadow-md backdrop-blur-lg my-12 hover:drop-shadow-lg"
            key={menu.id}
          >
            <div className=" w-full flex items-center justify-between">
              <motion.img
                whileHover={{ scale: 1.2 }}
                src={menu?.imageURL}
                alt={menu?.title}
                className="w-40 h-40 object-contain -mt-10"
              />

              <motion.div
                onClick={() => {
                  dispatch({type: ACTIONS.SET_CART_ITEMS, payload: [...cartItems, menu] });
                  localStorage.setItem("cartItems", JSON.stringify([...cartItems, menu]));
                }}
                whileTap={{ scale: 0.7 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md"
              >
                <MdShoppingBasket className=" text-white" />
              </motion.div>
            </div>

            <div className="w-full flex items-end justify-end flex-col">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {menu?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {menu?.calories} Calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">₹&nbsp;</span>
                  {menu?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} alt="No Result Found" className="h-300" />
          <p className="text-xl text-headingColor font-semibold my-4">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
});

export default RowContainer;
