import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {_getIconBySubjectKey} from "../../helpers/CommonHelper";
import {FacebookLoader} from "../Loader/FacebookLoader";
import {useHistory} from "react-router-dom";
import {SELECTED_SUBJECT_DATA_SUCCESS} from "../../constants/CommonConstants";

function StudentProgressDesktopMainBodyFunction(){
    const allSubjectStudentClassSectionWise = useSelector((state) => state.allSubjectStudentClassSectionWise);
    const history = useHistory();
    const dispatch = useDispatch();
    const openSubjectChapters = (subject)=>{
        history.push(`/subject-chapters/${subject?.id}`);
        dispatch({type: SELECTED_SUBJECT_DATA_SUCCESS, payload:subject});
    }

    return (
        <div className={"student_dash_all_courses_main_section"}>
            <div className={"student_dash_heading"}>Your courses</div>
            {(allSubjectStudentClassSectionWise?.loading) ?
                <div className={"loader_section"}>
                    <div className={"loading_in_chapter_page_desktop"}>
                        <FacebookLoader type={"facebookStyleBigLoader"} item={4}/>
                    </div>
                </div>
                :
                <div className={"student_dash_all_courses_inner_section"}>
                    {allSubjectStudentClassSectionWise?.subjectData?.map((subject, key) => (
                        <div key={key} className={"student_dash_all_courses_inner_section_loop"}>
                            <div onClick={() => openSubjectChapters(subject)}
                                 className={"student_dash_all_courses_inner_section_loop_inner"}>
                                <div
                                    style={{background: _getIconBySubjectKey(subject?.name)?.color}}
                                    className={"icon_section"}>
                                    {_getIconBySubjectKey(subject?.name)?.icon}
                                </div>
                                <div className={"detail_section"}>
                                    <div className={"heading"}>{subject?.name}</div>
                                    <div className={"progress_bar_section"}>
                                        <div className={"progress_bar_container"}>
                                            <div className="progress_bar">
                                                {
                                                    (subject?.lesson_completed_percentage ? Math.round(subject?.lesson_completed_percentage) : 0)
                                                }%
                                                <br/>
                                                <span>Lessons</span>
                                            </div>
                                            <div
                                                style={{
                                                    backgroundImage: `conic-gradient(rgb(24 168 241) ${subject?.lesson_completed_percentage}%,
                                             rgb(242, 242, 242) ${subject?.lesson_completed_percentage}%)`
                                                }}
                                                className="progress_spinner"></div>
                                        </div>
                                        <div className={"progress_bar_container"}>
                                            <div className="progress_bar">
                                                {
                                                    (subject?.test_completed_percentage ? Math.round(subject?.test_completed_percentage) : 0)
                                                }%
                                                <br/><span>Tests</span>
                                            </div>
                                            <div
                                                style={{
                                                    backgroundImage: `conic-gradient(#ff9800 ${subject?.test_completed_percentage}%,
                                             rgb(242, 242, 242) ${subject?.test_completed_percentage}%)`
                                                }}
                                                className="progress_spinner"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}
export const StudentProgressDesktopMainBodyComponent = React.memo(StudentProgressDesktopMainBodyFunction);
