import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FacebookLoader} from "../Loader/FacebookLoader";
import {useParams} from "react-router";
import {
    actionToGetChapterDataByChapterId,
    actionToGetTestQuestionsAndOptionsDataById
} from "../../actions/CommonAction";
import {StudentDashMobileSubHeaderComponent} from "./StudentDashMobileSubHeaderComponent";
import {StudentDashMobileSubSecondHeaderComponent} from "./StudentDashMobileSubSecondHeaderComponent";
import {ChapterTestMobileDataBodyComponent} from "./ChapterTestMobileDataBodyComponent";

export const ChapterTestMainPageComponent = ()=>{
    const {loading,selectedChapter} = useSelector((state) => state.testAllQuestionOptionsData);
    const dispatch = useDispatch();
    const {chapter_id,test_id} = useParams();

    useEffect(() => {
        dispatch(actionToGetChapterDataByChapterId(chapter_id));
        dispatch(actionToGetTestQuestionsAndOptionsDataById(test_id));
    }, [chapter_id,test_id]);
    return(
        <div className={"student_app_dashboard_app_view_container"}>
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
                        <ChapterTestMobileDataBodyComponent chapterId={chapter_id} testId={test_id}/>
                    </div>
                </>
            }
        </div>
    )
}