const cartReducer = (state, action) => {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const newItem = action.payload;
      const itemExists = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );

      const cartItems = itemExists
        ? state.cart.cartItems.map((item) =>
            item._id === itemExists._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };

    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'CART_CLEAR':
    return { ...state, cart: { ...state.cart, cartItems: [] } };

    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };

    case "USER_SIGNOUT":
    return { ...state, userInfo: null, cart: {cartItems: [], paymentMethod:'', shippingAddress: {},}};
    

    case "SAVE_SHIPPING_ADDRESS":
      return { ...state, cart: {...state.cart, shippingAddress: action.payload} };

    case "SAVE_PAYMENT_METHOD": 
    return {...state, cart: {...state.cart, paymentMethod: action.payload}}

    default:
      return state;
  }
};

export default cartReducer;
