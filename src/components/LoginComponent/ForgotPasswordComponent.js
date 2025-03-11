import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {actionToForgotPassword, actionToGetUserProfileData} from "../../actions/CommonAction";
import useAuth from "../../hooks/useAuth";
import {actionToLogin} from "../../actions/userAction";

function ForgotPasswordComponentSection() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [formErrors, setFormErrors] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [signInError, setSignInError] = useState("");
    const { error } = useSelector((state) => state.userSignin);
    const windowResizeCount = useSelector((state) => state.windowResizeCount);
    const { setAuth } = useAuth();
    const dispatch = useDispatch();
    const isMounted = React.useRef(true); // Track if the component is still mounted

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false; // Mark as unmounted
        };
    }, []);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({
            ...prev,
            [name]: value.trim() ? "" : `Please Fill ${name === "email" ? "Email" : "Password"}`,
        }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(actionToForgotPassword({email:email})).then(response => {
                setMessage(response.data.message);
            });
        } catch (error) {
            setMessage('Error: ' + error.response.data.message);
        }
    };

    return (
        <div className="login_page_main_password_panel">
            <form onSubmit={handleSubmit} className="login-form sign-in-form">
                <div className="login_page_main_password_inner_section_form">
                    {windowResizeCount >= 800 && <div className="login_page_heading_bar" />}
                    <div className="login_page_input_form_section">
                        <div className='form-box'>
                            <h1>Reset Your Password</h1>
                            <h2>Please Provide the Email address that you used when you signed up for your account.</h2>
                        </div>
                        <div className="login_page_input_form_section_password_input">
                            <input
                                className="form-control"
                                type="text"
                                name="email"
                                placeholder="Enter Email Address"
                                value={credentials.email}
                                onChange={handleChange}
                            />

                            <div className='form-box'>
                                {message ?<h2>{message}</h2>:<h2>We will Send you an Email that will Allow you to Reset your Password.</h2>}
                            </div>
                            <br />
                            <div className='btn-field'>
                                <button type="submit" disabled={loading} >
                                    {loading ? "Wait" : "Send Mail"}
                                </button>
                            </div>
                            <br />
                        </div>
                        {signInError && (
                            <div className="error-message">
                                {signInError}
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}

export const ForgotPasswordComponent = React.memo(ForgotPasswordComponentSection);
