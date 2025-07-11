import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionToGetUserProfileData } from "../../actions/CommonAction";
import { actionToLogin } from "../../actions/userAction";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useLocation,useHistory } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

function LoginComponentSection() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [signInError, setSignInError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { error } = useSelector((state) => state.userSignin);
    const windowResizeCount = useSelector((state) => state.windowResizeCount);
    const { setAuth } = useAuth();
    const dispatch = useDispatch();
    const isMounted = useRef(true);
    const history = useHistory();
    const location = useLocation();
    const expiredLinkMessage = location.state?.expiredLinkMessage || "";

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({
            ...prev,
            [name]: value.trim() ? "" : `Please enter your ${name}.`,
        }));
    }, []);

    const isFormValid = useCallback(() => {
        const errors = {};
        let valid = true;

        Object.entries(credentials).forEach(([key, value]) => {
            if (!value.trim()) {
                errors[key] = `Please enter your ${key}.`;
                valid = false;
            }
        });

        setFormErrors(errors);
        return valid;
    }, [credentials]);

    const handleLogin = useCallback(async (e) => {
        e.preventDefault();
        if (!isFormValid()) return;

        setLoading(true);
        setSignInError("");

        try {
            const response = await dispatch(actionToLogin(credentials));
            if (isMounted.current) {
                setAuth({ ...response });
                dispatch(actionToGetUserProfileData());
            }
        } catch (err) {
            if (isMounted.current) {
                setSignInError(err?.response?.data?.errors?.[0]?.msg || "Login failed. Please try again.");
            }
        } finally {
            if (isMounted.current) {
                setLoading(false);
            }
        }
    }, [dispatch, credentials, isFormValid, setAuth]);

    useEffect(() => {
        if (error && isMounted.current) {
            setFormErrors((prev) => ({ ...prev, password: "Invalid credentials. Please try again." }));
        }
    }, [error]);

    useEffect(() => {
        if (expiredLinkMessage) {
            setSignInError(expiredLinkMessage);
          // Remove state after displaying
          history.replace({ ...location, state: {} });
        }
      }, [expiredLinkMessage, history, location]);

    return (
        <div className="login_page_main_password_panel">
            <form onSubmit={handleLogin} className="login-form sign-in-form">
                <div className="login_page_main_password_inner_section_form">
                    {windowResizeCount >= 800 && <div className="login_page_heading_bar" />}

                    <div className="login_page_input_form_section">
                        <div className="form-box">
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
                            {formErrors.email && <div className="error-message">{formErrors.email}</div>}

                            <div className="password-wrapper" style={{ position: "relative" }}>
                                <input
                                    className="form-control"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                />
                                <span
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    style={{
                                        position: "absolute",
                                        right: "10px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer"
                                    }}
                                >
                                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                </span>
                            </div>
                            {formErrors.password && <div className="error-message">{formErrors.password}</div>}

                            {signInError && <div className="error-message">{signInError}</div>}


                            <br />
                            <div className="btn-field">
                                <button type="submit" disabled={loading}>
                                    {loading ? "Please wait..." : "Login"}
                                </button>
                            </div>

                            <br />
                            <div className="forgot">
                                Forgot Password?
                                <Link className="forgot-password" to="/forgot-password">
                                    {" "}
                                    Click here to reset
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export const LoginComponent = React.memo(LoginComponentSection);
