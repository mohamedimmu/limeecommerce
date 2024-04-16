export const ACTIONS = {
  SET_USER: "SET_USER",
  SET_MENU_ITEMS: "SET_MENU_ITEMS",
  SET_CART_SHOW: "SET_CART_SHOW",
  SET_CART_ITEMS: "SET_CART_ITEMS"
};

const reducer = (state, action) => {
  switch (action.type) {
    
    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case ACTIONS.SET_MENU_ITEMS:
      return {
        ...state,
        menuItems: action.payload,
      };
    
    case ACTIONS.SET_CART_SHOW:
      return {
        ...state,
        cartShow: action.payload,
      }
     case ACTIONS.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload
      }

    default:
      return state;
  }
};

export default reducer;
