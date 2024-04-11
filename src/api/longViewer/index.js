import axios from 'axios';
import { getDataError, getDataRequest, getDataSuccess } from '../../redux/longViewer/actions';

export const fetchLogs = () => {
  return async (dispatch) => {
    dispatch(getDataRequest()); // Dispatch the request action to indicate that data fetching is initiated

    try {
      // Make the HTTP request using Axios
      const response = await axios.get('http://0.0.0.0:4000/view-log');
      const data = response.data;

      dispatch(getDataSuccess(data)); // Dispatch the success action with the retrieved data
    } catch (error) {
      dispatch(getDataError(error.message)); // Dispatch the error action with the error message
    }
  };
};
