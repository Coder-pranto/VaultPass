import axios from 'axios';

const BASE_URL ='/'

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});


//* Auth API
export const fetchMe = () => API.get('api/auth/me');
export const registerAPI = ({ email, password }) =>API.post('api/auth/register', { email, password });
export const loginAPI = ({ email, password }) =>API.post('api/auth/login', { email, password });
export const logoutAPI = () => API.post('api/auth/logout');
export const forgotPasswordAPI = ({email}) => API.post('api/auth/forgot-password', { email });
export const resetPasswordAPI = ({token, password}) => API.post(`api/auth/reset-password/${token}`, { password });
export const verifyOtpAPI = ({ email, otp }) => API.post('api/auth/verify-otp', { email, otp });
 

