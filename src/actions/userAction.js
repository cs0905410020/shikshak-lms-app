import {api, generateDeviceFingerprint, setHeaderForAuthorization} from "../hooks/api/ApiConfig";
import {parseJwt} from "../hooks/jwtUtils";

export const actionToLogin =  (param) => async (dispatch,getState) =>{
    param['deviceFingerprint'] = await generateDeviceFingerprint();
    //param['source'] =  getState().users.userCompanyId;
    return api.post("/auth/login", param)
        .then(async (response) => {
            if (response.data.accessToken) {
                localStorage.setItem("accessToken", response.data.accessToken);
                setHeaderForAuthorization(response.data.accessToken);
                // Parse the JWT token
                const parsedData = parseJwt(response.data.accessToken);
                return parsedData;
            }
            return response.data;
        });
}