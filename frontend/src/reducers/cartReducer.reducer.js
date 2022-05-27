const cartReducer = (state, action) => {
    switch(action.type){
        case 'CART_ADD_ITEM':
            const newItem = action.payload;
            const itemExists = state.cart.cartItems.find(item => item._id === newItem._id);

            const cartItems = itemExists ? state.cart.cartItems.map(item => item._id === itemExists._id ? newItem : item)
            : [...state.cart.cartItems, newItem]

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return {...state, cart:{...state.cart, cartItems}}
        
        case 'CART_REMOVE_ITEM': {
            const cartItems = state.cart.cartItems.filter(item => item._id !== action.payload._id);

            localStorage.setItem('cartItems', JSON.stringify(cartItems))
            return { ...state, cart: {...state.cart, cartItems} }
        }

    default: 
    return state;
    }
}

export default cartReducer;