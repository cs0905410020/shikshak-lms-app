import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import noDataFound from "../../theme/image/no-data-found-mobile.png";
import {_readableTimeFromSeconds} from "../../helpers/CommonHelper";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {actionToSetTopicDataById} from "../../actions/CommonAction";
import {FacebookLoader} from "../../components/Loader/FacebookLoader";
import {ReactVideoPlayerCommonComponent} from "../../components/ChapterTopicComponents/ReactVideoPlayerCommonComponent";

function ChapterAllTopicsMobileVideoBodyComponentFunction({topicId}){
    const chapterAllTopicsData = useSelector((state) => state.chapterAllTopicsData);
    const chapterTopicsDataByTopicId = useSelector((state) => state.chapterTopicsDataByTopicId);

    const dispatch = useDispatch();
    const openVideoInVideoPanel = (topic)=>{
        console.log(topic,'topic');
        dispatch(actionToSetTopicDataById(topic));
    }
    useEffect(()=>{
        return ()=>{
            dispatch(actionToSetTopicDataById({}));
        }
    },[])
    return (
        <div className={"subject_chapter_mobile_main_container_section video_section"}>
            {(chapterAllTopicsData?.loading) ?
                <div className={"loader_section"}>
                    <div className={"loading_in_chapter_list_page_mobile"}>
                        <FacebookLoader type={"facebookStyleMobileLoader"} item={2}/>
                    </div>
                </div>
                :(Object.keys(chapterTopicsDataByTopicId).length) ?
                    <div className='topic_video_class_main_div_container'>
                        <div className={"react-player_wrapper"}>
                            <ReactVideoPlayerCommonComponent openTopicVideoSection={chapterTopicsDataByTopicId}/>
                        </div>
                        <div className={"react-player_topic_heading_section"}>
                            <strong>Now Playing : </strong> {chapterTopicsDataByTopicId?.name}
                        </div>
                    </div>
                    :
                    <div className={"loader_section"}>
                        <div className={"loading_in_chapter_list_page_mobile"}>
                            <FacebookLoader type={"facebookStyleMobileLoader"} item={2}/>
                        </div>
                    </div>
            }
            <div className={"subject_chapter_mobile_chapters_main_container video_section"}>
                {(chapterAllTopicsData?.loading) ?
                    <div className={"loader_section"}>
                        <div className={"loading_in_chapter_list_page_mobile"}>
                            <FacebookLoader type={"facebookStyleMobileLoader"} item={5}/>
                        </div>
                    </div>
                    :
                    (chapterAllTopicsData?.topicsData?.length) ?
                        chapterAllTopicsData?.topicsData?.map((topic,key)=>(
                            <div key={key}
                                 onClick={()=>openVideoInVideoPanel(topic)}
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
                                        {(topicId === topic?.id) ?
                                            <p className="progress-label">
                                                Progress
                                                &nbsp;
                                                &nbsp;
                                                {_readableTimeFromSeconds(topic?.video_duration_in_seconds)}
                                            </p>
                                            :
                                            <p className="progress-label">
                                                Now Playing
                                            </p>
                                        }
                                        {/*<div className="progress-container" title={topic?.lesson_completed_percentage ? Math.round(topic?.lesson_completed_percentage) : 0}>*/}
                                        {/*    <progress max="100" value={topic?.lesson_completed_percentage ? Math.round(topic?.lesson_completed_percentage) : 0}></progress>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </div>
                        ))
                        :
                        <div className={"mobile_no_data_found_icon_container"}>
                            <img alt={"noDataFound"} src={noDataFound}/>
                        </div>
                }
            </div>
        </div>
    )
}
export const ChapterAllTopicsMobileVideoBodyComponent = React.memo(ChapterAllTopicsMobileVideoBodyComponentFunction);
