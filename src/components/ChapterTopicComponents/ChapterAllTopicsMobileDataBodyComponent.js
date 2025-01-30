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
                                        <div className={"row topic_in_chapter_container"}>
                                            <div className={'col-2 cont_center'}>
                                                {(topic?.type === 'image' || topic?.type === 'flipbook') ?
                                                    <svg fill="#000000" width="20px" height="20px" viewBox="0 0 32 32"
                                                         version="1.1">
                                                        <path
                                                            d="M0 26.016q0 2.496 1.76 4.224t4.256 1.76h20q2.464 0 4.224-1.76t1.76-4.224v-20q0-2.496-1.76-4.256t-4.224-1.76h-20q-2.496 0-4.256 1.76t-1.76 4.256v20zM4 26.016v-20q0-0.832 0.576-1.408t1.44-0.608h20q0.8 0 1.408 0.608t0.576 1.408v20q0 0.832-0.576 1.408t-1.408 0.576h-20q-0.832 0-1.44-0.576t-0.576-1.408zM6.016 24q0 0.832 0.576 1.44t1.408 0.576h16q0.832 0 1.408-0.576t0.608-1.44v-0.928q-0.224-0.448-1.12-2.688t-1.6-3.584-1.28-2.112q-0.544-0.576-1.12-0.608t-1.152 0.384-1.152 1.12-1.184 1.568-1.152 1.696-1.152 1.6-1.088 1.184-1.088 0.448q-0.576 0-1.664-1.44-0.16-0.192-0.48-0.608-1.12-1.504-1.6-1.824-0.768-0.512-1.184 0.352-0.224 0.512-0.928 2.24t-1.056 2.56v0.64zM6.016 9.024q0 1.248 0.864 2.112t2.112 0.864 2.144-0.864 0.864-2.112-0.864-2.144-2.144-0.864-2.112 0.864-0.864 2.144z"/>
                                                    </svg>
                                                    : (topic?.type === 'video') ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px"
                                                             height="20px" viewBox="0 0 24 24" fill="none">
                                                            <path
                                                                d="M12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2Z"
                                                                stroke="#000000" strokeWidth="1.5"/>
                                                            <path d="M21.5 17L2.5 17" stroke="#000000"
                                                                  strokeWidth="1.5" strokeLinecap="round"/>
                                                            <path d="M21.5 7L2.5 7" stroke="#000000" strokeWidth="1.5"
                                                                  strokeLinecap="round"/>
                                                            <path d="M12 2L12 7M12 22L12 17" stroke="#000000"
                                                                  strokeWidth="1.5" strokeLinecap="round"/>
                                                            <path d="M17 2.5L17 7M17 21.5L17 17" stroke="#000000"
                                                                  strokeWidth="1.5" strokeLinecap="round"/>
                                                            <path d="M7 2.5L7 7M7 21.5L7 17" stroke="#000000"
                                                                  strokeWidth="1.5" strokeLinecap="round"/>
                                                            <path
                                                                d="M14 12C14 11.4722 13.4704 11.1162 12.4112 10.4043C11.3375 9.68271 10.8006 9.3219 10.4003 9.58682C10 9.85174 10 10.5678 10 12C10 13.4322 10 14.1483 10.4003 14.4132C10.8006 14.6781 11.3375 14.3173 12.4112 13.5957C13.4704 12.8838 14 12.5278 14 12Z"
                                                                stroke="#000000" strokeWidth="1.5"
                                                                strokeLinecap="round"/>
                                                        </svg>
                                                        :
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000"
                                                             width="20px" height="20px" viewBox="0 0 1920 1920">
                                                            <g fillRule="evenodd">
                                                                <path
                                                                    d="M1251.654 0c44.499 0 88.207 18.07 119.718 49.581l329.223 329.224c31.963 31.962 49.581 74.54 49.581 119.717V1920H169V0Zm-66.183 112.941H281.94V1807.06h1355.294V564.706H1185.47V112.94Zm112.94 23.379v315.445h315.445L1298.412 136.32Z"/>
                                                                <path
                                                                    d="M900.497 677.67c26.767 0 50.372 12.65 67.991 37.835 41.901 59.068 38.965 121.976 23.492 206.682-5.308 29.14.113 58.617 16.263 83.125 22.814 34.786 55.68 82.673 87.981 123.219 23.718 29.93 60.198 45.854 97.13 40.885 23.718-3.276 52.292-5.986 81.656-5.986 131.012 0 121.186 46.757 133.045 89.675 6.55 25.976 3.275 48.678-10.165 65.506-16.715 22.701-51.162 34.447-101.534 34.447-55.793 0-74.202-9.487-122.767-24.96-27.445-8.81-55.906-10.617-83.69-3.275-55.453 14.456-146.936 36.48-223.284 46.983-40.772 5.647-77.816 26.654-102.438 60.875-55.454 76.8-106.842 148.518-188.273 148.518-21.007 0-40.32-7.567-56.244-22.701-23.492-23.492-33.544-49.581-28.574-79.85 13.778-92.95 128.075-144.79 196.066-182.625 16.037-8.923 28.687-22.589 36.592-39.53l107.86-233.223c7.68-16.377 10.051-34.56 7.228-52.518-12.537-79.059-31.06-211.99 18.748-272.075 10.955-13.44 26.09-21.007 42.917-21.007Zm20.556 339.953c-43.257 126.607-119.718 264.282-129.996 280.32 92.273-43.37 275.916-65.28 275.916-65.28-92.386-88.998-145.92-215.04-145.92-215.04Z"/>
                                                            </g>
                                                        </svg>
                                                }
                                            </div>
                                            <div className={'col-8'}>
                                                <div className={"topic_detail_name"}>
                                                    {topic?.name}
                                                </div>
                                                <div className={"topic_detail_desc"}>
                                                    {topic?.description}
                                                </div>
                                            </div>
                                            <div className={'col-2 cont_center'}>
                                                <svg xmlns="http://www.w3.org/2000/svg"  width="20px"
                                                     height="20px" viewBox="-4.5 0 20 20" version="1.1">
                                                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none"
                                                       fillRule="evenodd">
                                                        <g id="Dribbble-Light-Preview"
                                                           transform="translate(-305.000000, -6679.000000)"
                                                           fill="#000000">
                                                            <g id="icons" transform="translate(56.000000, 160.000000)">
                                                                <path
                                                                    d="M249.365851,6538.70769 L249.365851,6538.70769 C249.770764,6539.09744 250.426289,6539.09744 250.830166,6538.70769 L259.393407,6530.44413 C260.202198,6529.66364 260.202198,6528.39747 259.393407,6527.61699 L250.768031,6519.29246 C250.367261,6518.90671 249.720021,6518.90172 249.314072,6519.28247 L249.314072,6519.28247 C248.899839,6519.67121 248.894661,6520.31179 249.302681,6520.70653 L257.196934,6528.32352 C257.601847,6528.71426 257.601847,6529.34685 257.196934,6529.73759 L249.365851,6537.29462 C248.960938,6537.68437 248.960938,6538.31795 249.365851,6538.70769"
                                                                    id="arrow_right-[#336]">

                                                                </path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                        {/*<div className={"topic_video_poster_play_button"}>*/}
                                        {/*<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">*/}
                                        {/*        <path*/}
                                        {/*            d="M13.75 8.412l24.417 12.705a3.25 3.25 0 0 1 0 5.766L13.75 39.588A3.25 3.25 0 0 1 9 36.705v-25.41a3.25 3.25 0 0 1 4.549-2.979l.202.096z"/>*/}
                                        {/*    </svg>*/}
                                        {/*</div>*/}
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
        </div>
    )
}

export const ChapterAllTopicsMobileDataBodyComponent = React.memo(ChapterAllTopicsMobileDataBodyComponentFunction);
