import React from "react";
import {useSelector} from "react-redux";
import {FacebookLoader} from "../Loader/FacebookLoader";
import {useHistory} from "react-router-dom";
import noDataFound from "../../theme/image/no-data-found-mobile.png";

function SubjectAllChapterMobileDataBodyComponentFunction(){
    const subjectAllChapterData = useSelector((state) => state.subjectAllChapterData);
    const history = useHistory();
    const openChaptersTopics = (chapter)=>{
        history.push(`/dashboard/home/chapter-topics/${chapter?.id}`);
    }
    return (
        <div className={"subject_chapter_mobile_main_container_section"}>
            <div className={"chapter_heading_section"}>Chapters</div>
            <div className={"subject_chapter_mobile_chapters_main_container"}>
            {(subjectAllChapterData?.loading) ?
                <div className={"loader_section"}>
                    <div className={"loading_in_chapter_list_page_mobile"}>
                        <FacebookLoader type={"facebookStyleMobileLoader"} item={8}/>
                    </div>
                </div>
                :
                (subjectAllChapterData?.chapterData?.length) ?
                    subjectAllChapterData?.chapterData?.map((chapter,key)=>(
                        <div key={key} onClick={() => openChaptersTopics(chapter)}
                             className={"subject_chapter_mobile_chapters_loop"}>
                            <div className={"col-2 icon_section"}>
                                <div className={"chapter_icon_section"}>
                                    <img
                                        src={chapter?.icon ? chapter?.icon : 'https://stemcity.s3.ap-southeast-2.amazonaws.com/products/save-electricity-kit-58-0.8274624174228714.webp'}
                                        alt={"chapter?.icon"}/>
                                </div>
                            </div>
                            <div className={"col-7 text_section"}>
                                <div className={"chapter_name"}>{chapter?.name}</div>
                                <div
                                    className={"chapter_total_videos"}>{chapter?.total_topics ? chapter?.total_topics : 0} Topics
                                </div>
                            </div>
                            <div className={"col-3"}>
                                <div className={"topics_inner_section"}>
                                    <button onClick={() => openChaptersTopics(chapter)}>View Topics</button>
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

export const SubjectAllChapterMobileDataBodyComponent = React.memo(SubjectAllChapterMobileDataBodyComponentFunction);
