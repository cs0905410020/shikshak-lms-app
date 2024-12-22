import React, {useEffect, useState} from "react";
import {actionToSignInUserIntoApp} from "../../actions/CommonAction";
import {useDispatch,useSelector} from "react-redux";
import AuthService from "../services/auth.service";
import useAuth from "../../hooks/useAuth";
import {USER_SIGNIN_SUCCESS} from "../../constants/CommonConstants";

function LoginComponentSection(){
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [errorPassword,serErrorPassword] = useState(false);
    const [onLoadingMode,setLoadingMode] = useState(false);
    const [disableActionButton, setDisableActionButton] = useState(false);
    const [signInError, setSignInError] = useState("");
    const [formErrors,setFormErrors] = useState({
        email: "",
        password: ""
    });
    const {error} = useSelector((state) => state.userSignin);
    const windowResizeCount = useSelector((state) => state.windowResizeCount);
    const { setAuth } = useAuth();

    const dispatch = useDispatch();
    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formError = { ...formErrors };

        switch (name) {
            case "email":
                setEmail(value);
                formError.email = value.length <1 ? "Please Fill Email or mobile number": "";
                break;
            case "password":
                setPassword(value);
                formError.password = value.length <1 ? "Please Fill Password" :"";
                break;
            default:
                break;
        }
        setFormErrors(formError);
    };
    const formValid = () => {
        let valid = true;
        // validate form errors being empty
        Object.values(formErrors).forEach(val => {
            val.length > 0 && (valid = false);
        });
        let inputArray = {
            email: email,
            password: password
        }
        let errorArray = {
            email: "Please Fill Email",
            password: "Please Fill Password"
        }
        let formError ={...formErrors};
        // validate the form was filled out
        Object.keys(inputArray).map((key) => {
            let val = inputArray[key];
            if(val.trim().length === 0){
                formError[key] = errorArray[key];
            }
        });
        setFormErrors(formError);
        return valid;
    };

    const callToSignInUserIntoApp = ()=>{
        if(password?.trim()?.length && !onLoadingMode) {
            setLoadingMode(true);
            setTimeout(function () {
                dispatch(actionToSignInUserIntoApp(password))
            })
        }
    }

    const callFunctionToSubmitLogin = (e)=>{
        if(e.keyCode === 13 && password?.trim()?.length && !onLoadingMode) {
            setLoadingMode(true);
            setTimeout(function () {
                dispatch(actionToSignInUserIntoApp(password))
            })
        }
    }

    const handleLogin = async (e) => {
        console.log(87)
        e.preventDefault();
        if(formValid()){
            try {
                setDisableActionButton(true);
                await AuthService.login(email, password).then(
                    async (data) => {
                        if (data.accessToken) {
                            let user =  await AuthService.parseJwt(data.accessToken);
                            let value  = user.user
                            dispatch({ type: USER_SIGNIN_SUCCESS, payload: value});
                            localStorage.setItem('userInfo',JSON.stringify(value));
                            switch (Number(value?.role)){
                                case 5:
                                    localStorage.setItem('superAdminAuthentication',JSON.stringify(value));
                                    break;
                                case 2:
                                    localStorage.setItem('schoolMasterAuthentication',JSON.stringify(value));
                                    break;
                                case 3:
                                    localStorage.setItem('teacherMasterAuthentication',JSON.stringify(value));
                                    break;
                                case 4:
                                    localStorage.setItem('studentAuthentication',JSON.stringify(value));
                                    break;
                            }
                            setAuth({...value});
                            /*navigate(from, { replace: true });*/
                            setDisableActionButton(false);
                        }
                    },
                    (error) => {
                        console.log(error);
                        setSignInError(error?.response?.data?.errors[0]?.msg)
                        setDisableActionButton(false);
                    }
                );
            } catch (err) {
                console.log(err);
                setDisableActionButton(false);
            }
        }

    };
    useEffect(()=>{
        if(error){
            serErrorPassword(true);
        }else{
            serErrorPassword(false);
        }
        setLoadingMode(false);
    },[error])

    return (
        <div className={"login_page_main_password_panel"}>
            <form onSubmit={handleLogin} className="login-form sign-in-form">
            <div className={"login_page_main_password_inner_section_form"}>
            {(windowResizeCount >= 800) ?
                <div className={"login_page_heading_bar"}>
                    <div></div>
                </div>
                : ''
            }
            <div className={"login_page_input_form_section"}>
                {(errorPassword) ?
                    <div className={"login_page_input_form_section_heading_error"}>
                        Invalid Password!
                    </div>
                    : ''
                }
                <div className={"login_page_input_form_section_password_input"}>
                    <input className={"form-control"} type="text" name={"email"} placeholder="Email address or Mobile number"
                           value={email}
                           onChange={handleChange}/>
                    <input className={"form-control"} type={"password"} name={"password"} placeholder="Password"  value={password}
                           onChange={handleChange}/>
                    <br/>
                    {/*<div className="d-flex justify-content-start">
                        <button type="submit" disabled={disableActionButton} className="signin-btn m-0">Sign in</button>
                    </div>*/}
                    <button
                        type={"submit"}
                        disabled={disableActionButton}>
                        {onLoadingMode ? 'Wait' : 'Login'}
                    </button>
                </div>
            </div>
            </div>
            </form>
        </div>
    )
}
export const LoginComponent = React.memo(LoginComponentSection);
