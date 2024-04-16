import React, { useState } from "react";
import Logo from "../Images/logo.png";
import Avatar from "../Images/avatar.png";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { MdShoppingBasket, MdLogout, MdAdd } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { auth } from "../firebase.config";
import { ACTIONS } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

function Header() {
  const provider = new GoogleAuthProvider();
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  function login() {
    if (!user) {
      signInWithPopup(auth, provider)
        .then((response) => {
          const {
            user: { providerData },
          } = response;
          dispatch({ type: ACTIONS.SET_USER, payload: providerData[0] });
          localStorage.setItem("user", JSON.stringify(providerData[0]));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setIsMenu((prevValue) => !prevValue);
    }
  }

  function logout() {
    setIsMenu(false);
    localStorage.clear();
    dispatch({ type: ACTIONS.SET_USER, payload: null });
    signOut(auth);
  }

  return (
    <header className="fixed z-50 w-full p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/* Desktop and Tablet */}
      <div className="hidden md:flex w-full h-full justify-between items-center">
        {/* Logo */}
        <Link to="/g" className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-8  object-cover" />
          <p className="text-xl font-bold text-headingColor">Lime</p>
        </Link>

        {/* menu */}
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              About
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Service
            </li>
          </motion.ul>

          {/* cart */}
          <div
            className="relative flex items-center cursor-pointer"
            onClick={() =>
              dispatch({
                type: ACTIONS.SET_CART_SHOW,
                payload: !cartShow,
              })
            }
          >
            <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
            {cartItems && cartItems.length ? (
              <div className="w-5 h-5 rounded-full bg-cartNumBg absolute flex items-center justify-center -top-2 -right-2">
                <p className="text-xs font-semibold text-white">
                  {cartItems.length}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* user profile picture */}
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user?.photoURL : Avatar}
              alt="user-profile"
              className="w-10 h-10 min-w-[40px] min-h-[40px] drop-shadow-2xl cursor-pointer rounded-full"
              onClick={login}
            />

            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 1, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg absolute top-12 right-0 flex flex-col"
              >
                {user && user?.email === "developercode011@gmail.com" && (
                  <Link to="create-item">
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setIsMenu(false)}
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}

                <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        {/* Cart */}
        <div
          className="relative flex items-center cursor-pointer"
          onClick={() => {
            dispatch({ type: ACTIONS.SET_CART_SHOW, payload: !cartShow });
          }}
        >
          <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
          {cartItems && cartItems.length ? (
            <div className="w-5 h-5 rounded-full bg-cartNumBg absolute flex items-center justify-center -top-2 -right-2">
              <p className="text-xs font-semibold text-white">{cartItems.length}</p>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* Logo Image */}
        <Link to="/g" className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-8  object-cover" />
          <p className="text-xl font-bold text-headingColor">Lime</p>
        </Link>

        {/* Menu */}
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user?.photoURL : Avatar}
            alt="user-profile"
            className="w-10 h-10 min-w-[40px] min-h-[40px] drop-shadow-2xl cursor-pointer rounded-full"
            onClick={login}
          />

          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 1, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg absolute top-12 right-0 flex flex-col"
            >
              {user && user?.email === "developercode011@gmail.com" && (
                <Link to="create-item">
                  <p
                    className=" px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={() => setIsMenu(false)}
                  >
                    New Item <MdAdd />
                  </p>
                </Link>
              )}
              <ul className="flex flex-col">
                <li
                  className="text-base text-textColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  Home
                </li>
                <li
                  className="text-base text-textColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  Menu
                </li>
                <li
                  className="text-base text-textColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  About
                </li>
                <li
                  className="text-base text-textColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  Service
                </li>
              </ul>

              <p
                onClick={logout}
                className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base"
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
