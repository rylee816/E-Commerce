export const getError = error => {
    return  error.response?.data.message 
    ? error.response.data.message 
    : error.message
}

export const baseUrl = process.env.REACT_APP_BASE_URL || '';