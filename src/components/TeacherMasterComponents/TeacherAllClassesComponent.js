import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {_getClassFormat, _getIconBySubjectKey} from "../../helpers/CommonHelper";
import {FacebookLoader} from "../Loader/FacebookLoader";
import {useHistory} from "react-router-dom";
import {StudentDashHeaderComponent} from "../StudentComponent/StudentDashHeaderComponent";
import noDataFound from "../../theme/image/no-data-found-desktop.png";

function TeacherAllClassesComponentFunction(){
    const teacherAllClassesData = useSelector((state) => state.teacherAllClassesData);
    const [teacherClassData,setTeacherClassData] = useState(teacherAllClassesData?.classData[3]);
    const history = useHistory();
    const path = '/dashboard/home';

    useEffect(()=>{
       if(teacherAllClassesData?.classData?.length){
           setTeacherClassData(teacherAllClassesData?.classData[0]);
       }
    },[teacherAllClassesData])

    const openSubjectChapters = (subject)=>{
        history.push(`${path}/subject-chapters/${subject?.id}`);
    }

    const callFunctionToGetClassData = (classData)=>{
        setTeacherClassData(classData);
    }

    return (
        <div className={"main_body_content_section all_student_subject_main_container"}>
            <StudentDashHeaderComponent type={"StudentAllCoursesComponent"}/>
            <div className={"student_dash_all_courses_main_section"}>
                <div className={"student_dash_heading"}>Classes with subjects</div>
                {(teacherAllClassesData?.loading) ?
                    <div className={"loader_section"}>
                        <div className={"loading_in_chapter_page_desktop"}>
                            <FacebookLoader type={"facebookStyleBigLoader"} item={4}/>
                        </div>
                    </div>
                    :
                    <div className={"all_teacher_classes_and_subject_data_main_container"}>
                        <div className={"all_teacher_class_menu"}>
                            {teacherAllClassesData?.classData?.map((classes,index)=>(
                                <div key={index}
                                     onClick={()=>callFunctionToGetClassData(classes)}
                                     className={"all_teacher_class_menu_loop "+(teacherClassData?.standard === classes?.standard ? 'active' : '')}>
                                    Class {_getClassFormat(classes?.standard)}
                                </div>
                            ))}
                        </div>
                        <div className={"all_teacher_subject_data_container"}>
                            {(teacherClassData?.class_data) ?
                                <div className={"student_dash_all_courses_inner_section"}>
                                    {teacherClassData?.class_data?.map((subject, key) => (
                                        <div key={key} className={"student_dash_all_courses_inner_section_loop"}>
                                            <div onClick={() => openSubjectChapters(subject)}
                                                 className={"student_dash_all_courses_inner_section_loop_inner class_detail"}>
                                                <div
                                                    style={{background: _getIconBySubjectKey(subject?.name)?.color}}
                                                    className={"icon_section"}>
                                                    {_getIconBySubjectKey(subject?.name)?.icon}
                                                </div>
                                                <div className={"detail_section"}>
                                                    <div className={"heading"}>{subject?.name}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                :
                                <div className={"desktop_no_data_found_icon_container"}>
                                    <img alt={noDataFound} src={noDataFound}/>
                                </div>
                            }
                        </div>
                    </div>

                }
            </div>
        </div>
    )
}
export const TeacherAllClassesComponent = React.memo(TeacherAllClassesComponentFunction);
