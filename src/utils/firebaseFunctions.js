import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";

// Uploading the menu-items
export const saveMenuItem = async (data) => {
  const documentID = String(Date.now());
  const menuCollectionRef = collection(db, "menu-items");
  const menuRef = doc(menuCollectionRef, documentID);
  // It will merge the field any other field is added. - { merge: true }
  const menuItemUploadResponse = await setDoc(menuRef, data, { merge: true });
  return menuItemUploadResponse;
};

// Fetching the menu items
export const getAllMenuItems = async () => {
  const collectionRef = collection(db, "menu-items");
  const queries = query(collectionRef, orderBy("id", "desc"));
  const menuItems = await getDocs(queries);

  return menuItems.docs.map((doc) => doc.data());
};
