
const reducer = (state, action) => {
    switch (action.type){
        case 'CREATE_REQUEST':
            return {...state, loading: true}
        
        case 'CREATE_SUCCESS': 
        return {...state, loading: false}

        case 'CREATE_FAIL':
            return {...state, loading: false, error: action.payload}

        default: 
        return state;
    }
}

export default reducer;