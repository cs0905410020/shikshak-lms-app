import React from "react";
import { useSelector} from "react-redux";
import {FacebookLoader} from "../Loader/FacebookLoader";
import noDataFound from "../../theme/image/no-data-found-desktop.png";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {_readableTimeFromSeconds} from "../../helpers/CommonHelper";
import {useHistory} from "react-router-dom";

function ChapterAllTopicsDataBodyComponentFunction({chapterId,chapterName}){
    const chapterAllTopicsData = useSelector((state) => state.chapterAllTopicsData);
    const history = useHistory();
    const goToPage = (type)=>{
        history.push(type);
    }
    const openVideoInVideoPanel = (topic)=>{
        goToPage(`/dashboard/home/chapter-topics-video/${chapterId}/${topic?.id}`);
    }
    const getChapterSectionDataHtml = (topic, key) => {
        console.log(topic,'topic')
        switch (topic?.type) {
            case 'video':
                return (
                    <div key={key} className="chapter_section_loop_area_main_section">
                        <div className="chapter_section_loop_area_inner_section">
                            <div className="col-2 chapter_icon_section_col">
                                <div className="topic_video_poster_screenshot_section">
                                    <LazyLoadImage
                                        alt="Video Class"
                                        src={topic?.poster_url ? topic?.poster_url : 'https://stemcity.s3.ap-southeast-2.amazonaws.com/products/steam-park-8.png'}
                                    />
                                    <div className="topic_video_poster_timer_button">
                                        {_readableTimeFromSeconds(topic?.video_duration_in_seconds)}
                                    </div>
                                    <div
                                        onClick={() => openVideoInVideoPanel(topic)}
                                        className="topic_video_poster_play_button"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                            <path d="M13.75 8.412l24.417 12.705a3.25 3.25 0 0 1 0 5.766L13.75 39.588A3.25 3.25 0 0 1 9 36.705v-25.41a3.25 3.25 0 0 1 4.549-2.979l.202.096z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="col-7">
                                <div className="chapter_name_section">
                                    <div className="subject_name">{chapterName}</div>
                                    <div className="chapter_name">{topic?.name}</div>
                                    <div className="chapter_description">{topic?.description}</div>
                                    <div className="topic_progress_input_bar">
                                        <div className="progress-element progress-element--html">
                                            <p className="progress-label">
                                                Progress &nbsp; &nbsp; {topic?.lesson_completed_percentage ? Math.round(topic?.lesson_completed_percentage) : 0}%
                                            </p>
                                            <div
                                                className="progress-container"
                                                title={topic?.lesson_completed_percentage ? Math.round(topic?.lesson_completed_percentage) : 0}
                                            >
                                                <progress
                                                    max="100"
                                                    value={topic?.lesson_completed_percentage ? Math.round(topic?.lesson_completed_percentage) : 0}
                                                ></progress>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="topics_inner_section">
                                    <button onClick={() => openVideoInVideoPanel(topic)}>Watch Video</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            // Handle other cases similarly (image, flipbook, file, etc.)
            default:
                return (<div key={key} className={"chapter_section_loop_area_main_section"}>
                            <div className={"chapter_section_loop_area_inner_section"}>
                                <div className={"col-2 chapter_icon_section_col"}>
                                    <div className={"topic_video_poster_screenshot_section"}>
                                        <LazyLoadImage
                                            alt={'Video Class'}
                                            src={topic?.poster_url ? topic?.poster_url : 'https://stemcity.s3.ap-southeast-2.amazonaws.com/products/steam-park-8.png'} // use normal <img> attributes as props
                                        /></div>
                                </div>
                                <div className={"col-7"}>
                                    <div className={"chapter_name_section"}>
                                        <div className={"subject_name"}>{chapterName}</div>
                                        <div className={"chapter_name"}>{topic?.name}</div>
                                        <div className={"chapter_description"}>{topic?.description}</div>
                                    </div>
                                </div>
                                <div className={"col-3"}>
                                    <div className={"topics_inner_section"}>
                                        <button onClick={()=>openVideoInVideoPanel(topic)}>Watch Video</button>
                                    </div>
                                </div>
                            </div>
                        </div>);
        }
    };

    return (
        <div className={"subject_chapter_main_container_section"}>
            <div className={"subject_chapter_main_container_inner_section"}>
                {(chapterAllTopicsData?.loading) ?
                    <div className={"loader_section"}>
                        <div className={"loading_in_chapter_page_desktop"}>
                            <FacebookLoader type={"facebookStyleBigLoader"} item={4}/>
                        </div>
                    </div>
                    :
                    (chapterAllTopicsData?.topicsData?.length) ?
                        chapterAllTopicsData.topicsData.map((topic, key) => getChapterSectionDataHtml(topic, key))
                        :
                        <div className={"desktop_no_data_found_icon_container"}>
                            <img src={noDataFound}/>
                        </div>
                }
            </div>
        </div>
    )
}
export const ChapterAllTopicsDataBodyComponent = React.memo(ChapterAllTopicsDataBodyComponentFunction);
