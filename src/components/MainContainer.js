import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import HomeContainer from "./HomeContainer";
import RowContainer from "./RowContainer";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";

function MainContainer() {
  const [{ menuItems, cartShow }] = useStateValue();
  const rowContainerRef = useRef();

  const scroll = (scrollOffset) => {
    rowContainerRef.current.scrollLeft += scrollOffset
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-auto">
      <HomeContainer />

      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-500 to-orange-600 transition-all ease-in-out duration-100">
            Our Fresh & Healthy Fruits
          </p>

          <div className="hidden md:flex items-center gap-3">
            <motion.div
              whileTap={{ scale: 0.7 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer shadow-lg flex items-center justify-center"
              onClick={() => scroll(-200)}
            >
              <MdChevronLeft className="text-lg text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.7 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out shadow-lg flex items-center justify-center"
              onClick={() => scroll(200)}
            >
              <MdChevronRight className="text-lg text-white" />
            </motion.div>
          </div>
        </div>

        <RowContainer
          ref={rowContainerRef}
          flag={true}
          menuItem={menuItems?.filter((menu) => menu.category === "fruits")}
        />
      </section>

      <MenuContainer />

      {
        cartShow ? <CartContainer /> : ""
      }
    </div>
  );
}

export default MainContainer;
