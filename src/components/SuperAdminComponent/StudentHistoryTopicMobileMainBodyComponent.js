import React, {useState} from "react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {_readableTimeFromSeconds} from "../../helpers/CommonHelper";
import noDataFound from "../../theme/image/no-data-found-mobile.png";
import {useSelector,useDispatch} from "react-redux";
import {FacebookLoader} from "../Loader/FacebookLoader";
import {actionToSetTopicDataById} from "../../actions/CommonAction";
import {useHistory} from "react-router-dom";

export const StudentHistoryTopicMobileMainBodyComponent = ()=>{
    const userHistoryChapterSubjectTopicData = useSelector((state) => state.userHistoryChapterSubjectTopicData);
    const history = useHistory();
    const goToPage = (type)=>{
        history.push(type);
    }
    const dispatch = useDispatch();
    const openVideoInVideoPanel = (topic,chapterId)=>{
        dispatch(actionToSetTopicDataById(topic));
        goToPage(`/dashboard/home/chapter-topics-video/${chapterId}/${topic?.id}`);
    }

    const TopicSearchDataComponent = ({index,topic,chapterId}) => {
        return (
            <div key={index}
                 onClick={()=>openVideoInVideoPanel(topic,chapterId)}
                 className={"subject_chapter_mobile_chapters_loop"}>
                <div className={"col-4 icon_section"}>
                    <div className={"topic_video_poster_screenshot_section_app"}>
                        <LazyLoadImage
                            alt={'Video Class'}
                            src={topic?.poster_url} // use normal <img> attributes as props
                        />
                        <div className={"topic_video_poster_timer_button"}>
                            {_readableTimeFromSeconds(topic?.video_duration_in_seconds)}
                        </div>
                        <div className={"topic_video_poster_play_button"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M13.75 8.412l24.417 12.705a3.25 3.25 0 0 1 0 5.766L13.75 39.588A3.25 3.25 0 0 1 9 36.705v-25.41a3.25 3.25 0 0 1 4.549-2.979l.202.096z"/></svg>
                        </div>
                    </div>
                </div>
                <div className={"col-8 text_section"}>
                    <div className={"chapter_name"}>{topic?.name}</div>
                    <div className={"topic_progress_data"}>
                        <p className="progress-label">
                            Progress
                            &nbsp;
                            &nbsp;
                            {topic?.lesson_completed_percentage ? Math.round(topic?.lesson_completed_percentage) : 0}%
                        </p>
                        <div className="progress-container" title={topic?.lesson_completed_percentage ? Math.round(topic?.lesson_completed_percentage) : 0}>
                            <progress max="100" value={topic?.lesson_completed_percentage ? Math.round(topic?.lesson_completed_percentage) : 0}></progress>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <>
            <div className={"student_app_main_body_container_sub_pages_search"}>
                <div className={"app_main_sub_header_container"} style={{background:'#f58489'}}>
                    <div className={"app_sub_header_welcome_text"}>
                        <div className={"app_sub_header_main_text_heading_subject profile-page"}>Your learning history</div>
                    </div>
                </div>
                <div className={"subject_chapter_mobile_chapters_main_container history_section_container"}>
                    {(userHistoryChapterSubjectTopicData?.loading) ?
                        <div className={"loader_section"}>
                            <div className={"loading_in_chapter_list_page_mobile"}>
                                <FacebookLoader type={"facebookStyleMobileLoader"} item={8}/>
                            </div>
                        </div>
                        :
                        (userHistoryChapterSubjectTopicData?.historyData?.length) ?
                            (userHistoryChapterSubjectTopicData?.historyData?.map((subjectData,subjectDataKey)=>(
                                <div key={subjectDataKey} className={"history_data_subject_section_loop"}>
                                    <div className={"history_data_subject_section_heading"}>{subjectData?.subject_name}</div>
                                    {(subjectData?.chapter_data?.map((chapterData,chapterKey)=>(
                                        <div key={chapterKey} className={"history_data_chapter_section_loop"}>
                                            <div className={"history_data_chapter_section_heading"}>{chapterData?.chapter_name}</div>
                                            {(chapterData?.topic_data?.map((topicData,index)=>(
                                                <TopicSearchDataComponent key={index} index={index} chapterId={chapterData?.chapter_id} topic={topicData}/>
                                            )))}
                                        </div>
                                    )))}
                                </div>
                            )))
                            :
                            <div className={"desktop_no_data_found_icon_container"}>
                                <img alt={noDataFound} src={noDataFound}/>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}
