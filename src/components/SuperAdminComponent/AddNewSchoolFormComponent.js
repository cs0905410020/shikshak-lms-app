import React, {useState} from "react";
import siteLog from "../../theme/image/siteLog.png";
import {useDispatch, useSelector} from "react-redux";
import {actionToAddNewUserInDb, actionToCallFunctionToValidatePassword} from "../../actions/CommonAction";
import {_generateUniqueIdForBlock, _schoolAvatarObject} from "../../helpers/CommonHelper";
import {IonAlert, IonContent} from "@ionic/react";
import {useHistory} from "react-router-dom";

export const AddNewSchoolFormComponent = ()=> {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [avatar, setAvatar] = useState('school-avatar-default');
    const [syllabusType, setSyllabusType] = useState(0);
    const [isPasswordAlreadyInUse, setIsPasswordAlreadyInUse] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [savingMode, setSavingMode] = useState(false);
    const dispatch = useDispatch();
    const allSyllabusData = useSelector((state) => state.allSyllabusData);
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }
    const validateForm = () => {
        if(isPasswordAlreadyInUse){
            return false;
        }else if (!name?.trim()?.length) {
            return false;
        } else if (!email?.trim()?.length) {
            return false;
        }else if (!mobile?.trim()?.length) {
            return false;
        }else if (!syllabusType) {
            return false;
        }else if (!avatar) {
            return false;
        } else if (password?.trim()?.length < 6) {
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
        e.preventDefault();
        if(validateForm()){
            setSavingMode(true);
            let payload = {
                id:_generateUniqueIdForBlock()+'-'+_generateUniqueIdForBlock()+'-'+_generateUniqueIdForBlock(),
                name:name,
                email:email,
                password:password,
                mobile:mobile,
                syllabus_type:syllabusType,
                avatar:avatar,
                school_id:'',
                school_class_with_section_id:0,
                role:2,
            }
            await dispatch(actionToAddNewUserInDb(payload));
            setTimeout(function(){
                resetForm();
            },1000)
        }
        return false;
    }
    const resetForm = ()=>{
        setSavingMode(false);
        setShowSuccessAlert(true);
        setName('');
        setName('');
        setEmail('');
        setPassword('');
        setMobile('');
        setAvatar('school-avatar-default');
        setSyllabusType(0);
    }
    return (
        <IonContent>
         <div className={"admin_dashboard_main_content_container"}>
            <IonAlert
                isOpen={showSuccessAlert}
                onDidDismiss={() => setShowSuccessAlert(false)}
                header={'Success'}
                message={'School Added successfully.'}
                buttons={['Close']}></IonAlert>
            <div className={"admin_back_button_section"}>
                <svg onClick={goBack} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.97 384.97"><path d="M192.485 0C86.185 0 0 86.185 0 192.485 0 298.797 86.173 384.97 192.485 384.97S384.97 298.797 384.97 192.485C384.97 86.185 298.797 0 192.485 0zm0 361.282c-92.874 0-168.424-75.923-168.424-168.797S99.611 24.061 192.485 24.061s168.424 75.55 168.424 168.424-75.55 168.797-168.424 168.797zm43.393-261.406c-4.704-4.74-12.319-4.74-17.011 0l-83.009 84.2c-4.572 4.62-4.584 12.56 0 17.191l82.997 84.2c4.704 4.74 12.319 4.74 17.011 0 4.704-4.752 4.704-12.439 0-17.191l-74.528-75.61 74.54-75.61c4.692-4.741 4.692-12.428 0-17.18z"/></svg>
            </div>
            <div className={"admin_logo_section"}>
                <img src={siteLog}/>
            </div>
            <div className={"admin_hello_section"}>
                Add School
            </div>
            <div className={"admin_dashboard_main_content_inner add_school_form_section_container"}>
                <form onSubmit={callFunctionToSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input
                            onChange={(e)=>setName(e.target.value)}
                            value={name}
                            type="name" className="form-control" aria-describedby="emailHelp" placeholder="School name" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input
                            onChange={(e)=>setEmail(e.target.value)}
                            value={email}
                            type="email" className="form-control" aria-describedby="emailHelp" placeholder="School email" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Mobile Number</label>
                        <input
                            onChange={(e)=>setMobile(e.target.value)}
                            value={mobile}
                            type="number" className="form-control" aria-describedby="emailHelp" placeholder="School mobile number" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Syllabus Type</label>
                        <select value={syllabusType} onChange={(e)=>setSyllabusType(Number(e.target.value))} className="form-control">
                            <option value={0}>Select syllabus type</option>
                            {allSyllabusData?.map((syllabus,key)=>(
                                <option key={key} value={syllabus?.id}>{syllabus?.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Avatar</label>
                        <div className={"avatar_select_section_container"}>
                            {Object.keys(_schoolAvatarObject)?.map((key,index)=>(
                                 <div key={index} onClick={()=>setAvatar(key)} className={"avatar_select_section_loop "+(key === avatar ? 'active' : '')}>
                                     <img src={_schoolAvatarObject[key]} alt={"avatar"}/>
                                 </div>
                            ))}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            value={password}
                            onKeyUp={(e)=>callFunctionToValidatePassword(e.target.value)}
                            onChange={(e)=>setPassword(e.target.value)}
                            type="text" className="form-control"
                            min={6}
                            max={12}
                            placeholder="Password" required/>
                            <small className="form-text text-muted">
                                Password should be greater then 6 letters and less then 12 letters.
                            </small>
                            {(isPasswordAlreadyInUse) ?
                                <small className="form-text text-danger">
                                   Password is already taken by other user!
                                </small>
                                :''
                            }
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={!validateForm()}>
                        {savingMode ? 'Saving...' : 'Add School'}
                    </button>
                </form>
            </div>
        </div>
        </IonContent>
    )
}