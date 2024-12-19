import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    actionToGetChapterAllTopicDataById, actionToGetChapterDataByChapterId,
} from "../../actions/CommonAction";
import {useParams} from "react-router";
import {ChapterAllTopicsDesktopComponent} from "../../components/ChapterTopicComponents/ChapterAllTopicsDesktopComponent";
import {ChapterAllTopicsVideoMobileComponent} from "../../components/StudentComponent/ChapterAllTopicsVideoMobileComponent";

export default function ChapterAllTopicVideoPage(){
    const dispatch = useDispatch();
    const {chapter_id,topic_id} = useParams();
    const windowResizeCount = useSelector((state) => state.windowResizeCount);
    const chapterTopicsDataByTopicId = useSelector((state) => state.chapterTopicsDataByTopicId);
    useEffect(() => {
        if(!chapterTopicsDataByTopicId?.id) {
            dispatch(actionToGetChapterDataByChapterId(chapter_id));
            dispatch(actionToGetChapterAllTopicDataById(chapter_id,topic_id));
        }
    }, [chapter_id,topic_id]);
    return (
        <>
            {(windowResizeCount >= 800) ?
                <ChapterAllTopicsDesktopComponent/>
                :
                <ChapterAllTopicsVideoMobileComponent/>
            }
        </>
    )
}
