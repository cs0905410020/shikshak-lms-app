import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    actionToGetChapterAllTopicDataById, actionToGetChapterDataByChapterId,
} from "../../actions/CommonAction";
import {useParams} from "react-router";
import {ChapterAllTopicsDesktopComponent} from "../../components/ChapterTopicComponents/ChapterAllTopicsDesktopComponent";
import {ChapterAllTopicsMobileComponent} from "../../components/ChapterTopicComponents/ChapterAllTopicsMobileComponent";

export default function ChapterAllTopicPage(){
    const dispatch = useDispatch();
    const {id} = useParams();
    const windowResizeCount = useSelector((state) => state.windowResizeCount);
    useEffect(() => {
        dispatch(actionToGetChapterDataByChapterId(id));
        dispatch(actionToGetChapterAllTopicDataById(id));
    }, [id]);
    return (
        <>
            {(windowResizeCount >= 800) ?
                <ChapterAllTopicsDesktopComponent/>
                :
                <ChapterAllTopicsMobileComponent/>
            }
        </>
    )
}
