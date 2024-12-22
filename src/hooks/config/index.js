const API_URL =
    process.env.REACT_APP_DEVELOPMENT_MODE === 'development'
        ? "http://localhost:4021/api-call/"
        : "https://shikshaksolutions.com/api-call/";

const Apis = {
  //Authentication api
  GetUserLogin: `${API_URL}/api/customer/login`,
  GetUserRegister: `${API_URL}/api/customer/register`,
  GetCustomerDetails: `${API_URL}/api/customer/getUserByEmailId?email=`,
};
export { API_URL, Apis };
