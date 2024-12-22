import {api, setHeaderForAuthorization} from '../../hooks/api/ApiConfig';
import {USER_SIGNIN_SUCCESS} from "../../constants/CommonConstants";

const signup = (body) => {
    return api
        .post("/auth/signup", body)
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const googleSignup = (body) => {
    return api
        .post("/auth/googleSignup", body)
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const login = (email, password) => {
    return api
        .post("/auth/login", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                setHeaderForAuthorization(response.data.accessToken);
                localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
                // Parse the JWT token
                const parsedData = parseJwt(response.data.accessToken);
                localStorage.setItem("user", JSON.stringify(parsedData));

                return parsedData;
            }
        });
};

const googleLogin = (email, password) => {
    return api
        .post("/auth/googleLogin", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const forgotPassword = (email) => {
    return api
        .post("/auth/forgot-password", {
            email
        })
        .then((response) => {

            return response.data;
        });
};
const getUserDetailsByForgotPasswordToken = (token) => {
    return api
        .post("/auth/user-details-by-forgot-password-token", {
            token
        })
        .then((response) => {

            return response.data;
        });
};
const changePassword = (token,password) => {
    return api
        .post("/auth/change-password", {
            token,password
        })
        .then((response) => {

            return response.data;
        });
};
const logout = () => {
    localStorage.removeItem("user");
    window.location.href='/login';
    return true;
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};
const parseJwt = (token) => {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};
const updateUserPersonalInfo = (body) => {
    return api
        .post("/auth/update-user-personal-info", body)
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};
const updateUserPassword = (id,currentPassword,newPassword,callFunctionToFinishChangePasswordProcess) => {
     api.post("/auth/get-password-by-id", {
           id,currentPassword,newPassword
        }).then((response) => {
                if(response?.data?.status===1){
                    api.post("/auth/update-password", {
                        id,newPassword
                    }).then((response) => {
                      callFunctionToFinishChangePasswordProcess(response?.data?.status,response?.data?.message);
                    });
                }else{
                    callFunctionToFinishChangePasswordProcess(response?.data?.status,response?.data?.message);
                }
        });
};
const loginWithOtp = (otp,emailOrMobile) => {
    return api.post("/auth/get-otp-details-by-otp-email", {
        otp,emailOrMobile
    }).then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
       return response?.data;

    });
};
const sendOtpForLogin = (emailMobileNo) => {
   return  api.post("/auth/send-otp-for-login", {
        emailMobileNo
    }).then((response) => {
        return response;
    });
};
const authService = {
    signup,
    login,
    googleLogin,
    googleSignup,
    forgotPassword,
    getUserDetailsByForgotPasswordToken,
    changePassword,
    logout,
    getCurrentUser,
    parseJwt,
    updateUserPersonalInfo,
    updateUserPassword,
    sendOtpForLogin,
    loginWithOtp,
};

export default authService;
