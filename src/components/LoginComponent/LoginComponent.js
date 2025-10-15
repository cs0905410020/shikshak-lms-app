import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionToGetUserProfileData } from "../../actions/CommonAction";
import { actionToLogin } from "../../actions/userAction";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useHistory } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./LoginComponent.css";

// Import 3 background images
import largeBg from "../../theme/image/new-stem-curriculum-login-bg-img.webp";
import mediumBg from "../../theme/image/stem-curriculum-login-bg-medium.webp";
import smallBg from "../../theme/image/stem-curriculum-login-bg-small.webp";

function LoginComponentSection() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [signInError, setSignInError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { error } = useSelector((state) => state.userSignin);
    const { setAuth } = useAuth();
    const dispatch = useDispatch();
    const isMounted = useRef(true);
    const history = useHistory();
    const location = useLocation();
    const expiredLinkMessage = location.state?.expiredLinkMessage || "";

    useEffect(() => {
        return () => (isMounted.current = false);
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

    const handleLogin = useCallback(
        async (e) => {
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
                    setSignInError(
                        err?.response?.data?.errors?.[0]?.msg ||
                        "Login failed. Please try again."
                    );
                }
            } finally {
                if (isMounted.current) setLoading(false);
            }
        },
        [dispatch, credentials, isFormValid, setAuth]
    );

    useEffect(() => {
        if (error && isMounted.current) {
            setFormErrors((prev) => ({
                ...prev,
                password: "Invalid credentials. Please try again.",
            }));
        }
    }, [error]);

    useEffect(() => {
        if (expiredLinkMessage) {
            setSignInError(expiredLinkMessage);
            history.replace({ ...location, state: {} });
        }
    }, [expiredLinkMessage, history, location]);

    return (
        <div className="login-wrapper">
            {/* Backgrounds for large, medium, and small screens */}
            <div className="bg-image-large" style={{ backgroundImage: `url(${largeBg})` }} />
            <div className="bg-image-medium" style={{ backgroundImage: `url(${mediumBg})` }} />
            <div className="bg-image-small" style={{ backgroundImage: `url(${smallBg})` }} />

            {/* Login Form */}
            <form onSubmit={handleLogin} className="login-card">
                <h1 className="login-title">Hi Young Innovator! 👋</h1>
                <p className="login-subtitle">Login to your account</p>

                <div className="form-group">
                    <label>Email or Mobile</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Enter your email or mobile"
                        value={credentials.email}
                        onChange={handleChange}
                        className={formErrors.email ? "error-input" : ""}
                    />
                    {formErrors.email && <p className="error-message">{formErrors.email}</p>}
                </div>

                <div className="form-group password-group">
                    <label>Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        value={credentials.password}
                        onChange={handleChange}
                        className={formErrors.password ? "error-input" : ""}
                    />
                    <span onClick={() => setShowPassword((prev) => !prev)} className="toggle-password">
                        <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </span>
                    {formErrors.password && <p className="error-message">{formErrors.password}</p>}
                </div>

                {signInError && <div className="error-message text-center">{signInError}</div>}

                <button type="submit" disabled={loading} className="login-btn">
                    {loading ? "Please wait..." : "Login"}
                </button>

                <div className="links">
                    <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
                </div>
            </form>
        </div>
    );
}

export const LoginComponent = React.memo(LoginComponentSection);
