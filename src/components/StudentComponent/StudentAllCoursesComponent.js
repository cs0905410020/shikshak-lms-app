import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {_getClassFormat, _getIconBySubjectKey} from "../../helpers/CommonHelper";
import {FacebookLoader} from "../Loader/FacebookLoader";
import {useHistory} from "react-router-dom";
import {StudentDashHeaderComponent} from "./StudentDashHeaderComponent";
import {actionToGetAllStudentClassDataByClassSectionId} from "../../actions/CommonAction";
import noDataFound from "../../theme/image/no-data-found-desktop.png";

function StudentAllCoursesComponentFunction(){
    const allClassStandardGradesData = useSelector((state) => state.allClassStandardGradesData);
    const history = useHistory();
    const [teacherClassData,setTeacherClassData] = useState(null);
    const path = '/dashboard/home';

    useEffect(()=>{
        if(allClassStandardGradesData?.gradesData?.length){
            setTeacherClassData(allClassStandardGradesData?.gradesData[0]);
        }
    },[allClassStandardGradesData])

    const callFunctionToGetClassData = (classData)=>{
        setTeacherClassData(classData);
    }

    const openSubjectChapters = (subject)=>{
        history.push(`${path}/subject-chapters/${subject?.id}`);
    }

    return (
        <div className={"main_body_content_section all_student_subject_main_container"}>
            <StudentDashHeaderComponent type={"StudentAllCoursesComponent"}/>
            <div className={"student_dash_all_courses_main_section"}>
                <div className={"student_dash_heading"}>Classes</div>
                {(allClassStandardGradesData?.loading) ?
                    <div className={"loader_section"}>
                        <div className={"loading_in_chapter_page_desktop"}>
                            <FacebookLoader type={"facebookStyleBigLoader"} item={4}/>
                        </div>
                    </div>
                    :
                    <div className={"all_teacher_classes_and_subject_data_main_container"}>
                        <div className={"all_teacher_class_menu"}>
                            {allClassStandardGradesData?.gradesData?.map((gradesData, key) => (
                                <div key={key}
                                     onClick={() => callFunctionToGetClassData(gradesData)}
                                     className={"all_teacher_class_menu_loop"}>
                                    <div className={"grade_name"}>{gradesData?.name}</div>
                                    <div className={"grade_name_img"}>
                                        <img alt={"img"} src={gradesData?.photo}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={"all_teacher_subject_data_container"}>
                            <div className={"student_dash_heading"}>Subjects</div>
                            {(teacherClassData?.subjects?.length) ?
                                <div className={"student_dash_all_courses_inner_section"}>
                                    {teacherClassData?.subjects?.map((subject, key) => (
                                        <div key={key} className={"student_dash_all_courses_inner_section_loop"}>
                                            <div onClick={() => openSubjectChapters(subject)}
                                                 className={"student_dash_all_courses_inner_section_loop_inner class_detail"}>
                                                <div className={"icon_section"}>
                                                    <img alt={'subject?.photo'}
                                                         src={subject?.photo ? subject?.photo : 'https://stemcity.s3.ap-southeast-2.amazonaws.com/subject/hindi.jpg'}/>
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

export const StudentAllCoursesComponent = React.memo(StudentAllCoursesComponentFunction);
