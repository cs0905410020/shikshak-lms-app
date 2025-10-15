import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { actionToForgotPassword } from "../../actions/CommonAction";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./LoginComponent.css";
import largeBg from "../../theme/image/new-stem-curriculum-login-bg-img.webp";
import mediumBg from "../../theme/image/stem-curriculum-login-bg-medium.webp";
import smallBg from "../../theme/image/stem-curriculum-login-bg-small.webp";

function ForgotPasswordComponentSection() {
    const [credentials, setCredentials] = useState({ email: "" });
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const isMounted = useRef(true);

    useEffect(() => {
        return () => (isMounted.current = false);
    }, []);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({
            ...prev,
            [name]: value.trim() ? "" : "Please enter your email.",
        }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!credentials.email.trim()) {
            setFormErrors({ email: "Please enter your email." });
            setMessage("");
            return;
        }

        try {
            setLoading(true);
            const response = await dispatch(actionToForgotPassword({ email: credentials.email }));
            if (isMounted.current) {
                setMessage(response?.data?.message || "Check your email for further instructions.");
                setCredentials({ email: "" });
            }
        } catch (error) {
            if (isMounted.current) {
                const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
                setMessage(`Error: ${errorMsg}`);
            }
        } finally {
            if (isMounted.current) setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            {/* Responsive background layers */}
            <div className="bg-image-large" style={{ backgroundImage: `url(${largeBg})` }} />
            <div className="bg-image-medium" style={{ backgroundImage: `url(${mediumBg})` }} />
            <div className="bg-image-small" style={{ backgroundImage: `url(${smallBg})` }} />

            {/* Forgot Password Form */}
            <form onSubmit={handleSubmit} className="login-card">
                <h1 className="login-title">Forgot Password?</h1>
                <p className="login-subtitle">
                    Enter the email you used to sign up and we’ll send you a reset link.
                </p>

                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={credentials.email}
                        onChange={handleChange}
                        className={formErrors.email ? "error-input" : ""}
                    />
                    {formErrors.email && <p className="error-message">{formErrors.email}</p>}
                </div>

                {message && <div className="success-message text-center">{message}</div>}

                <button type="submit" disabled={loading} className="login-btn">
                    {loading ? "Please wait..." : "Send Reset Link"}
                </button>

                <div className="links">
                    <Link to="/login" className="forgot-link">
                        <i className="fas fa-arrow-left"></i> Back to Login
                    </Link>
                </div>
            </form>
        </div>
    );
}

export const ForgotPasswordComponent = React.memo(ForgotPasswordComponentSection);
