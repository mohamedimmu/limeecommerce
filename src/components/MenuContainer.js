import React, { useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../utils/data";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";

function MenuContainer() {
  const [filter, setFilter] = useState("rice");
  const [{ menuItems }] = useStateValue();

  useEffect(() => {}, [filter]);
  return (
    <section className="w-full my-6" id="menu">
      <div className="w-full flex flex-col justify-center">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-500 to-orange-600 transition-all ease-in-out duration-100">
          Our Hot Dishes
        </p>

        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 mt-6 overflow-x-scroll scrollbar-none">
          {categories?.map((category) => (
            <motion.div
              whileTap={{ scale: 0.75 }}
              className={`group ${
                filter === category.urlParamName ? "bg-cartNumBg" : "bg-card"
              } hover:bg-cartNumBg w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center`}
              key={category.id}
              onClick={() => setFilter(category.urlParamName)}
            >
              <div
                className={`w-10 h-10 rounded-full shadow-lg ${
                  filter === category.urlParamName ? "bg-white" : "bg-cartNumBg"
                } bg-cartNumBg group-hover:bg-white flex items-center justify-center`}
              >
                <IoFastFood className={`${filter === category.urlParamName ? 'text-textColor' : 'text-white'} group-hover:text-textColor text-lg`} />
              </div>
              <p
                className={`text-sm text-textColor group-hover:text-white ${
                  filter === category.urlParamName ? "text-white" : "text-textColor"
                }`}
              >
                {category.name}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="w-full h-auto">
          {/* if flag value is false then scrollbar is will not appear. */}
          <RowContainer flag={false} menuItem={menuItems?.filter((menuItem) => menuItem.category === filter)} /> 
        </div>
      </div>
    </section>
  );
}

export default MenuContainer;
