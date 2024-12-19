import React, {useState} from "react";
import siteLog from "../../theme/image/siteLog.png";
import {useDispatch, useSelector} from "react-redux";
import {IonAlert, IonContent} from "@ionic/react";
import {useHistory} from "react-router-dom";
import {actionToAddNewTopicInDb} from "../../actions/CommonAction";

export const AddNewTopicFormComponent = ()=> {

    const [name, setName] = useState('');
    const [chapterId, setChapterId] = useState(0);
    const [description, setDescription] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [videoPosterUrl, setVideoPosterUrl] = useState('');
    const [videoDuration, setVideoDuration] = useState(0);

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [savingMode, setSavingMode] = useState(false);
    const {chapterData} = useSelector((state) => state.allChapterDataList);
    const dispatch = useDispatch();
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }
    const validateForm = () => {
        if(!name?.trim()?.length) {
            return false;
        }else if(!chapterId) {
            return false;
        }else if(!description?.trim()?.length) {
            return false;
        }else if(!videoUrl?.trim()?.length) {
            return false;
        }else if(!videoPosterUrl?.trim()?.length) {
            return false;
        }else if(!videoDuration) {
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
                video_url:videoUrl,
                poster_url:videoPosterUrl,
                video_duration_in_seconds:videoDuration,
                chapter_id:chapterId,
            }
            await dispatch(actionToAddNewTopicInDb(payload));
            setTimeout(function(){
                resetForm();
            },1000)
        }
        return false;
    }
    const resetForm = ()=>{
        setSavingMode(false);
        setShowSuccessAlert(true);
        setShowSuccessAlert(true);
        setName('');
        setDescription('');
        setChapterId(0);
        setVideoUrl('');
        setVideoPosterUrl('');
        setVideoDuration(0);
    }
    return (
        <IonContent>
        <div className={"admin_dashboard_main_content_container"}>
            <IonAlert
                isOpen={showSuccessAlert}
                onDidDismiss={() => setShowSuccessAlert(false)}
                header={'Success'}
                message={'Topic Added successfully.'}
                buttons={['Close']}></IonAlert>
            <div className={"admin_back_button_section"}>
                <svg onClick={goBack} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.97 384.97"><path d="M192.485 0C86.185 0 0 86.185 0 192.485 0 298.797 86.173 384.97 192.485 384.97S384.97 298.797 384.97 192.485C384.97 86.185 298.797 0 192.485 0zm0 361.282c-92.874 0-168.424-75.923-168.424-168.797S99.611 24.061 192.485 24.061s168.424 75.55 168.424 168.424-75.55 168.797-168.424 168.797zm43.393-261.406c-4.704-4.74-12.319-4.74-17.011 0l-83.009 84.2c-4.572 4.62-4.584 12.56 0 17.191l82.997 84.2c4.704 4.74 12.319 4.74 17.011 0 4.704-4.752 4.704-12.439 0-17.191l-74.528-75.61 74.54-75.61c4.692-4.741 4.692-12.428 0-17.18z"/></svg>
            </div>
            <div className={"admin_logo_section"}>
                <img alt={"siteLog"} src={siteLog}/>
            </div>
            <div className={"admin_hello_section"}>
                Add New Chapter Topic
            </div>
            <div className={"admin_dashboard_main_content_inner add_school_form_section_container"}>
                <form onSubmit={callFunctionToSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Select Chapter</label>
                        <select value={chapterId} onChange={(e)=>setChapterId(Number(e.target.value))} className="form-control">
                            <option value={0}>Select chapter</option>
                            {chapterData?.map((chapter,key)=>(
                                <option key={key} value={chapter?.id}>{chapter?.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Topic name</label>
                        <input
                            onChange={(e)=>setName(e.target.value)}
                            value={name}
                            type="name" className="form-control" aria-describedby="emailHelp" placeholder="Enter topic name" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Topic Description</label>
                        <textarea
                            onChange={(e)=>setDescription(e.target.value)}
                            value={description}
                            rows={4}
                             className="form-control" aria-describedby="emailHelp" placeholder="Enter topic description" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Topic Video Url</label>
                        <input
                            onChange={(e)=>setVideoUrl(e.target.value)}
                            value={videoUrl}
                            type="name" className="form-control" aria-describedby="emailHelp" placeholder="Enter video url" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Topic Video Poster Url</label>
                        <input
                            onChange={(e)=>setVideoPosterUrl(e.target.value)}
                            value={videoPosterUrl}
                            type="name" className="form-control" aria-describedby="emailHelp" placeholder="Enter video poster url" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Topic Video Duration (in seconds)</label>
                        <input
                            onChange={(e)=>setVideoDuration(Number(e.target.value))}
                            value={videoDuration}
                            type="number" className="form-control" aria-describedby="emailHelp" placeholder="Enter video duration in seconds" required/>
                    </div>
                    <button type="submit" className="btn btn-primary"
                            disabled={!validateForm()}>
                        {savingMode ? 'Saving...' : 'Add Topic'}
                    </button>
                </form>
            </div>
        </div>
        </IonContent>
    )
}