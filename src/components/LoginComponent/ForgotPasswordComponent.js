import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {actionToForgotPassword} from "../../actions/CommonAction";

function ForgotPasswordComponentSection() {
    const [message, setMessage] = useState('');
    const [credentials, setCredentials] = useState({ email: ""});
    const [formErrors, setFormErrors] = useState({ email: ""});
    const [loading, setLoading] = useState(false);
    const [signInError, setSignInError] = useState("");
    const windowResizeCount = useSelector((state) => state.windowResizeCount);
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
    
        // Validate email
        if (!credentials.email.trim()) {
            setFormErrors({ email: "Please enter your email address." });
            setMessage('');
            return;
        }
    
        try {
            setLoading(true);
            setFormErrors({}); // Clear any previous errors
            const response = await dispatch(actionToForgotPassword({ email: credentials.email }));
            setMessage(response.data.message || "Check your email for further instructions.");
            setCredentials({ email: ""})
        } catch (error) {
            const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
            setMessage(`Error: ${errorMsg}`);
        } finally {
            setLoading(false);
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
                            <h2>Please enter the email address you used to sign up for your account.</h2>
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
                         {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                            <div className='form-box'>
                                {message ?<h2>{message}</h2>:<h2>We'll send you an email with a link to reset your password.</h2>}
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
