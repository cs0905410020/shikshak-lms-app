import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    actionToGetChapterAllTopicDataById,
    actionToGetChapterDataByChapterId
} from "../../actions/CommonAction";
import {useParams} from "react-router";
import {ChapterAllTopicsDesktopVideoBodyComponent} from "./ChapterAllTopicsDesktopVideoBodyComponent";
import {FacebookLoader} from "../Loader/FacebookLoader";
import {StudentDashSubHeaderComponent} from "./StudentDashSubHeaderComponent";

export default function ChapterAllTopicsVideoDesktopComponent(){
    const {loading,selectedChapter} = useSelector((state) => state.selectedChapterData);
    const dispatch = useDispatch();
    const {chapter_id,topic_id} = useParams();
    useEffect(() => {
        dispatch(actionToGetChapterDataByChapterId(chapter_id));
        dispatch(actionToGetChapterAllTopicDataById(chapter_id,topic_id));
    }, [chapter_id,topic_id]);
    return (
        <div className={"main_body_content_section"}>
            {(loading) ?
                <div className={"loading_in_chapter_page_desktop"}>
                    <FacebookLoader type={"facebookStyle"} item={9}/>
                </div>
                :
                <>
                    <StudentDashSubHeaderComponent pageName={'subject-chapters'} subjectName={selectedChapter?.name}/>
                    <ChapterAllTopicsDesktopVideoBodyComponent/>
                </>
            }
        </div>
    )
}