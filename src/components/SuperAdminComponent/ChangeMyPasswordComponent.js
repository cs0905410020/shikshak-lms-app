import React, {useState} from "react";
import siteLog from "../../theme/image/siteLog.png";
import {useDispatch, useSelector} from "react-redux";
import {
    actionToCallFunctionToValidatePassword,
    actionToUpdateUserPasswordInDb,
} from "../../actions/CommonAction";
import {IonAlert, IonContent} from "@ionic/react";
import {useHistory} from "react-router-dom";

export const ChangeMyPasswordComponent = ()=> {
    const {userInfo} = useSelector((state) => state.userSignin);
    const [password, setPassword] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [savingMode, setSavingMode] = useState(false);
    const [isPasswordAlreadyInUse, setIsPasswordAlreadyInUse] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }
    const validateForm = () => {
        if(isPasswordAlreadyInUse){
            return false;
        }else if (password?.trim()?.length < 6) {
            return false;
        } else if (password?.trim()?.length > 12) {
            return false;
        }
        return true;
    }
    const callFunctionToValidatePassword = async (value) =>{
        let {response} = await dispatch(actionToCallFunctionToValidatePassword(value));
        if(response?.count) {
            setIsPasswordAlreadyInUse(true);
        }else{
            setIsPasswordAlreadyInUse(false);
        }
    }
    const callFunctionToSubmit = async (e)=>{
        if(validateForm()){
            setSavingMode(true);
            let payload = {
                id:userInfo?.id,
                password:password
            }
            await dispatch(actionToUpdateUserPasswordInDb(payload));
            setTimeout(function(){
                resetForm();
            },1000)
        }
        e.preventDefault();
        return false;
    }
    const resetForm = ()=>{
        setSavingMode(false);
        setShowSuccessAlert(true);
        setPassword('');
    }
    return (
        <IonContent>
        <div className={"admin_dashboard_main_content_container"}>
            <IonAlert
                isOpen={showSuccessAlert}
                onDidDismiss={() => setShowSuccessAlert(false)}
                header={'Success'}
                message={'Password updated successfully.'}
                buttons={['Close']}></IonAlert>
            <div className={"admin_back_button_section"}>
                <svg onClick={goBack} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.97 384.97"><path d="M192.485 0C86.185 0 0 86.185 0 192.485 0 298.797 86.173 384.97 192.485 384.97S384.97 298.797 384.97 192.485C384.97 86.185 298.797 0 192.485 0zm0 361.282c-92.874 0-168.424-75.923-168.424-168.797S99.611 24.061 192.485 24.061s168.424 75.55 168.424 168.424-75.55 168.797-168.424 168.797zm43.393-261.406c-4.704-4.74-12.319-4.74-17.011 0l-83.009 84.2c-4.572 4.62-4.584 12.56 0 17.191l82.997 84.2c4.704 4.74 12.319 4.74 17.011 0 4.704-4.752 4.704-12.439 0-17.191l-74.528-75.61 74.54-75.61c4.692-4.741 4.692-12.428 0-17.18z"/></svg>
            </div>
            <div className={"admin_logo_section"}>
                <img alt={"siteLog"} src={siteLog}/>
            </div>
            <div className={"admin_hello_section"}>
                Update Password
            </div>
            <div className={"admin_dashboard_main_content_inner add_school_form_section_container"}>
                <form onSubmit={callFunctionToSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">New Password</label>
                        <input
                            onKeyUp={(e)=>callFunctionToValidatePassword(e.target.value)}
                            onChange={(e)=>setPassword(e.target.value)}
                            value={password}
                            type="name" className="form-control" aria-describedby="emailHelp" placeholder="Enter new password" required/>
                        <small className="form-text text-muted">
                            From here wou can directly change your password and this functionality is only for super admin.
                        </small>
                        <small className="form-text text-muted">
                            Password should be greater then 6 letters and less then 12 letters.
                        </small>
                        {(isPasswordAlreadyInUse) ?
                            <small className="form-text text-danger">
                                Password is already taken by other user!
                            </small>
                            : ''
                        }
                    </div>
                    <button type="submit" className="btn btn-primary"
                            disabled={!validateForm()}>
                        {savingMode ? 'Updating...' : 'Update'}
                    </button>
                </form>
            </div>
        </div>
        </IonContent>
    )
}