import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FacebookLoader} from "../Loader/FacebookLoader";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {_readableTimeFromSeconds} from "../../helpers/CommonHelper";
import {actionToSetTopicDataById} from "../../actions/CommonAction";
import {ReactVideoPlayerCommonComponent} from "../ChapterTopicComponents/ReactVideoPlayerCommonComponent";

function ChapterAllTopicsDesktopVideoBodyComponentFunction(){
    const chapterAllTopicsData = useSelector((state) => state.chapterAllTopicsData);
    const chapterTopicsDataByTopicId = useSelector((state) => state.chapterTopicsDataByTopicId);

    const dispatch = useDispatch();
    const openVideoInVideoPanel = (topic)=>{
        dispatch(actionToSetTopicDataById(topic));
    }

    return (
        <div className={"subject_chapter_main_container_section video_container"}>
            <div className={"subject_chapter_main_container_section_video_page_inner"}>
                <div className={"row"}>
                    <div className={"col-8 video_col"}>
                        {(chapterAllTopicsData?.loading) ?
                            <div className={"loader_section"}>
                                <div className={"loading_in_chapter_list_page_mobile"}>
                                    <FacebookLoader type={"facebookStyleMobileLoader"} item={5}/>
                                </div>
                            </div>
                            :(Object.keys(chapterTopicsDataByTopicId).length) ?
                                <div className='topic_video_class_desktop_main_div_container'>
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
                                        <FacebookLoader type={"facebookStyleMobileLoader"} item={5}/>
                                    </div>
                                </div>
                        }
                    </div>
                    <div className={"col-4 list_col"}>
                        {(chapterAllTopicsData?.loading) ?
                            <div className={"loader_section"}>
                                <div className={"loading_in_chapter_list_page_mobile"}>
                                    <FacebookLoader type={"facebookStyleMobileLoader"} item={6}/>
                                </div>
                            </div>
                            :
                            (chapterAllTopicsData?.topicsData?.length) ?
                                chapterAllTopicsData?.topicsData?.map((topic, key) => (
                                    <div key={key} className={"row video_list_main_loop_container"}>
                                        <div className={"col-5 topic_video_poster_screenshot_section"}>
                                            <LazyLoadImage
                                                alt={'Video Class'}
                                                src={topic?.poster_url}/>
                                            <div className={"topic_video_poster_timer_button"}>
                                                {_readableTimeFromSeconds(topic?.video_duration_in_seconds)}
                                            </div>
                                            <div onClick={()=>openVideoInVideoPanel(topic)} className={"topic_video_poster_play_button"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M13.75 8.412l24.417 12.705a3.25 3.25 0 0 1 0 5.766L13.75 39.588A3.25 3.25 0 0 1 9 36.705v-25.41a3.25 3.25 0 0 1 4.549-2.979l.202.096z"/></svg>
                                            </div>
                                        </div>
                                        <div className={"col-7 topic_text_name_section"}>
                                            <div className={"topic_name"}>{topic?.name}</div>
                                            {(chapterTopicsDataByTopicId?.id === topic?.id) ?
                                                <div className={"time_duration"}>
                                                    Now Playing
                                                </div>
                                                :
                                                <div className={"time_duration"}>
                                                    {_readableTimeFromSeconds(topic?.video_duration_in_seconds)}
                                                </div>
                                            }
                                        </div>
                                    </div>
                                ))
                                :
                                <div className={"loader_section"}>
                                    <div className={"loading_in_chapter_list_page_mobile"}>
                                        <FacebookLoader type={"facebookStyleMobileLoader"} item={5}/>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export const ChapterAllTopicsDesktopVideoBodyComponent = React.memo(ChapterAllTopicsDesktopVideoBodyComponentFunction);
