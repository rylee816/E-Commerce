const searchReducer = (state, action) => {
    switch (action.type){
        case 'SEARCH_FETCH':
            return {...state, loading: true}
        
        case 'SEARCH_SUCCESS':
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages,
                countProducts: action.payload.countProducts,
                };
            
        case 'SEARCH_FAIL':
            return {...state, loading: false, error: action.payload}
    
    default: 
    return state;
    }
}

export default searchReducer