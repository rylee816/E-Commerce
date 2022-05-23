const cartReducer = (state, action) => {
    switch(action.type){
        case 'CART_ADD_ITEM':
            return {...state, cart:{...state.cart, cartItems:[...state.cart.cartItems, action.payload]}}

    default: 
    return state;
    }
}

export default cartReducer;