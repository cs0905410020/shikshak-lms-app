import axios from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs'; // Optional library for advanced fingerprinting

axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

const API_URL =
    process.env.REACT_APP_DEVELOPMENT_MODE === 'developmenta'
        ? "https://shikshaksolutions.com/api-call/": process.env.REACT_APP_DEVELOPMENT_MODE === 'development' ?"http://localhost:4024/api/"
        : "https://stemcity.in/api/";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Function to generate a device fingerprint
const generateDeviceFingerprint = async () => {
    const fpPromise = await FingerprintJS.load();
    const fingerprint = await fpPromise.get();
    return fingerprint.visitorId; // Combine user agent, IP, and visitor ID
};

// Interceptor to automatically set Authorization and Device headers
api.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        // Attach device fingerprint to every request
        const deviceFingerprint = await generateDeviceFingerprint();
        config.headers["X-Device-Fingerprint"] = deviceFingerprint;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const setHeaderForAuthorization = async (accessToken) => {
    // Attach device fingerprint to every request
    const deviceFingerprint = await generateDeviceFingerprint();
    // Use the access token for authorized requests
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    api.defaults.headers.common["X-Device-Fingerprint"] = deviceFingerprint;
};

// Add a response interceptor to handle access token expiration
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Check if the access token has expired (403) and the request has not been retried yet
        if (error?.response?.status === 403 && !originalRequest?._retry) {
            originalRequest._retry = true;
            if(error?.response?.data?.message==='Invalid device fingerprint'){
                localStorage.removeItem("accessToken");
                window.location.href = "/login"; // Redirect to login page
                return Promise.reject(error);
            }

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

export { api, setHeaderForAuthorization,generateDeviceFingerprint };