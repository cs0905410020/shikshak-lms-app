import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FacebookLoader} from "../Loader/FacebookLoader";
import noDataFound from "../../theme/image/no-data-found-desktop.png";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {_readableTimeFromSeconds} from "../../helpers/CommonHelper";
import {
    actionToGetChapterAllTopicDataBySearchData,
    actionToGetChapterAllTopicDataBySearchDataLoadMore
} from "../../actions/CommonAction";
import { Virtuoso } from 'react-virtuoso'
import {ReactVideoPlayerCommonComponent} from "../ChapterTopicComponents/ReactVideoPlayerCommonComponent";
import {useHistory} from "react-router-dom";

let typingTimer = null;
let limitData = 10;
let limitOffset = 0;
function StudentSearchTopicDesktopMainBodyComponentFunction({chapterName}){
    const chapterAllTopicsSearchData = useSelector((state) => state.chapterAllTopicsSearchData);
    const [searchText,setSearchText] = useState('');
    const dispatch = useDispatch();

    const history = useHistory();
    const goToPage = (type)=>{
        history.push(type);
    }
    const openVideoInVideoPanel = (topic)=>{
        goToPage(`/dashboard/chapter-topics-video/${topic?.chapter_id}/${topic?.id}`);
    }

    const callFunctionToSearchData = ()=>{
        dispatch(actionToGetChapterAllTopicDataBySearchData(searchText,limitData,limitOffset));
        limitOffset = limitOffset+limitData;
    }
    const searchKeyUp = () => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(callFunctionToSearchData, 500);
    }
    const searchKeyDown = () => {
        limitOffset = 0;
        clearTimeout(typingTimer);
    }

    const loadMoreTopicData = () => {
        dispatch(actionToGetChapterAllTopicDataBySearchDataLoadMore(searchText, limitData, limitOffset));
        limitOffset = limitOffset + limitData;
    }

    const Footer = () => {
        return (
            <></>
        )
    }
    const TopicSearchDataComponent = ({index,topic}) => {
        return (
            <div key={index} className={"chapter_section_loop_area_main_section"}>
                <div className={"chapter_section_loop_area_inner_section"}>
                    <div className={"col-2 chapter_icon_section_col"}>
                        <div className={"topic_video_poster_screenshot_section"}>
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
                    </div>
                    <div className={"col-7"}>
                        <div className={"chapter_name_section"}>
                            <div className={"subject_name"}>{chapterName}</div>
                            <div className={"chapter_name"}>{topic?.name}</div>
                            <div className={"chapter_description"}>{topic?.description}</div>
                            <div className={"topic_progress_input_bar"}>
                                <div className="progress-element progress-element--html">
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
                    </div>
                    <div className={"col-3"}>
                        <div className={"topics_inner_section"}>
                            <button onClick={()=>openVideoInVideoPanel(topic)}>Watch Video</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={"subject_chapter_main_container_section"}>
            <div className={"search_data_main_header_with_search_box"}>
                <div className={"app_search_input_inner_section"}>
                    <input
                        onChange={(e)=>setSearchText(e.target.value)}
                        onKeyUp={searchKeyUp}
                        onKeyDown={searchKeyDown}
                        value={searchText}
                        placeholder={"Search for any topics"} autoFocus={true}/>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 487.95 487.95"><path d="M481.8 453l-140-140.1c27.6-33.1 44.2-75.4 44.2-121.6C386 85.9 299.5.2 193.1.2S0 86 0 191.4s86.5 191.1 192.9 191.1c45.2 0 86.8-15.5 119.8-41.4l140.5 140.5c8.2 8.2 20.4 8.2 28.6 0s8.2-20.4 0-28.6zM41 191.4c0-82.8 68.2-150.1 151.9-150.1s151.9 67.3 151.9 150.1-68.2 150.1-151.9 150.1S41 274.1 41 191.4z"/></svg>
                </div>
            </div>
            <div className={"subject_chapter_main_container_inner_section"}>
                {(chapterAllTopicsSearchData?.loading) ?
                    <div className={"loader_section"}>
                        <div className={"loading_in_chapter_page_desktop"}>
                            <FacebookLoader type={"facebookStyleBigLoader"} item={5}/>
                        </div>
                    </div>
                    :
                    (chapterAllTopicsSearchData?.topicData?.length) ?
                        <Virtuoso
                            className={"student_search_scroll_container_list_data"}
                            data={chapterAllTopicsSearchData?.topicData}
                            endReached={loadMoreTopicData}
                            overscan={20}
                            itemContent={(index, topicData) => {
                                return <TopicSearchDataComponent key={index} index={index} topic={topicData} chapterId={topicData?.chapter_id}/>
                            }}
                            components={{ Footer }}
                        />
                        :
                        <div className={"desktop_no_data_found_icon_container"}>
                            <img alt={noDataFound} src={noDataFound}/>
                        </div>
                }
            </div>
        </div>
    )
}
export const StudentSearchTopicDesktopMainBodyComponent = React.memo(StudentSearchTopicDesktopMainBodyComponentFunction);
