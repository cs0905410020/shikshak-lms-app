import React,{useEffect} from 'react';
import {StudentDashMobileSubHeaderComponent} from "./StudentDashMobileSubHeaderComponent";
import {SubjectAllChapterMobileDataBodyComponent} from "./SubjectAllChapterMobileDataBodyComponent";
import {StudentDashMobileSubSecondHeaderComponent} from "./StudentDashMobileSubSecondHeaderComponent";
import {useDispatch, useSelector} from "react-redux";
import {FacebookLoader} from "../Loader/FacebookLoader";
import {useParams} from "react-router";
import {
    actionToGetGradeSubjectDataByTopicId,
    actionToGetSubjectAllChapterDataById,
    actionToGetSubjectDataBySubjectId
} from "../../actions/CommonAction";

export const SubjectAllChaptersMobileComponent = ()=>{
    const {loading,selectedGradeSubjectData} = useSelector((state) => state.selectedGradeSubjectData);
    const dispatch = useDispatch();
    const {id} = useParams();
    console.log(selectedGradeSubjectData,'selectedGradeSubjectData');
    useEffect(() => {
        dispatch(actionToGetGradeSubjectDataByTopicId(id));
        dispatch(actionToGetSubjectAllChapterDataById(id));
    }, [id]);
    return(
        <div className={"student_app_dashboard_app_view_container"}>
            {(loading) ?
                <div className={"loading_in_chapter_page_mobile"}>
                    <FacebookLoader type={"facebookStyleMobileLoader"} item={10}/>
                </div>
                :
                <>
                    <StudentDashMobileSubHeaderComponent subjectName={selectedGradeSubjectData?.subject_name}/>
                    <div className={"student_app_dashboard_app_view_container_scroll"}>
                        <StudentDashMobileSubSecondHeaderComponent pageName={'subject-chapters'}
                                                                   subjectName={selectedGradeSubjectData?.subject_name}/>
                        <SubjectAllChapterMobileDataBodyComponent subjectName={selectedGradeSubjectData?.subject_name}/>
                    </div>
                </>
            }
        </div>
    )
}