import React from "react";
import Delivery from "../Images/delivery.png";
import HeroBg from "../Images/heroBg.png";
import { heroData } from "../utils/data";

function HomeContainer() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="home">
      <div className="py-2 flex flex-1 flex-col items-start justify-center gap-6">
        {/* Bike Delivery Logo */}
        <div className="flex items-center justify-center gap-2 bg-orange-100 px-2 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-6 h-6 rounded-full overflow-hidden bg-white drop-shadow-xl">
            <img
              src={Delivery}
              alt="Delivery"
              className="w-full  h-full object-contain"
            />
          </div>
        </div>

        {/* Heading text */}
        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
          The Fastest Delivery in{" "}
          <span className="text-orange-600 text-[2.5rem] lg:text-[5rem]">
            Your City
          </span>
        </p>

        <p className="text-base text-textColor text-left md:w-[80%">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga aliquam
          porro quisquam libero dicta, laborum nesciunt repellat iusto
          reprehenderit accusantium. Perspiciatis fuga quod officiis. Ipsam
          repellat consectetur perspiciatis maiores vero!
        </p>

        <button
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full h-full md:w-auto md:h-auto rounded-lg px-4 py-2 hover:shadow-lg transition-all ease-in-out duration-100"
        >
          Order Now
        </button>
      </div>
      <div className="py-2 flex-1 relative">
        <img
          src={HeroBg}
          alt="hero=background"
          className="ml-0 md:ml-auto lg:h-650 h-420 w-full md:w-auto"
        />

        <div className="w-full h-full absolute top-0 left-0 grid grid-cols-2 items-center justify-center px-4 lg:px-16 py-4 flex-wrap gap-4 overflow-hidden ">
          {heroData?.map((data) => (
            <div
              className="max-w-[240px] min-w-[140px] p-2 lg:p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-md"
              key={data?.id}
            >
              <img
                src={data.imageSrc}
                alt="ice-cream"
                className="w-20 lg:w-40 -mt-10 lg:-mt-20"
              />
              <p className="text-base lg:text-xl mt-2 lg:mt-4 font-semibold text-textColor">
                {data?.name}
              </p>
              <p className="font-semibold text-[12px] text-sm text-lighttextGray my-1 md:my-3 truncate">
                {data?.description}
              </p>
              <p className="lg:text-sm text-headingColor font-semibold">
                <span className="text-xs text-red-600">₹ </span>
                {data?.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeContainer;
