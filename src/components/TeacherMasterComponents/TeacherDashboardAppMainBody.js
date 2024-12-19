import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {_getClassFormat, _getIconBySubjectKey} from "../../helpers/CommonHelper";
import {FacebookLoader} from "../Loader/FacebookLoader";
import {useHistory} from "react-router-dom";
import noDataFound from "../../theme/image/no-data-found-mobile.png";

function TeacherDashboardAppMainBodyFunction(){
    const teacherAllClassesData = useSelector((state) => state.teacherAllClassesData);
    const [teacherClassData,setTeacherClassData] = useState(teacherAllClassesData?.classData[0]);
    const history = useHistory();
    const path = '/dashboard/home';

    useEffect(()=>{
        if(teacherAllClassesData?.classData?.length){
            setTeacherClassData(teacherAllClassesData?.classData[0]);
        }
    },[teacherAllClassesData])

    const openSubjectChapters = (subject)=>{
        console.log(subject)
        history.push(`${path}/subject-chapters/${subject?.id}`);
    }
    const goToThePage = (type)=>{
        history.push(type);
    }
    const callFunctionToGetClassData = (classData)=>{
        setTeacherClassData(classData);
    }
    return (
        <div className={"student_app_dashboard_app_main_body_container"}>
            <div className={"header_sudo_search_section_main_container"}>
                <div onClick={()=>goToThePage(`/dashboard/student-search-topic-page`)} className={"header_sudo_search_section"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 487.95 487.95"><path d="M481.8 453l-140-140.1c27.6-33.1 44.2-75.4 44.2-121.6C386 85.9 299.5.2 193.1.2S0 86 0 191.4s86.5 191.1 192.9 191.1c45.2 0 86.8-15.5 119.8-41.4l140.5 140.5c8.2 8.2 20.4 8.2 28.6 0s8.2-20.4 0-28.6zM41 191.4c0-82.8 68.2-150.1 151.9-150.1s151.9 67.3 151.9 150.1-68.2 150.1-151.9 150.1S41 274.1 41 191.4z"></path></svg>
                    Search for any topic
                </div>
            </div>
            <div className={"student_app_dashboard_app_main_body_inner_section"}>
                <div className={"app_inner_tab_main_section_container teacher_classes"}>
                    <div className={"app_inner_tab_heading_courses"}>Classes</div>
                    <div className={"app_inner_tab_main_section_tabs"}>
                        {(teacherAllClassesData?.loading) ?
                            <div className={"loader_section"}>
                                <FacebookLoader type={"appLoader"}/>
                            </div>
                            :
                          (teacherAllClassesData?.classData?.length ?
                            (teacherAllClassesData?.classData?.map((classes,index)=>(
                                <div key={index}
                                     onClick={()=>callFunctionToGetClassData(classes)}
                                     className={"all_teacher_class_menu_loop "+(teacherClassData?.standard === classes?.standard ? 'active' : '')}>
                                    Class {_getClassFormat(classes?.standard)}
                                </div>
                             )))
                           :
                            <div className={"desktop_no_data_found_icon_container"}>
                                <img alt={noDataFound} src={noDataFound}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={"student_app_dashboard_app_main_body_inner_section"}>
                <div className={"app_inner_tab_main_section_container"}>
                    <div className={"app_inner_tab_heading_courses"}>Subjects</div>
                    <div className={"app_inner_tab_main_section_tabs"}>
                        {(teacherAllClassesData?.loading) ?
                            <div className={"loader_section"}>
                                <FacebookLoader type={"appLoader"}/>
                            </div>
                            :
                          teacherClassData?.class_data ?
                              (teacherClassData?.class_data?.map((subject,key)=>(
                                <div key={key} style={{background:_getIconBySubjectKey(subject?.name)?.color}}
                                     onClick={()=>openSubjectChapters(subject)}
                                     className={"course_tabs_in_app_panel_loop"}>
                                    <div className={"course_tabs_in_app_panel_loop_inner"}>
                                        <div className={"icon_section"}>
                                            {_getIconBySubjectKey(subject?.name)?.icon}
                                            <br/>
                                            <div className={"heading"}>{subject?.name}</div>
                                        </div>
                                    </div>
                                </div>
                            )))
                           :
                          <div className={"desktop_no_data_found_icon_container"}>
                              <img alt={noDataFound} src={noDataFound}/>
                          </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export const TeacherDashboardAppMainBody = React.memo(TeacherDashboardAppMainBodyFunction);
