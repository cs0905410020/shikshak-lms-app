import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FacebookLoader} from "../Loader/FacebookLoader";
import {StudentDashMobileSubHeaderComponent} from "../StudentComponent/StudentDashMobileSubHeaderComponent";
import {StudentDashMobileSubSecondHeaderComponent} from "../StudentComponent/StudentDashMobileSubSecondHeaderComponent";
import {ChapterAllTopicsMobileDataBodyComponent} from "./ChapterAllTopicsMobileDataBodyComponent";
import {useParams} from "react-router";
import {
    actionToGetChapterAllTopicDataById,
    actionToGetChapterDataByChapterId,
    actionToGetChaptersAllTestDataById
} from "../../actions/CommonAction";

export const ChapterAllTopicsMobileComponent = ()=>{
    const {loading,selectedChapter} = useSelector((state) => state.selectedChapterData);
    const dispatch = useDispatch();
    const {id} = useParams();
    useEffect(() => {
        dispatch(actionToGetChapterDataByChapterId(id));
        dispatch(actionToGetChapterAllTopicDataById(id));
        dispatch(actionToGetChaptersAllTestDataById(id));
    }, [id]);
    return(
        <div className={"student_app_dashboard_app_view_container"}>
            {(loading) ?
                <div className={"loading_in_chapter_page_mobile"}>
                    <FacebookLoader type={"facebookStyleMobileLoader"} item={10}/>
                </div>
                :
                <>
                    <StudentDashMobileSubHeaderComponent subjectName={selectedChapter?.name}/>
                    <div className={"student_app_dashboard_app_view_container_scroll"}>
                        <StudentDashMobileSubSecondHeaderComponent pageName={'chapter-mobile-topics'}
                                                                   subjectName={selectedChapter?.name}/>
                        <ChapterAllTopicsMobileDataBodyComponent chapterId={selectedChapter?.id} subjectName={selectedChapter?.name}/>
                    </div>
                </>
            }
        </div>
    )
}