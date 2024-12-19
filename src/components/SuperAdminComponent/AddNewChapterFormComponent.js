import React, {useState,useEffect} from "react";
import siteLog from "../../theme/image/siteLog.png";
import {useDispatch, useSelector} from "react-redux";
import {
    actionToAddNewChapterInDb
} from "../../actions/CommonAction";
import {IonAlert, IonContent} from "@ionic/react";
import {useHistory} from "react-router-dom";
import $ from 'jquery';

export const AddNewChapterFormComponent = ()=> {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [iconSvg, setIconSvg] = useState('');
    const [subjectId, setSubjectId] = useState(0);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [savingMode, setSavingMode] = useState(false);
    const {subjectData} = useSelector((state) => state.allSubjectDataList);
    const dispatch = useDispatch();
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }
    const validateForm = () => {
        if(!name?.trim()?.length) {
            return false;
        }else if(!subjectId) {
            return false;
        }else if(!description?.trim()?.length) {
            return false;
        }else if(!iconSvg?.trim()?.length) {
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
                description:description,
                icon:iconSvg,
                subjectId:subjectId
            }
            await dispatch(actionToAddNewChapterInDb(payload));
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
        setIconSvg('');
        setDescription('');
        setSubjectId(0);
    }
    return (
        <IonContent>
        <div className={"admin_dashboard_main_content_container"}>
            <IonAlert
                isOpen={showSuccessAlert}
                onDidDismiss={() => setShowSuccessAlert(false)}
                header={'Success'}
                message={'Chapter Added successfully.'}
                buttons={['Close']}></IonAlert>
            <div className={"admin_back_button_section"}>
                <svg onClick={goBack} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.97 384.97"><path d="M192.485 0C86.185 0 0 86.185 0 192.485 0 298.797 86.173 384.97 192.485 384.97S384.97 298.797 384.97 192.485C384.97 86.185 298.797 0 192.485 0zm0 361.282c-92.874 0-168.424-75.923-168.424-168.797S99.611 24.061 192.485 24.061s168.424 75.55 168.424 168.424-75.55 168.797-168.424 168.797zm43.393-261.406c-4.704-4.74-12.319-4.74-17.011 0l-83.009 84.2c-4.572 4.62-4.584 12.56 0 17.191l82.997 84.2c4.704 4.74 12.319 4.74 17.011 0 4.704-4.752 4.704-12.439 0-17.191l-74.528-75.61 74.54-75.61c4.692-4.741 4.692-12.428 0-17.18z"/></svg>
            </div>
            <div className={"admin_logo_section"}>
                <img alt={"siteLog"} src={siteLog}/>
            </div>
            <div className={"admin_hello_section"}>
                Add New Chapter
            </div>
            <div className={"admin_dashboard_main_content_inner add_school_form_section_container"}>
                <form onSubmit={callFunctionToSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Select Subject</label>
                        <select value={subjectId} onChange={(e)=>setSubjectId(Number(e.target.value))}
                                className="selectpicker form-control"
                                data-live-search="true">
                            <option value={0}>Select subject</option>
                            {subjectData?.map((subject,key)=>(
                                <option key={key} value={subject?.id}>{subject?.name} class {subject?.standard}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Chapter name</label>
                        <input
                            onChange={(e)=>setName(e.target.value)}
                            value={name}
                            type="name" className="form-control" aria-describedby="emailHelp" placeholder="Enter chapter name" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Chapter Description</label>
                        <textarea
                            onChange={(e)=>setDescription(e.target.value)}
                            value={description}
                            rows={4}
                            className="form-control" aria-describedby="emailHelp" placeholder="Enter chapter description" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Chapter Svg Icon</label>
                        <textarea
                            onChange={(e)=>setIconSvg(e.target.value)}
                            value={iconSvg}
                            rows={4}
                            className="form-control" aria-describedby="emailHelp" placeholder="Paste chapter icon svg" required/>
                            <small className="form-text text-muted">
                                Please paste svg raw text here.
                            </small>
                    </div>
                    <button type="submit" className="btn btn-primary"
                            disabled={!validateForm()}>
                        {savingMode ? 'Saving...' : 'Add Chapter'}
                    </button>
                </form>
            </div>
        </div>
        </IonContent>
    )
}