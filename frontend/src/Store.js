import React from 'react'
import { createContext, useReducer } from "react";
import cartReducer from './reducers/cartReducer.reducer';

export const Store = createContext();

const initialState = {
    cart: {
        cartItems: []
    }
};



function StoreProvider(props) {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const value = {state, dispatch}
    console.log(state)
  return (
    <Store.Provider value = {value}>{props.children}</Store.Provider>
  )
}

export default StoreProvider