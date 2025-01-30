import React from "react";
import {useSelector} from "react-redux";
import {FacebookLoader} from "../Loader/FacebookLoader";
import {useHistory} from "react-router-dom";
import noDataFound from "../../theme/image/no-data-found-desktop.png";

function SubjectAllSubjectTopicDataBodyComponentFunction({subjectName}){
    const gradeSubjectChapterData = useSelector((state) => state.gradeSubjectChapterData);
    const history = useHistory();
    const path = '/dashboard/home';

    const openChaptersTopics = (chapter)=>{
        history.push(`${path}/subject-chapters/${chapter?.id}`);
    }

    return (
        <div className={"subject_chapter_main_container_section"}>
            <div className={"subject_chapter_main_container_inner_section"}>
                {(gradeSubjectChapterData?.loading) ?
                    <div className={"loader_section"}>
                        <div className={"loading_in_chapter_page_desktop"}>
                            <FacebookLoader type={"facebookStyleBigLoader"} item={4}/>
                        </div>
                    </div>
                    :
                    (gradeSubjectChapterData?.chapterData?.length) ?
                        gradeSubjectChapterData?.chapterData?.map((chapter,key)=>(
                        <div key={key} className={"chapter_section_loop_area_main_section"}>
                            <div className={"chapter_section_loop_area_inner_section"}>
                                <div className={"col-2 chapter_icon_section_col"}>
                                    <div className={"chapter_icon_section"}>
                                        <img
                                            src={chapter?.icon ? chapter?.icon : 'https://stemcity.s3.ap-southeast-2.amazonaws.com/products/steam-park-8.png'}
                                            alt={"chapter?.icon"}/>
                                    </div>
                                </div>
                                <div className={"col-7"}>
                                    <div className={"chapter_name_section"}>
                                        <div className={"subject_name"}>{subjectName}</div>
                                        <div className={"chapter_name"}>{chapter?.name}</div>
                                        <div className={"chapter_total_videos"}>{chapter?.total_topics ? chapter?.total_topics : 0} Topics</div>
                                    </div>
                                </div>
                                <div className={"col-3"}>
                                    <div className={"topics_inner_section"}>
                                        <button onClick={()=>openChaptersTopics(chapter)}>View Topics</button>
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
export const SubjectAllSubjectTopicDataBodyComponent = React.memo(SubjectAllSubjectTopicDataBodyComponentFunction);
