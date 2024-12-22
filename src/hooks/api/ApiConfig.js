import axios from 'axios';

axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

const API_URL = "https://shikshaksolutions.com/api-call/";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor to automatically set Authorization header with access token
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${JSON.parse(accessToken)}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const setHeaderForAuthorization = (accessToken) => {
    // Use the access token for authorized requests
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

// Add a response interceptor to handle access token expiration
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Check if the access token has expired (403) and the request has not been retried yet
        if (error?.response?.status === 403 && !originalRequest?._retry) {
            originalRequest._retry = true;

            try {
                const refreshResponse = await axios.post(API_URL + "auth/token"); // Attempt to refresh the token

                // Get the new access token and retry the original request
                const newAccessToken = refreshResponse.data.accessToken;
                localStorage.setItem("accessToken", newAccessToken); // Store the new access token
                api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

                // Retry the original request with the new access token
                return api(originalRequest);
            } catch (refreshError) {
                // If refresh token has expired or is invalid, force the user to log in
                if (refreshError.response && refreshError.response.status === 403) {
                    console.error("Refresh token expired. Redirecting to login.");
                    localStorage.removeItem("accessToken");
                    window.location.href = "/login"; // Redirect to login page
                }
            }
        }

        // If it's not a token error, just reject the promise
        return Promise.reject(error);
    }
);

export { api, setHeaderForAuthorization };