import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionToGetUserDataByForgotPasswordToken,
  actionUpdateNewPassword,
} from "../../actions/CommonAction";
import { useParams, useHistory } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Eye, EyeOff } from "lucide-react"; // using lucide icons, you can change as needed

function ResetPasswordComponentSection() {
  const [credentials, setCredentials] = useState({ new_password: "", confirm_password: "" });
  const [formErrors, setFormErrors] = useState({ new_password: "", confirm_password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [signInError, setSignInError] = useState("");
  const [userData, setUserData] = useState(null);
  const [showPassword, setShowPassword] = useState({ new: false, confirm: false });

  const dispatch = useDispatch();
  const { token } = useParams();
  const history = useHistory();
  const { setAuth } = useAuth();

  const windowResizeCount = useSelector((state) => state.windowResizeCount);

  useEffect(() => {
    let isMounted = true;
    const fetchUserData = async () => {
      try {
        const res = await dispatch(actionToGetUserDataByForgotPasswordToken({ token }));
        if (!res.data?.id) {
            history.push("/login", { expiredLinkMessage: "Your password reset link has expired or is invalid. Please request a new one." });
        } else if (isMounted) {
          setUserData(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };

    if (token) {
      fetchUserData();
    }

    return () => {
      isMounted = false;
    };
  }, [token, dispatch, history]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({
      ...prev,
      [name]: value.trim() ? "" : `Please fill out ${name.replace("_", " ")}`,
    }));
  }, []);

  const handleToggleVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { new_password, confirm_password } = credentials;

    if(new_password===''|| confirm_password==''){
        setMessage("Error: Please enter password and confirm password.");
        return;
    }
    if (new_password !== confirm_password) {
      setFormErrors({
        ...formErrors,
        confirm_password: "Passwords do not match",
      });
      setMessage("Error: Passwords must match.");
      return;
    }

    try {
      setLoading(true);
      const response = await dispatch(
        actionUpdateNewPassword({ newPassword: new_password, token })
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error: " + (error?.response?.data?.message || "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login_page_main_password_panel">
      {userData && (
        <form onSubmit={handleSubmit} className="login-form sign-in-form">
          <div className="login_page_main_password_inner_section_form">
            {windowResizeCount >= 800 && <div className="login_page_heading_bar" />}
            <div className="login_page_input_form_section">
              <div className="form-box">
                <h1>Change Your Password</h1>
                <h2>{userData?.email}</h2>
              </div>

              <div className="login_page_input_form_section_password_input">

                {/* New Password Field */}
                <div className="password-input-wrapper">
                  <input
                    className="form-control"
                    type={showPassword.new ? "text" : "password"}
                    name="new_password"
                    placeholder="Enter New Password"
                    value={credentials.new_password}
                    onChange={handleChange}
                  />
                  <span onClick={() => handleToggleVisibility("new")} className="eye-icon">
                    {showPassword.new ? <EyeOff /> : <Eye />}
                  </span>
                </div>
                {formErrors.new_password && (
                  <div className="login_page_input_form_section_heading_error">
                    {formErrors.new_password}
                  </div>
                )}

                {/* Confirm Password Field */}
                <div className="password-input-wrapper">
                  <input
                    className="form-control"
                    type={showPassword.confirm ? "text" : "password"}
                    name="confirm_password"
                    placeholder="Confirm New Password"
                    value={credentials.confirm_password}
                    onChange={handleChange}
                  />
                  <span onClick={() => handleToggleVisibility("confirm")} className="eye-icon">
                    {showPassword.confirm ? <EyeOff /> : <Eye />}
                  </span>
                </div>
                {formErrors.confirm_password && (
                  <div className="login_page_input_form_section_heading_error">
                    {formErrors.confirm_password}
                  </div>
                )}

                <div className="form-box">
                  <h2>{message || ""}</h2>
                </div>

                <div className="btn-field">
                  <button type="submit" disabled={loading}>
                    {loading ? "Please wait..." : "Change Password"}
                  </button>
                </div>

                {signInError && (
                  <div className="error-message">{signInError}</div>
                )}
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export const ResetPasswordComponent = React.memo(ResetPasswordComponentSection);
