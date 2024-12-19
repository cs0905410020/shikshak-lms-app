import React, {useState} from "react";
import siteLog from "../../theme/image/siteLog.png";
import {useDispatch, useSelector} from "react-redux";
import {
    actionToAddNewSubjectInDb,
} from "../../actions/CommonAction";
import {IonAlert} from "@ionic/react";
import {useHistory} from "react-router-dom";
import {IonContent} from "@ionic/react";

export const AddNewSubjectFormComponent = ()=> {

    const [name, setName] = useState('');
    const allClassStandardData = useSelector((state) => state.allClassStandardData);
    const allSyllabusData = useSelector((state) => state.allSyllabusData);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [savingMode, setSavingMode] = useState(false);
    const [classStandardId, setClassStandardId] = useState('');
    const [syllabusType, setSyllabusType] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }
    const validateForm = () => {
        if(!name?.trim()?.length) {
            return false;
        } else if(!classStandardId?.trim()?.length) {
            return false;
        } else if(!syllabusType?.trim()?.length) {
            return false;
        }
        return true;
    }
    const callFunctionToSubmit = async (e)=>{
        e.preventDefault();
        if(validateForm()){
            setSavingMode(true);
            let payload = {
                name:name,
                class_standard_id:classStandardId,
                syllabus_type_id:syllabusType,
            }
            await dispatch(actionToAddNewSubjectInDb(payload));
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
    }
    return (
        <IonContent>
        <div className={"admin_dashboard_main_content_container"}>
            <IonAlert
                isOpen={showSuccessAlert}
                onDidDismiss={() => setShowSuccessAlert(false)}
                header={'Success'}
                message={'Subject Added successfully.'}
                buttons={['Close']}></IonAlert>
            <div className={"admin_back_button_section"}>
                <svg onClick={goBack} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.97 384.97"><path d="M192.485 0C86.185 0 0 86.185 0 192.485 0 298.797 86.173 384.97 192.485 384.97S384.97 298.797 384.97 192.485C384.97 86.185 298.797 0 192.485 0zm0 361.282c-92.874 0-168.424-75.923-168.424-168.797S99.611 24.061 192.485 24.061s168.424 75.55 168.424 168.424-75.55 168.797-168.424 168.797zm43.393-261.406c-4.704-4.74-12.319-4.74-17.011 0l-83.009 84.2c-4.572 4.62-4.584 12.56 0 17.191l82.997 84.2c4.704 4.74 12.319 4.74 17.011 0 4.704-4.752 4.704-12.439 0-17.191l-74.528-75.61 74.54-75.61c4.692-4.741 4.692-12.428 0-17.18z"/></svg>
            </div>
            <div className={"admin_logo_section"}>
                <img alt={"siteLog"} src={siteLog}/>
            </div>
            <div className={"admin_hello_section"}>
                Add Subject
            </div>
            <div className={"admin_dashboard_main_content_inner add_school_form_section_container"}>
                <form onSubmit={callFunctionToSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Syllabus type</label>
                        <select value={syllabusType} onChange={(e)=>setSyllabusType(e.target.value)} className="form-control">
                            <option value={''}>Select Syllabus type</option>
                            {allSyllabusData?.map((syllabusData,key)=>(
                                <option key={key} value={syllabusData?.id}>Class {syllabusData?.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Class Standard</label>
                        <select value={classStandardId} onChange={(e)=>setClassStandardId(e.target.value)} className="form-control">
                            <option value={''}>Select class standard</option>
                            {allClassStandardData?.map((classData,key)=>(
                                <option key={key} value={classData?.id}>Class {classData?.standard}th</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Subject name</label>
                        <input
                            onChange={(e)=>setName(e.target.value)}
                            value={name}
                            type="name" className="form-control" aria-describedby="emailHelp" placeholder="Enter subject name" required/>
                        <small className="form-text text-muted">
                            Icon and avatar will auto picked up according to subject name.
                        </small>
                    </div>
                    <button type="submit" className="btn btn-primary"
                            disabled={!validateForm()}>
                        {savingMode ? 'Saving...' : 'Add Subject'}
                    </button>
                </form>
            </div>
        </div>
        </IonContent>
    )
}