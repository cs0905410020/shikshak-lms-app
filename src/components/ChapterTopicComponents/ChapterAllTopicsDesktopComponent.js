import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FacebookLoader} from "../Loader/FacebookLoader";
import {StudentDashSubHeaderComponent} from "../StudentComponent/StudentDashSubHeaderComponent";
import {ChapterAllTopicsDataBodyComponent} from "./ChapterAllTopicsDataBodyComponent";
import {useParams} from "react-router";
import {actionToGetChapterAllTopicDataById, actionToGetChapterDataByChapterId} from "../../actions/CommonAction";

export const ChapterAllTopicsDesktopComponent = ()=>{
    const {loading,selectedChapter} = useSelector((state) => state.selectedChapterData);
    const dispatch = useDispatch();
    const {id} = useParams();
    useEffect(() => {
        dispatch(actionToGetChapterDataByChapterId(id));
        dispatch(actionToGetChapterAllTopicDataById(id));
    }, [id]);
    return(
        <div className={"main_body_content_section"}>
            {(loading) ?
                <div className={"loading_in_chapter_page_desktop"}>
                    <FacebookLoader type={"facebookStyle"} item={9}/>
                </div>
                :
                <>
                    <StudentDashSubHeaderComponent pageName={'subject-chapters'} subjectName={selectedChapter?.name}/>
                    <ChapterAllTopicsDataBodyComponent chapterId={id} chapterName={selectedChapter?.name}/>
                </>
            }
        </div>
    )
}