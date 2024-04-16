import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MdAttachMoney,
  MdCloudUpload,
  MdDelete,
  MdFastfood,
  MdFoodBank,
} from "react-icons/md";
import { categories } from "../utils/data";
import Loader from "./Loader";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";
import { serverTimestamp } from "firebase/firestore";
import { getAllMenuItems, saveMenuItem } from "../utils/firebaseFunctions";
import { useStateValue } from "../context/StateProvider";
import { ACTIONS } from "../context/reducer";

function CreateContainer() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [calories, setCalories] = useState("");
  const [category, setCategory] = useState("Select Category");
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploadedPercentage, setImageUploadPercentage] = useState(null);
  const [ , dispatch] = useStateValue();

  // Upload Image
  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, "Images/");
    const fileName = `${Date.now()} - ${imageFile.name}`;
    const imageRef = ref(storageRef, fileName);
    const uploadImage = uploadBytesResumable(imageRef, imageFile);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadPercentage(parseInt(uploadProgress));
      },
      (error) => {
        setFields(true);
        setMsg("Error while uploading : Try again");
        setAlertStatus("Danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downloadURL) => {
            setImageAsset(downloadURL);
            setIsLoading(false);
            setFields(true);
            setMsg("Image successfully uploaded");
            setAlertStatus("Success");
            setTimeout(() => {
              setFields(false);
              setIsLoading(false);
              setImageUploadPercentage(null);
            }, 4000);
          })
          .catch((err) => {
            setImageAsset(null); 
            setFields(true);
            setMsg("Image upload failed");
            setAlertStatus("danger");
            setTimeout(() => {
              setFields(false);
              setImageUploadPercentage(null);
            }, 4000);
          });
      }
    );
  };

  // Delete Image
  const deleteImage = () => {
    setIsLoading(true);
    const deleteImageRef = ref(storage, imageAsset);
    deleteObject(deleteImageRef)
      .then(() => {
        setImageAsset(null);
        setIsLoading(false);
        setFields(true);
        setMsg("Image deleted successfully");
        setAlertStatus("Success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      })
      .catch(() => {
        setFields(true);
        setMsg("Failed to delete : Try Again");
        setAlertStatus("Danger");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      });
  };

  // Save the menu item
  const saveTheDetails = () => {
    try {
      if (!title || !imageAsset || !calories || !price || !category) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("Danger");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      } else {
        const data = {
          id: serverTimestamp(),
          title: title,
          imageURL: imageAsset,
          category: category,
          quantity: 1,
          price: price,
          calories: calories,
        };
        saveMenuItem(data);
        setFields(true);
        setMsg("Data successfully uploaded");
        setAlertStatus("Success");
        clearData();
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
      fetchData();
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading : Try again");
      setAlertStatus("Danger");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    }
  };

  // Clear the data
  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCategory("Select Category");
  };

  const fetchData = async() => {
    try {
      const data = await getAllMenuItems();
      dispatch({ type: ACTIONS.SET_MENU_ITEMS, payload: data })
    }
    catch (error) {
      console.log(error);
    };
  };

  return (
    <div className="w-full min-h-screen h-auto flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-300 border-solid rounded-lg p-4 flex flex-col justify-center items-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "Danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className="w-full py-2 border-b border-gray-300 border-solid flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-7000" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the Menu Item"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor font-semibold"
          />
        </div>

        <div className="w-full">
          <select
            name="category"
            id="food-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="default" className="bg-white">
              Select Category
            </option>
            {categories?.map((category) => (
              <option
                key={category.id}
                value={category.urlParamName}
                className="text-base border-0 outline-none capitalize bg-white text-headingColor"
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
          {isLoading ? (
            <>
              <Loader />
              {imageUploadedPercentage !== null || imageUploadedPercentage !== undefined ?  (
                <p className="text-x-lg text-textColor">
                  Image uploaded {imageUploadedPercentage}%
                </p>
              ) : ""}
            </>
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploaded food"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-1.5 right-1.5 p-2 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-lg hover:bg-red-600 duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white text-lg" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-2xl text-gray-700" />
            <input
              type="text"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="bg-transparent outline-none w-ful h-full border-none text-lg placeholder:text-gray-400 text-textColor font-semibold"
              placeholder="Calories"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-2xl text-gray-700" />
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-transparent outline-none w-ful h-full border-none text-lg placeholder:text-gray-400 text-textColor font-semibold"
              placeholder="Price"
            />
          </div>
        </div>

        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveTheDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateContainer;
