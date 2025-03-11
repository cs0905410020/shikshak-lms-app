import React,{useEffect} from 'react';
import {StudentDashMobileSubHeaderComponent} from "./StudentDashMobileSubHeaderComponent";
import {SubjectAllChapterMobileDataBodyComponent} from "./SubjectAllChapterMobileDataBodyComponent";
import {StudentDashMobileSubSecondHeaderComponent} from "./StudentDashMobileSubSecondHeaderComponent";
import {useDispatch, useSelector} from "react-redux";
import {FacebookLoader} from "../Loader/FacebookLoader";
import {useParams} from "react-router";
import {
    actionToGetGradeSubjectChapterDataById,
    actionToGetSubjectAllChapterDataById,
    actionToGetSubjectDataBySubjectId
} from "../../actions/CommonAction";
import {SubjectAllSubjectTopicMobileDataBodyComponent} from "./SubjectAllSubjectTopicMobileDataBodyComponent";

export const SubjectAllSubjectTopicMobileComponent = ()=>{
    const {loading,selectedSubject} = useSelector((state) => state.selectedSubjectData);
    const dispatch = useDispatch();
    const {id,grade} = useParams();
    useEffect(() => {
        dispatch(actionToGetSubjectDataBySubjectId(id));
        dispatch(actionToGetGradeSubjectChapterDataById(id,grade));
    }, [id,grade]);
    return(
        <div className={"student_app_dashboard_app_view_container"}>
            {(loading) ?
                <div className={"loading_in_chapter_page_mobile"}>
                    <FacebookLoader type={"facebookStyleMobileLoader"} item={10}/>
                </div>
                :
                <>
                    <StudentDashMobileSubHeaderComponent subjectName={selectedSubject?.name}/>
                    <div className={"student_app_dashboard_app_view_container_scroll"}>
                        <StudentDashMobileSubSecondHeaderComponent pageName={'subject-chapters'}
                                                                   subjectName={selectedSubject?.name}/>
                        <SubjectAllSubjectTopicMobileDataBodyComponent subjectName={selectedSubject?.name}/>
                    </div>
                </>
            }
        </div>
    )
}