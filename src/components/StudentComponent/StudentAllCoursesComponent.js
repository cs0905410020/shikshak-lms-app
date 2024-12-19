import React,{useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {_getIconBySubjectKey} from "../../helpers/CommonHelper";
import {FacebookLoader} from "../Loader/FacebookLoader";
import {useHistory} from "react-router-dom";
import {StudentDashHeaderComponent} from "./StudentDashHeaderComponent";
import {actionToGetAllStudentClassDataByClassSectionId} from "../../actions/CommonAction";

function StudentAllCoursesComponentFunction(){
    const allSubjectStudentClassSectionWise = useSelector((state) => state.allSubjectStudentClassSectionWise);
    const history = useHistory();
    const path = '/dashboard/home';

    const userInfo = useSelector((state) => state.userSignin.userInfo);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(actionToGetAllStudentClassDataByClassSectionId(userInfo?.class_standard_id));
    },[])

    const openSubjectChapters = (subject)=>{
        history.push(`${path}/subject-chapters/${subject?.id}`);
    }

    return (
        <div className={"main_body_content_section all_student_subject_main_container"}>
            <StudentDashHeaderComponent type={"StudentAllCoursesComponent"}/>
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
        </div>
    )
}
export const StudentAllCoursesComponent = React.memo(StudentAllCoursesComponentFunction);
