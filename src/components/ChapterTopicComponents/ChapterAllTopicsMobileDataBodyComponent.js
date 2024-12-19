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
    const allChapterTestData = useSelector((state) => state.allChapterTestData);
    const [tabType,setTabType] = useState('Topics');

    const history = useHistory();
    const goToPage = (type)=>{
        history.push(type);
    }
    const openVideoInVideoPanel = (topic)=>{
        goToPage(`/dashboard/home/chapter-topics-video/${topic?.chapter_id}/${topic?.id}`);
    }
    const openTestPanel = (test)=>{
        goToPage(`/dashboard/home/chapter-test-detail/${test?.chapter_id}/${test?.id}`);
    }

    return (
        <div className={"subject_chapter_mobile_main_container_section"}>
            {!(isTeacherMasterLogin()) ?
                <div className={"test_switch_buttons_main_container"}>
                    <div className={"test_switch_buttons_main_container_inner"}>
                        <div onClick={() => setTabType('Topics')}
                             className={"tab_section_button " + (tabType === 'Topics' ? 'active' : '')}>Topics
                        </div>
                        <div onClick={() => setTabType('Test Exercise')}
                             className={"tab_section_button " + (tabType === 'Test Exercise' ? 'active' : '')}>Test
                            Exercise
                        </div>
                    </div>
                </div>
                : ''
            }
            <div className={"chapter_heading_section"}>{tabType}</div>
            {(tabType === 'Topics') ?
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
                                    <div className={"col-4 icon_section"}>
                                        <div onClick={() => openVideoInVideoPanel(topic)}
                                             className={"topic_video_poster_screenshot_section_app"}>
                                            <LazyLoadImage
                                                alt={'Video Class'}
                                                src={topic?.poster_url} // use normal <img> attributes as props
                                            />
                                            <div className={"topic_video_poster_timer_button"}>
                                                {_readableTimeFromSeconds(topic?.video_duration_in_seconds)}
                                            </div>
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
                                        <div className={"topic_progress_data"}>
                                            <p className="progress-label">
                                                Progress
                                                &nbsp;
                                                &nbsp;
                                                {topic?.lesson_completed_percentage ? Math.round(topic?.lesson_completed_percentage) : 0}%
                                            </p>
                                            <div className="progress-container"
                                                 title={topic?.lesson_completed_percentage ? Math.round(topic?.lesson_completed_percentage) : 0}>
                                                <progress max="100"
                                                          value={topic?.lesson_completed_percentage ? Math.round(topic?.lesson_completed_percentage) : 0}></progress>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            <div className={"mobile_no_data_found_icon_container"}>
                                <img src={noDataFound}/>
                            </div>
                    }
                </div>
                :
                <div className={"subject_chapter_mobile_chapters_main_container"}>
                    {(allChapterTestData?.loading) ?
                        <div className={"loader_section"}>
                            <div className={"loading_in_chapter_list_page_mobile"}>
                                <FacebookLoader type={"facebookStyleMobileLoader"} item={8}/>
                            </div>
                        </div>
                        :
                        (allChapterTestData?.testData?.length) ?
                            allChapterTestData?.testData?.map((test, key) => (
                                <div key={key}
                                     onClick={() => openTestPanel(test)}
                                     className={"subject_chapter_mobile_chapters_loop"}>
                                    <div className={"col-4 icon_section"}>
                                        <div className={"topic_video_poster_screenshot_section_app"}>
                                            <LazyLoadImage
                                                alt={'Video Class'}
                                                src={testPngIcon}/>
                                        </div>
                                    </div>
                                    <div className={"col-8 text_section"}>
                                        <div className={"chapter_name"}>{test?.name}</div>
                                        <div className={"topic_progress_data"}>
                                            <p className="progress-label">
                                                Duration
                                                &nbsp;
                                                {_readableTimeFromSecondsSSMMHH(test?.time_in_seconds)}
                                            </p>
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
            }
        </div>
    )
}
export const ChapterAllTopicsMobileDataBodyComponent = React.memo(ChapterAllTopicsMobileDataBodyComponentFunction);
