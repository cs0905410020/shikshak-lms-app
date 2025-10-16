import React from "react";
import {useSelector} from "react-redux";
import {FacebookLoader} from "../Loader/FacebookLoader";
import {useHistory} from "react-router-dom";
import noDataFound from "../../theme/image/no-data-found-desktop.png";

function SubjectAllChapterDataBodyComponentFunction({subjectName}){
    const subjectAllChapterData = useSelector((state) => state.subjectAllChapterData);
    const history = useHistory();

    const openChaptersTopics = (chapter)=>{
        history.push(`/dashboard/home/chapter-topics/${chapter?.id}`);
    }

    return (
        <div className={"subject_chapter_main_container_section"}>
            <div className={"subject_chapter_main_container_inner_section"}>
                {(subjectAllChapterData?.loading) ?
                    <div className={"loader_section"}>
                        <div className={"loading_in_chapter_page_desktop"}>
                            <FacebookLoader type={"facebookStyleBigLoader"} item={4}/>
                        </div>
                    </div>
                    :
                    (subjectAllChapterData?.chapterData?.length) ?
                    subjectAllChapterData?.chapterData?.map((chapter,key)=>(
                        <div key={key} className={"chapter_section_loop_area_main_section"}>
                            <div className={"chapter_section_loop_area_inner_section"}>
                                <div className={"col-2 chapter_icon_section_col"}>
                                    <div className={"chapter_icon_section"}>
                                        <img
                                            src={chapter?.icon ? chapter?.icon : 'https://stemcity.s3.ap-southeast-2.amazonaws.com/products/save-electricity-kit-58-0.8274624174228714.webp'}
                                            alt={"chapter?.icon"}/>
                                    </div>
                                </div>
                                <div className={"col-7"}>
                                    <div className={"chapter_name_section"}>
                                        <div className={"subject_name"}>{subjectName}</div>
                                        <div className={"chapter_name"}>{chapter?.name}</div>
                                        <div className={"chapter_description"}>{chapter?.description}</div>
                                        <div className={"chapter_total_videos"}>{chapter?.total_topics ? chapter?.total_topics : 0} Topics</div>
                                    </div>
                                </div>
                                <div className={"col-3"}>
                                    <div className={"topics_inner_section"}>
                                        <button onClick={()=>openChaptersTopics(chapter)}>View Curriculum</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    <div className={"desktop_no_data_found_icon_container"}>
                       <img alt={"noDataFound"} src={noDataFound}/>
                    </div>
                }
            </div>
        </div>
    )
}
export const SubjectAllChapterDataBodyComponent = React.memo(SubjectAllChapterDataBodyComponentFunction);
