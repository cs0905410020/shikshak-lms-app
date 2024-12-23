import React, {useState} from "react";
import {useSelector} from "react-redux";
import {FacebookLoader} from "../Loader/FacebookLoader";
import noDataFound from "../../theme/image/no-data-found-mobile.png";
import {_readableTimeFromSeconds, _readableTimeFromSecondsSSMMHH} from "../../helpers/CommonHelper";
import {LazyLoadImage} from "react-lazy-load-image-component";
import testPngIcon from "../../theme/image/test-png-icon.png";
import {useHistory} from "react-router-dom";
import {Capacitor} from "@capacitor/core";
import {isTeacherMasterLogin} from "../../middlewear/auth";

function ChapterAllTopicsMobileDataBodyComponentFunction(){
    const chapterAllTopicsData = useSelector((state) => state.chapterAllTopicsData);

    const history = useHistory();
    const goToPage = (type)=>{
        history.push(type);
    }
    const openVideoInVideoPanel = (topic)=>{
        goToPage(`/dashboard/home/chapter-topics-video/${topic?.curriculum_id}/${topic?.id}`);
    }

    return (
        <div className={"subject_chapter_mobile_main_container_section"}>
            <div className={"chapter_heading_section"}>Topics</div>
            <div className={"subject_chapter_mobile_chapters_main_container"}>
                {(chapterAllTopicsData?.loading) ?
                    <div className={"loader_section"}>
                        <div className={"loading_in_chapter_list_page_mobile"}>
                            <FacebookLoader type={"facebookStyleMobileLoader"} item={8}/>
                        </div>
                    </div>
                    :
                    (chapterAllTopicsData?.topicsData?.length) ?
                        chapterAllTopicsData?.topicsData?.map((topic, key) => (
                            <div key={key} className={"subject_chapter_mobile_chapters_loop"}>
                                <div className={"col-12 icon_section"}>
                                    <div onClick={() => openVideoInVideoPanel(topic)}
                                         className={"topic_video_poster_screenshot_section_app"}>
                                        <LazyLoadImage
                                            alt={'Video Class'}
                                            src={topic?.poster_url ? topic?.poster_url : 'https://stemcity.s3.ap-southeast-2.amazonaws.com/products/steam-park-8.png'} // use normal <img> attributes as props
                                        />
                                        <div className={"topic_video_poster_play_button"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                                <path
                                                    d="M13.75 8.412l24.417 12.705a3.25 3.25 0 0 1 0 5.766L13.75 39.588A3.25 3.25 0 0 1 9 36.705v-25.41a3.25 3.25 0 0 1 4.549-2.979l.202.096z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className={"col-8 text_section"}>
                                    <div className={"chapter_name"}>{topic?.name}</div>
                                </div>
                            </div>
                        ))
                        :
                        <div className={"mobile_no_data_found_icon_container"}>
                            <img src={noDataFound}/>
                        </div>
                }
            </div>
        </div>
    )
}

export const ChapterAllTopicsMobileDataBodyComponent = React.memo(ChapterAllTopicsMobileDataBodyComponentFunction);
