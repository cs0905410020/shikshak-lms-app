import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FacebookLoader} from "../Loader/FacebookLoader";
import {useParams} from "react-router";
import {
    actionToGetChapterDataByChapterId,
    actionToGetTestDataByTestId,
    actionToGetTestQuestionsAndOptionsDataById, actionToSubmitTestReport
} from "../../actions/CommonAction";
import {StudentDashMobileSubHeaderComponent} from "./StudentDashMobileSubHeaderComponent";
import {StudentDashMobileSubSecondHeaderComponent} from "./StudentDashMobileSubSecondHeaderComponent";
import {ChapterTestMobileDataBodyComponent} from "./ChapterTestMobileDataBodyComponent";
import {useHistory} from "react-router-dom";
import {_readableTimeFromSeconds} from "../../helpers/CommonHelper";
import {cloneDeep} from "lodash";
import {ChapterTestResultDataBodyComponent} from "../ChapterTopicComponents/ChapterTestResultDataBodyComponent";
let selectNewQuestionTimer = null;
export const ChapterTestDetailPageComponent = ()=>{
    const {loading,selectedChapter} = useSelector((state) => state.selectedChapterData);
    const {testData} = useSelector((state) => state.selectedTestDataByTestId);
    const testAllQuestionOptionsData = useSelector((state) => state.testAllQuestionOptionsData);
    const dispatch = useDispatch();
    const {chapter_id,test_id} = useParams();
    const [startStopTest,setStartStopTest] = useState(false);
    const [selectedQuestionKey,setSelectedQuestionKey] = useState(0);
    let [currentQuestionTime,setCurrentQuestionTime] = useState(0);
    let [currentTestTime,setCurrentTestTime] = useState(0);
    let [answerQuestionAnswerData,setAnswerQuestionAnswerData] = useState([]);
    let [answerResult,setAnswerResult] = useState(0);

    const [selectedOptionByKey,setSelectedOptionByKey] = useState({});
    const history = useHistory();

    useEffect(() => {
        dispatch(actionToGetTestDataByTestId(test_id));
        dispatch(actionToGetChapterDataByChapterId(chapter_id));
        dispatch(actionToGetTestQuestionsAndOptionsDataById(test_id));
    }, [chapter_id,test_id]);

    useEffect(() => {
        const unblock = history.block(() => {
            if (startStopTest) {
                if(window.confirm("Are you want to submit and exit this test?")){
                    setStartStopTest(false);
                    return true;
                }else{
                    return false;
                }
            }
            return true;
        });
        return () => {
            unblock();
        };
    }, [history,startStopTest]);

    const callFunctionToSetSelectedOptionByKey = (selInd,opt)=>{
        let selection = selectedOptionByKey;
        selection[selInd] = opt;
        setSelectedOptionByKey(cloneDeep(selection));
    }

    const callFunctionToSubmitTest = ()=>{
        let answerResult = 0;
        let answerQuestionAnswerData = [];
        testAllQuestionOptionsData?.testData?.map((testDataWithResult,key)=>{
            testDataWithResult.your_answer = selectedOptionByKey[key];
            if(selectedOptionByKey[key]){
                if(testDataWithResult[selectedOptionByKey[key]] == testDataWithResult?.answer){
                    answerResult++;
                }
            }
            answerQuestionAnswerData.push(testDataWithResult);
        })
        setAnswerResult(answerResult);
        setAnswerQuestionAnswerData(answerQuestionAnswerData);
        setStartStopTest(false);
        dispatch(actionToSubmitTestReport(testData?.id,answerResult))
    }

    useEffect(()=>{
        let questionTime = 0;
        setCurrentQuestionTime(questionTime);
        if(selectNewQuestionTimer)
            clearInterval(selectNewQuestionTimer);
        selectNewQuestionTimer = setInterval(function(){
            ++questionTime;
            setCurrentQuestionTime(questionTime);
        },1000)

    },[selectedQuestionKey])

    useEffect(()=>{
        if(testData?.id) {
            setCurrentTestTime(Number(testData?.time_in_seconds));
            setAnswerResult(0);
            setAnswerQuestionAnswerData([]);
        }
    },[testData])

    useEffect(()=>{
        if(startStopTest) {
            setInterval(function () {
                --currentTestTime;
                setCurrentTestTime(currentTestTime);
            }, 1000)
        }
    },[startStopTest])

    useEffect(()=>{
       console.log('answerQuestionAnswerData',answerQuestionAnswerData)
    },[answerQuestionAnswerData])


    return(
        <div className={"student_app_dashboard_app_view_container"}>
            {answerQuestionAnswerData?.length ?
                <div className={"student_test_start_new_test_main_container"}>
                    <>
                        <StudentDashMobileSubHeaderComponent subjectName={selectedChapter?.name}/>
                        <div className={"student_app_dashboard_app_view_container_scroll"}>
                            <StudentDashMobileSubSecondHeaderComponent pageName={'chapter-mobile-topics'}
                                                                       subjectName={selectedChapter?.name}/>
                            <ChapterTestResultDataBodyComponent answerResult={answerResult} answerQuestionAnswerData={answerQuestionAnswerData}/>
                        </div>
                    </>
                </div>
                :
                <>
                    {(!startStopTest) ?
                        <>
                            {(loading) ?
                                <div className={"loading_in_chapter_page_mobile"}>
                                    <FacebookLoader type={"facebookStyleMobileLoader"} item={9}/>
                                </div>
                                :
                                <>
                                    <StudentDashMobileSubHeaderComponent subjectName={selectedChapter?.name}/>
                                    <div className={"student_app_dashboard_app_view_container_scroll"}>
                                        <StudentDashMobileSubSecondHeaderComponent pageName={'chapter-mobile-topics'}
                                                                                   subjectName={selectedChapter?.name}/>
                                        <ChapterTestMobileDataBodyComponent setStartStopTest={setStartStopTest}
                                                                            chapterId={chapter_id} testId={test_id}/>
                                    </div>
                                </>
                            }
                        </>
                        : (testAllQuestionOptionsData?.testData?.length) ?
                          <div className={"student_test_start_new_test_main_container"}>
                            <div className={"test_series_header_section"}>
                               <div className={"test_header_main_header_top_section"}>
                                   <span className={"timer_section_header"}>
                                       <strong>Timer : </strong>
                                      {_readableTimeFromSeconds(currentTestTime)}
                                   </span>
                                   <span onClick={()=>callFunctionToSubmitTest()} className={"submit_button_section_header"}>
                                     Submit
                                   </span>
                               </div>
                                <div className={"test_header_main_header_bottom_section"}>
                                    <div className={"test_header_main_header_bottom_inner_section"}>
                                        <div className={"test_series_questions_count_number_loop_container"}>
                                            {(testAllQuestionOptionsData?.testData?.map((questions,key)=>(
                                                <div key={key}
                                                     onClick={()=>setSelectedQuestionKey(key)}
                                                     className={"test_series_questions_count_number_loop "+(selectedQuestionKey === key ? 'active' : '')}>
                                                    {key+1}
                                                </div>
                                            )))}
                                        </div>
                                    </div>
                                    <div className={"test_timer_for_current_question_container"}>
                                        <div className={"test_timer_for_current_question"}>
                                            {_readableTimeFromSeconds(currentQuestionTime)}
                                        </div>
                                        {(selectedQuestionKey > 0) ?
                                            <div onClick={() => setSelectedQuestionKey(selectedQuestionKey - 1)}
                                                 className={"test_next_question_for_current_question"}>
                                                Prev
                                            </div>
                                            : ''
                                        }{(selectedQuestionKey < testAllQuestionOptionsData?.testData?.length-1) ?
                                        <div onClick={() => setSelectedQuestionKey(selectedQuestionKey + 1)}
                                             className={"test_next_question_for_current_question"}>
                                            Next
                                        </div>
                                        : ''
                                    }
                                    </div>
                                </div>
                            </div>
                            <div className={"test_series_body_section_container"}>
                                    <div className={"test_series_body_section_question"}>
                                        {testAllQuestionOptionsData?.testData[selectedQuestionKey]?.question}
                                    </div>
                                    <div className={"test_series_body_section_option_main"}>
                                        <div onClick={() => callFunctionToSetSelectedOptionByKey(selectedQuestionKey, 'option_1')}
                                             className={"test_series_body_section_option " + (selectedOptionByKey[selectedQuestionKey] === 'option_1' ? 'selected' : '')}>
                                            <div className={"test_series_body_section_option_col col-2"}>a.</div>
                                            <div className={"test_series_body_section_option_col col-10"}>
                                                {testAllQuestionOptionsData?.testData[selectedQuestionKey]?.option_1}
                                            </div>
                                        </div>
                                        <div onClick={() => callFunctionToSetSelectedOptionByKey(selectedQuestionKey, 'option_2')}
                                             className={"test_series_body_section_option " + (selectedOptionByKey[selectedQuestionKey] === 'option_2' ? 'selected' : '')}>
                                            <div className={"test_series_body_section_option_col col-2"}>b.</div>
                                            <div className={"test_series_body_section_option_col col-10"}>
                                                {testAllQuestionOptionsData?.testData[selectedQuestionKey]?.option_2}
                                            </div>
                                        </div>
                                        <div onClick={() => callFunctionToSetSelectedOptionByKey(selectedQuestionKey, 'option_3')}
                                             className={"test_series_body_section_option " + (selectedOptionByKey[selectedQuestionKey] === 'option_3' ? 'selected' : '')}>
                                            <div className={"test_series_body_section_option_col col-2"}>c.</div>
                                            <div className={"test_series_body_section_option_col col-10"}>
                                                {testAllQuestionOptionsData?.testData[selectedQuestionKey]?.option_3}
                                            </div>
                                        </div>
                                        <div onClick={() => callFunctionToSetSelectedOptionByKey(selectedQuestionKey, 'option_4')}
                                             className={"test_series_body_section_option " + (selectedOptionByKey[selectedQuestionKey] === 'option_4' ? 'selected' : '')}>
                                            <div className={"test_series_body_section_option_col col-2"}>d.</div>
                                            <div className={"test_series_body_section_option_col col-10"}>
                                                {testAllQuestionOptionsData?.testData[selectedQuestionKey]?.option_4}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        :
                        ''
                    }
                </>
           }
        </div>
    )
}