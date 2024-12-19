import React, {useState} from "react";
import siteLog from "../../theme/image/siteLog.png";
import {useDispatch, useSelector} from "react-redux";
import {IonAlert, IonContent} from "@ionic/react";
import {useHistory} from "react-router-dom";
import {actionToAddNewTestDataInDb, actionToAddNewTopicInDb} from "../../actions/CommonAction";

const questionOptionsArray = [];
export const AddNewChapterWiseTestComponentBody = ()=> {

    const [name, setName] = useState('');
    const [chapterId, setChapterId] = useState(0);
    const [description, setDescription] = useState('');
    const [totalTestTimeDuration, setTotalTestTimeDuration] = useState(0);

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [savingMode, setSavingMode] = useState(false);
    const [questionForTest, setQuestionForTest] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [answer, setAnswer] = useState('');
    const [answerExplanation, setAnswerExplanation] = useState('');
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
        }else if(!totalTestTimeDuration) {
            return false;
        }else if(!questionOptionsArray?.length) {
            return false;
        }
        return true;
    }
    const callFunctionToSubmit = async (e)=>{
        e.preventDefault();
        if(validateForm()){
            if(validateQuestionOptionForm()){
                addTestQuestionOptions();
            }
            setSavingMode(true);
            let payload = {
                name:name,
                description:description,
                time_in_seconds:totalTestTimeDuration,
                chapter_id:chapterId,
                questionOptionsArray:questionOptionsArray,
            }
            await dispatch(actionToAddNewTestDataInDb(payload));
            setTimeout(function(){
                resetForm();
                resetQuestionForm();
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
        setTotalTestTimeDuration(0);
    }
    const resetQuestionForm = ()=>{
        setQuestionForTest('');
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setAnswer('');
        setAnswerExplanation('');
    }

    const addTestQuestionOptions = ()=>{
        if(validateQuestionOptionForm()){
            const questionWithOption = {
                question:questionForTest,
                option1:option1,
                option2:option2,
                option3:option3,
                option4:option4,
                answer:answer,
                answerExplanation:answerExplanation,
            }
            questionOptionsArray.push(questionWithOption);
            resetQuestionForm();
        }
    }
    const validateQuestionOptionForm = ()=>{
        if(!questionForTest?.trim()?.length) {
            return false;
        }else if(!option1?.trim()?.length) {
            return false;
        }else if(!option2?.trim()?.length) {
            return false;
        }else if(!option3?.trim()?.length) {
            return false;
        }else if(!option4?.trim()?.length) {
            return false;
        }else if(!option4?.trim()?.length) {
            return false;
        }else if(!answer?.trim()?.length) {
            return false;
        }else if(!answerExplanation?.trim()?.length) {
            return false;
        }
        return true;
    }
    return (
        <IonContent>
            <div className={"admin_dashboard_main_content_container"}>
                <IonAlert
                    isOpen={showSuccessAlert}
                    onDidDismiss={() => setShowSuccessAlert(false)}
                    header={'Success'}
                    message={'Test Added successfully.'}
                    buttons={['Close']}></IonAlert>
                <div className={"admin_back_button_section"}>
                    <svg onClick={goBack} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.97 384.97"><path d="M192.485 0C86.185 0 0 86.185 0 192.485 0 298.797 86.173 384.97 192.485 384.97S384.97 298.797 384.97 192.485C384.97 86.185 298.797 0 192.485 0zm0 361.282c-92.874 0-168.424-75.923-168.424-168.797S99.611 24.061 192.485 24.061s168.424 75.55 168.424 168.424-75.55 168.797-168.424 168.797zm43.393-261.406c-4.704-4.74-12.319-4.74-17.011 0l-83.009 84.2c-4.572 4.62-4.584 12.56 0 17.191l82.997 84.2c4.704 4.74 12.319 4.74 17.011 0 4.704-4.752 4.704-12.439 0-17.191l-74.528-75.61 74.54-75.61c4.692-4.741 4.692-12.428 0-17.18z"/></svg>
                </div>
                <div className={"admin_logo_section"}>
                    <img alt={"siteLog"} src={siteLog}/>
                </div>
                <div className={"admin_hello_section"}>
                    Add New Chapter Test
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
                            <label htmlFor="exampleInputEmail1">Test name</label>
                            <input
                                onChange={(e)=>setName(e.target.value)}
                                value={name}
                                type="name" className="form-control" aria-describedby="emailHelp" placeholder="Enter topic name" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Test Description</label>
                            <textarea
                                onChange={(e)=>setDescription(e.target.value)}
                                value={description}
                                rows={4}
                                className="form-control" aria-describedby="emailHelp" placeholder="Enter topic description" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Test total time (in seconds)</label>
                            <input
                                onChange={(e)=>setTotalTestTimeDuration(Number(e.target.value))}
                                value={totalTestTimeDuration}
                                type="number" className="form-control" aria-describedby="emailHelp" placeholder="Enter test time duration" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Question {questionOptionsArray?.length + 1}</label>
                            <textarea
                                onChange={(e)=>setQuestionForTest(e.target.value)}
                                value={questionForTest}
                                rows={2}
                                className="form-control" aria-describedby="emailHelp" placeholder="Enter question"/>
                                <div className="form-group">
                                    <div className={"row"}>
                                        <div className={"col"}>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Option 1</label>
                                                <input
                                                    onChange={(e)=>setOption1(e.target.value)}
                                                    value={option1}
                                                    type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter option 1"/>
                                            </div>
                                        </div>
                                        <div className={"col"}>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Option 2</label>
                                                <input
                                                    onChange={(e)=>setOption2(e.target.value)}
                                                    value={option2}
                                                    type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter option 2"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"row"}>
                                        <div className={"col"}>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Option 3</label>
                                                <input
                                                    onChange={(e)=>setOption3(e.target.value)}
                                                    value={option3}
                                                    type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter option 3"/>
                                            </div>
                                        </div>
                                        <div className={"col"}>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Option 4</label>
                                                <input
                                                    onChange={(e)=>setOption4(e.target.value)}
                                                    value={option4}
                                                    type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter option 4"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"row"}>
                                        <div className={"col"}>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Answer</label>
                                                <input
                                                    onChange={(e)=>setAnswer(e.target.value)}
                                                    value={answer}
                                                    type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter answer"/>
                                            </div>
                                        </div>
                                        <div className={"col"}>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Answer explanation</label>
                                                <input
                                                    onChange={(e)=>setAnswerExplanation(e.target.value)}
                                                    value={answerExplanation}
                                                    type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter answer explanation"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"row"}>
                                        <div className={"col"}></div>
                                        <div className={"col"}>
                                            <button onClick={addTestQuestionOptions} type="button" className="btn btn-info" disabled={!validateQuestionOptionForm()}>
                                                   Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <button type="submit" className="btn btn-primary"
                                disabled={!validateForm()}>
                            {savingMode ? 'Saving...' : 'Add Test'}
                        </button>
                    </form>
                </div>
            </div>
        </IonContent>
    )
}