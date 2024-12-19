import React, {useEffect, useState} from "react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {_readableTimeFromSeconds} from "../../helpers/CommonHelper";
import noDataFound from "../../theme/image/no-data-found-mobile.png";
import {useDispatch, useSelector} from "react-redux";
import {FacebookLoader} from "../Loader/FacebookLoader";
import {
    actionToGetChapterAllTopicDataBySearchData,
    actionToGetChapterAllTopicDataBySearchDataLoadMore,
    actionToGetSubjectAllChapterDataById,
    actionToGetSubjectDataBySubjectId,
    actionToSetTopicDataById
} from "../../actions/CommonAction";
import { Virtuoso } from 'react-virtuoso'
import {useHistory} from "react-router-dom";

let typingTimer = null;
let limitData = 10;
let limitOffset = 0;
export const StudentSearchTopicMainBody = ({search})=>{
    const chapterAllTopicsSearchData = useSelector((state) => state.chapterAllTopicsSearchData);
    const [searchText,setSearchText] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if(search) {
            dispatch(actionToGetChapterAllTopicDataBySearchData(search,limitData,limitOffset));
            limitOffset = limitOffset+limitData;
        }
    }, [search]);

    const goBack = ()=>{
        history.goBack();
    }
    const goToPage = (type)=>{
        history.push(type);
    }
    const openVideoInVideoPanel = (topic,chapterId)=>{
        goToPage(`/dashboard/home/chapter-topics-video/${chapterId}/${topic?.id}`);
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
            <div key={index}
                 onClick={()=>openVideoInVideoPanel(topic,topic?.chapter_id)}
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
                <div className='search_page_student_input_section'>
                    <div onClick={goBack} className="app_sub_header_welcome_text">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 46.032 46.033"
                             style={{fill: "#79d1fe"}}><path d="M8.532 18.531l8.955-8.999a2.71 2.71 0 0 0-1.54-1.653c-1.01-.418-2.177-.185-2.95.591L1.047 20.479c-1.396 1.402-1.396 3.67 0 5.073l11.949 12.01a2.71 2.71 0 0 0 2.951.592 2.72 2.72 0 0 0 1.54-1.652l-8.956-9c-2.461-2.475-2.46-6.499.001-8.971zM45.973 31.64c-1.396-5.957-5.771-14.256-18.906-16.01v-5.252a2.71 2.71 0 0 0-1.676-2.5c-.334-.138-.686-.205-1.033-.205-.705 0-1.398.276-1.917.796L10.49 20.479a3.6 3.6 0 0 0-.001 5.073l11.95 12.009a2.7 2.7 0 0 0 1.92.797 2.68 2.68 0 0 0 1.031-.205c1.012-.418 1.676-1.404 1.676-2.5V30.57c4.494.004 10.963.596 15.564 3.463.361.225.77.336 1.176.336a2.22 2.22 0 0 0 1.297-.416c.733-.524 1.077-1.438.87-2.313z"></path>
                        </svg>
                    </div>
                    <div className={"app_search_input_section"}>
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
                </div>
                <div className={"student_app_main_body_container_header_section"}>
                    <div>Top Search Results:</div>
                </div>
                <div className={"subject_chapter_mobile_chapters_main_container"}>
                    {(chapterAllTopicsSearchData?.loading) ?
                        <div className={"loader_section"}>
                            <div className={"loading_in_chapter_list_page_mobile"}>
                                <FacebookLoader type={"facebookStyleMobileLoader"} item={10}/>
                            </div>
                        </div>
                        :
                        (chapterAllTopicsSearchData?.topicData?.length) ?

                            <div className={"student_search_scroll_container"}>
                                <Virtuoso
                                    className={"student_search_scroll_container_list_data"}
                                    data={chapterAllTopicsSearchData?.topicData}
                                    endReached={loadMoreTopicData}
                                    overscan={20}
                                    itemContent={(index, topicData) => {
                                        return <TopicSearchDataComponent key={index} index={index} topic={topicData}/>
                                    }}
                                    components={{ Footer }}
                                />
                            </div>
                            :<div className={"mobile_no_data_found_icon_container"}>
                                <img alt={'noDataFound'} src={noDataFound}/>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}