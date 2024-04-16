import { AnimatePresence } from "framer-motion";
import React, { useCallback, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { CreateContainer, Header, MainCointainer } from "./components";
import { useStateValue } from "./context/StateProvider";
import { getAllMenuItems } from "./utils/firebaseFunctions";
import { ACTIONS } from "./context/reducer";

const App = () => {
  const [, dispatch] = useStateValue();

  const fetchData = useCallback(async() => {
    try {
      const data = await getAllMenuItems();
      dispatch({ type: ACTIONS.SET_MENU_ITEMS, payload: data })
    }
    catch (error) {
      console.log(error);
    };
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <AnimatePresence mode="wait">
      <div className="w-full h-auto flex flex-col bg-primary">
        <Header />

        <main className="w-full h-auto px-4 md:px-16 py-4 mt-14 md:mt-20">
          <Routes>
            <Route path="/*" element={<MainCointainer />} />
            <Route path="/create-item" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
