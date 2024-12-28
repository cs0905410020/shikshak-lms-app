import React from "react";
import {useDispatch, useSelector} from "react-redux";
import noDataFound from "../../theme/image/no-data-found-mobile.png";
import {_readableTimeFromSeconds} from "../../helpers/CommonHelper";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {actionToSetTopicDataById} from "../../actions/CommonAction";
import {FacebookLoader} from "../Loader/FacebookLoader";
import {ReactVideoPlayerCommonComponent} from "../ChapterTopicComponents/ReactVideoPlayerCommonComponent";
function ChapterAllTopicsMobileVideoBodyComponentFunction({topicId}){
    const chapterAllTopicsData = useSelector((state) => state.chapterAllTopicsData);
    const chapterTopicsDataByTopicId = useSelector((state) => state.chapterTopicsDataByTopicId);

    const dispatch = useDispatch();
    const openVideoInVideoPanel = (topic)=>{
        dispatch(actionToSetTopicDataById(topic));
    }
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
                        {(chapterTopicsDataByTopicId?.type === 'video') ?
                            <div className={"react-player_wrapper"}>
                                <ReactVideoPlayerCommonComponent openTopicVideoSection={chapterTopicsDataByTopicId}/>
                            </div>
                            :(chapterTopicsDataByTopicId?.type === 'image' || chapterTopicsDataByTopicId?.type === 'flipbook') ?
                                <div className={"topic_pdf_wrapper"}>
                                    <iframe
                                        src={'https://www.sldttc.org/allpdf/21583473018.pdf'}
                                        allow="fullscreen"
                                        title="PDF Viewer"
                                    />
                                </div>
                                : (chapterTopicsDataByTopicId?.type === 'file') ?
                                    <div className={"topic_pdf_wrapper"}>
                                        <iframe
                                            src={'https://www.sldttc.org/allpdf/21583473018.pdf'}
                                            allow="fullscreen"
                                            title="PDF Viewer"
                                        />
                                    </div>
                                    :
                                    ''
                        }
                        <div className={"react-player_topic_heading_section"}>
                            <strong>Topic name : </strong> {chapterTopicsDataByTopicId?.name}
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
                                    {(topic?.type === 'video') ?
                                        <div className={"topic_video_poster_screenshot_section_app"}>
                                            <LazyLoadImage
                                                alt={'Video Class'}
                                                src={topic?.poster_url ? topic?.poster_url : 'https://stemcity.s3.ap-southeast-2.amazonaws.com/products/steam-park-8.png'} // use normal <img> attributes as props
                                            />
                                            <div className={"topic_video_poster_timer_button"}>
                                                {_readableTimeFromSeconds(topic?.video_duration_in_seconds)}
                                            </div>
                                            <div className={"topic_video_poster_play_button list_vid"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                                    <path
                                                        d="M13.75 8.412l24.417 12.705a3.25 3.25 0 0 1 0 5.766L13.75 39.588A3.25 3.25 0 0 1 9 36.705v-25.41a3.25 3.25 0 0 1 4.549-2.979l.202.096z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        :
                                        <div className={"topic_video_poster_screenshot_section_app"}>
                                            {(topic?.type === 'image' || topic?.type === 'flipbook') ?
                                                <svg fill="#000000" width="50px" height="50px" viewBox="0 0 32 32"
                                                     version="1.1">
                                                    <path
                                                        d="M0 26.016q0 2.496 1.76 4.224t4.256 1.76h20q2.464 0 4.224-1.76t1.76-4.224v-20q0-2.496-1.76-4.256t-4.224-1.76h-20q-2.496 0-4.256 1.76t-1.76 4.256v20zM4 26.016v-20q0-0.832 0.576-1.408t1.44-0.608h20q0.8 0 1.408 0.608t0.576 1.408v20q0 0.832-0.576 1.408t-1.408 0.576h-20q-0.832 0-1.44-0.576t-0.576-1.408zM6.016 24q0 0.832 0.576 1.44t1.408 0.576h16q0.832 0 1.408-0.576t0.608-1.44v-0.928q-0.224-0.448-1.12-2.688t-1.6-3.584-1.28-2.112q-0.544-0.576-1.12-0.608t-1.152 0.384-1.152 1.12-1.184 1.568-1.152 1.696-1.152 1.6-1.088 1.184-1.088 0.448q-0.576 0-1.664-1.44-0.16-0.192-0.48-0.608-1.12-1.504-1.6-1.824-0.768-0.512-1.184 0.352-0.224 0.512-0.928 2.24t-1.056 2.56v0.64zM6.016 9.024q0 1.248 0.864 2.112t2.112 0.864 2.144-0.864 0.864-2.112-0.864-2.144-2.144-0.864-2.112 0.864-0.864 2.144z"/>
                                                </svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000"
                                                     width="50px" height="50px" viewBox="0 0 1920 1920">
                                                    <g fillRule="evenodd">
                                                        <path
                                                            d="M1251.654 0c44.499 0 88.207 18.07 119.718 49.581l329.223 329.224c31.963 31.962 49.581 74.54 49.581 119.717V1920H169V0Zm-66.183 112.941H281.94V1807.06h1355.294V564.706H1185.47V112.94Zm112.94 23.379v315.445h315.445L1298.412 136.32Z"/>
                                                        <path
                                                            d="M900.497 677.67c26.767 0 50.372 12.65 67.991 37.835 41.901 59.068 38.965 121.976 23.492 206.682-5.308 29.14.113 58.617 16.263 83.125 22.814 34.786 55.68 82.673 87.981 123.219 23.718 29.93 60.198 45.854 97.13 40.885 23.718-3.276 52.292-5.986 81.656-5.986 131.012 0 121.186 46.757 133.045 89.675 6.55 25.976 3.275 48.678-10.165 65.506-16.715 22.701-51.162 34.447-101.534 34.447-55.793 0-74.202-9.487-122.767-24.96-27.445-8.81-55.906-10.617-83.69-3.275-55.453 14.456-146.936 36.48-223.284 46.983-40.772 5.647-77.816 26.654-102.438 60.875-55.454 76.8-106.842 148.518-188.273 148.518-21.007 0-40.32-7.567-56.244-22.701-23.492-23.492-33.544-49.581-28.574-79.85 13.778-92.95 128.075-144.79 196.066-182.625 16.037-8.923 28.687-22.589 36.592-39.53l107.86-233.223c7.68-16.377 10.051-34.56 7.228-52.518-12.537-79.059-31.06-211.99 18.748-272.075 10.955-13.44 26.09-21.007 42.917-21.007Zm20.556 339.953c-43.257 126.607-119.718 264.282-129.996 280.32 92.273-43.37 275.916-65.28 275.916-65.28-92.386-88.998-145.92-215.04-145.92-215.04Z"/>
                                                    </g>
                                                </svg>
                                            }
                                        </div>
                                    }
                                </div>
                                <div className={"col-8 text_section"}>
                                    <div className={"chapter_name"}>{topic?.name}</div>
                                    <div className={"topic_progress_data"}>
                                        {(chapterTopicsDataByTopicId?.id === topic?.id) ?
                                            <p className="progress-label">
                                                Active Topic
                                            </p>
                                            :
                                            <p className="progress-label">
                                                Click to vide this
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
