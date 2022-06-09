const reducer = (state, action) => {
    switch(action.type){
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS': 
            return { ...state, products: action.payload, loading: false };
        case 'FETCH_FAIL': 
            return { ...state, loading: false, error: action.payload };
        case 'PAY_REQUEST': 
            return { ...state, loadingPay: true };
        case 'PAY_SUCCESS':
            return { ...state, loadingPay: false, successPay: true };
        case 'PAY_FAIL': 
            return { ...state, loadingPay: false, errorPay: action.payload };
        case 'PAY_RESET': {
            return { ...state, loadingPay: false, successPay: false };
        }
        default: 
        return state;
    }
}

export default reducer;