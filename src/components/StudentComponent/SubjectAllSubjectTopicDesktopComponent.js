import React, {useEffect} from 'react';
import {StudentDashSubHeaderComponent} from "./StudentDashSubHeaderComponent";
import {useDispatch, useSelector} from "react-redux";
import {FacebookLoader} from "../Loader/FacebookLoader";
import {useParams} from "react-router";
import {
    actionToGetGradeSubjectChapterDataById,
    actionToGetSubjectDataBySubjectId
} from "../../actions/CommonAction";
import {SubjectAllSubjectTopicDataBodyComponent} from "./SubjectAllSubjectTopicDataBodyComponent";

export const SubjectAllSubjectTopicDesktopComponent = ()=>{
    const {loading,selectedSubject} = useSelector((state) => state.selectedSubjectData);
    const dispatch = useDispatch();
    const {id,grade} = useParams();

    useEffect(() => {
        dispatch(actionToGetSubjectDataBySubjectId(id));
        dispatch(actionToGetGradeSubjectChapterDataById(id,grade));
    }, [id,grade]);
    return(
        <div className={"main_body_content_section"}>
            {(loading) ?
                <div className={"loading_in_chapter_page_desktop"}>
                    <FacebookLoader type={"facebookStyle"} item={10}/>
                </div>
                :
                <>
                    <StudentDashSubHeaderComponent pageName={'subject-chapters'} subjectName={selectedSubject?.name}/>
                    <SubjectAllSubjectTopicDataBodyComponent subjectName={selectedSubject?.name}/>
                </>
            }
        </div>
    )
}