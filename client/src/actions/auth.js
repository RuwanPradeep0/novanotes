import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    navigate('/');
  } catch (error) {
    // Handle the error based on its type
    if (error.response) {
      // The request was made, but the server responded with a status code outside of the 2xx range
      // You can access the response data and status code here
      console.error('Error response from server:', error.response.data);
      // Dispatch an error action or perform other actions as needed
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('No response received from the server');
      // Dispatch an error action or perform other actions as needed
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up the request:', error.message);
      // Dispatch an error action or perform other actions as needed
    }
  }
};

export const signup = (formData ,navigate) => async(dispatch) => {
    try {
      const { data } = await api.signUp(formData);
  
      dispatch({ type: AUTH,data });
      navigate('/')
  
      
    } catch (error) {
        // Handle the error based on its type
        if (error.response) {
          // The request was made, but the server responded with a status code outside of the 2xx range
          // You can access the response data and status code here
          console.error('Error response from server:', error.response.data);
          // Dispatch an error action or perform other actions as needed
        } else if (error.request) {
          // The request was made, but no response was received
          console.error('No response received from the server');
          // Dispatch an error action or perform other actions as needed
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up the request:', error.message);
          // Dispatch an error action or perform other actions as needed
        }
      }
  };