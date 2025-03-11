import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionToGetUserProfileData } from "../../actions/CommonAction";
import useAuth from "../../hooks/useAuth";
import {actionToLogin} from "../../actions/userAction";
import {Link} from "react-router-dom";

function LoginComponentSection() {
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

    const isFormValid = useCallback(() => {
        const errors = {};
        let valid = true;

        Object.entries(credentials).forEach(([key, value]) => {
            if (!value.trim()) {
                errors[key] = `Please Fill ${key === "email" ? "Email" : "Password"}`;
                valid = false;
            }
        });

        setFormErrors(errors);
        return valid;
    }, [credentials]);

    const handleLogin = useCallback(
        async (e) => {
            e.preventDefault();

            if (!isFormValid()) return;

            setLoading(true);
            setSignInError("");

            try {
                const response = await dispatch(actionToLogin(credentials));
                console.log(response,'response')
                if (isMounted.current) {
                    setAuth({ ...response });
                    dispatch(actionToGetUserProfileData());
                }
            } catch (err) {
                if (isMounted.current) {
                    setSignInError(err?.response?.data?.errors?.[0]?.msg || "Login Failed");
                }
            } finally {
                if (isMounted.current) {
                    setLoading(false);
                }
            }
        },
        [dispatch, credentials, isFormValid, setAuth]
    );

    useEffect(() => {
        if (error && isMounted.current) {
            setFormErrors((prev) => ({ ...prev, password: "Invalid Password!" }));
        }
    }, [error]);

    return (
        <div className="login_page_main_password_panel">
            <form onSubmit={handleLogin} className="login-form sign-in-form">
                <div className="login_page_main_password_inner_section_form">
                    {windowResizeCount >= 800 && <div className="login_page_heading_bar" />}

                    <div className="login_page_input_form_section">
                        {formErrors.password && (
                            <div className="login_page_input_form_section_heading_error">
                                {formErrors.password}
                            </div>
                        )}
                        <div className='form-box'>
                            <h1>Login</h1>
                        </div>
                        <div className="login_page_input_form_section_password_input">
                            <input
                                className="form-control"
                                type="text"
                                name="email"
                                placeholder="Email address or Mobile number"
                                value={credentials.email}
                                onChange={handleChange}
                            />
                            <input
                                className="form-control"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={credentials.password}
                                onChange={handleChange}
                            />
                            <br />
                            <div className='btn-field'>
                                <button type="submit" disabled={loading} >
                                    {loading ? "Wait" : "Login"}
                                </button>
                            </div>
                            <br />
                            <div className='forgot'>
                                Forgot Password?<Link className='forgot-password' to='/forgot-password'> Click Here to reset</Link>
                            </div>

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

export const LoginComponent = React.memo(LoginComponentSection);
