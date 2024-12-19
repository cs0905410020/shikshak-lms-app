import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FacebookLoader} from "../Loader/FacebookLoader";
import {Capacitor} from "@capacitor/core";
import {StatusBar} from "@capacitor/status-bar";
import {StudentDashMobileSubHeaderComponent} from "./StudentDashMobileSubHeaderComponent";
import {ChapterAllTopicsMobileVideoBodyComponent} from "./ChapterAllTopicsMobileVideoBodyComponent";
import {useParams} from "react-router";
import {actionToGetChapterAllTopicDataById, actionToGetChapterDataByChapterId} from "../../actions/CommonAction";

export const ChapterAllTopicsVideoMobileComponent = ()=>{
    const {loading,selectedChapter} = useSelector((state) => state.selectedChapterData);
    useEffect(()=>{
        if (Capacitor.isNativePlatform()) {
            StatusBar?.setOverlaysWebView({overlay: false});
            StatusBar?.setBackgroundColor({color: '#2196f3'});
        }
    },[])
    const dispatch = useDispatch();
    const {chapter_id,topic_id} = useParams();
    useEffect(() => {
        dispatch(actionToGetChapterDataByChapterId(chapter_id));
        dispatch(actionToGetChapterAllTopicDataById(chapter_id,topic_id));
    }, [chapter_id,topic_id]);
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
                        <ChapterAllTopicsMobileVideoBodyComponent/>
                    </div>
                </>
            }
        </div>
    )
}