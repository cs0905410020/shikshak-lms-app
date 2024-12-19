import React, {useEffect} from 'react';
import {StudentDashSubHeaderComponent} from "./StudentDashSubHeaderComponent";
import {SubjectAllChapterDataBodyComponent} from "./SubjectAllChapterDataBodyComponent";
import {useDispatch, useSelector} from "react-redux";
import {FacebookLoader} from "../Loader/FacebookLoader";
import {useParams} from "react-router";
import {actionToGetSubjectAllChapterDataById, actionToGetSubjectDataBySubjectId} from "../../actions/CommonAction";

export const SubjectAllChaptersDesktopComponent = ()=>{
    const {loading,selectedSubject} = useSelector((state) => state.selectedSubjectData);
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(actionToGetSubjectDataBySubjectId(id));
        dispatch(actionToGetSubjectAllChapterDataById(id));
    }, [id]);
    return(
        <div className={"main_body_content_section"}>
            {(loading) ?
                <div className={"loading_in_chapter_page_desktop"}>
                    <FacebookLoader type={"facebookStyle"} item={10}/>
                </div>
                :
                <>
                    <StudentDashSubHeaderComponent pageName={'subject-chapters'} subjectName={selectedSubject?.name}/>
                    <SubjectAllChapterDataBodyComponent subjectName={selectedSubject?.name}/>
                </>
            }
        </div>
    )
}