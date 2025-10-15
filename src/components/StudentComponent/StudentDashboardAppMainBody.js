import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {_getClassFormat, _getIconBySubjectKey} from "../../helpers/CommonHelper";
import {FacebookLoader} from "../Loader/FacebookLoader";
import {useHistory} from "react-router-dom";

import noDataFound from "../../theme/image/no-data-found-mobile.png";
import bgImage from "../../theme/image/side-panel.webp";

function StudentDashboardAppMainBodyFunction(){
    const allClassStandardGradesData = useSelector((state) => state.allClassStandardGradesData);
    const [teacherClassData,setTeacherClassData] = useState(null);
    const history = useHistory();
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
        history.push(`${path}/grade-subject/${subject?.id}/${teacherClassData?.id}`);
    }
    const goToThePage = (type)=>{
        history.push(type);
    }
    return (
        <div className={"student_app_dashboard_app_main_body_container"} style={{ background: `url(${bgImage}) no-repeat center center / cover`, }} >
            <div className={"header_sudo_search_section_main_container"}>
                <div onClick={() => goToThePage(`/dashboard/student-search-topic-page`)}
                     className={"header_sudo_search_section"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 487.95 487.95">
                        <path
                            d="M481.8 453l-140-140.1c27.6-33.1 44.2-75.4 44.2-121.6C386 85.9 299.5.2 193.1.2S0 86 0 191.4s86.5 191.1 192.9 191.1c45.2 0 86.8-15.5 119.8-41.4l140.5 140.5c8.2 8.2 20.4 8.2 28.6 0s8.2-20.4 0-28.6zM41 191.4c0-82.8 68.2-150.1 151.9-150.1s151.9 67.3 151.9 150.1-68.2 150.1-151.9 150.1S41 274.1 41 191.4z"></path>
                    </svg>
                    Search for any topic
                </div>
            </div>
            <div className={"student_app_dashboard_app_main_body_inner_section"}>
                <div className={"app_inner_tab_main_section_container"}>
                    <div className={"app_inner_tab_heading_courses"}>Classes</div>
                    <div className={"app_inner_tab_main_section_tabs"}>
                        {(allClassStandardGradesData?.loading) ?
                            <div className={"loader_section"}>
                                <FacebookLoader type={"appLoader"}/>
                            </div>
                            : allClassStandardGradesData?.gradesData?.map((gradesData, key) => (
                                <div key={key}
                                     onClick={() => callFunctionToGetClassData(gradesData)}
                                     className={`all_teacher_class_menu_loop${teacherClassData?.id === gradesData?.id ? ' active' : ''}`}>
                                    {/*<div className={"grade_name"}>{gradesData?.name}</div>*/}
                                    <div className={"grade_name_img"}>
                                      <img alt={"img"} src={gradesData?.photo}/>
                                    </div>
                                    {/*<div className={"course_tabs_in_app_panel_loop_inner"}>*/}
                                    {/*    <div className={"icon_section"}>*/}
                                    {/*        {_getIconBySubjectKey(subject?.name)?.icon}*/}
                                    {/*        <br/>*/}
                                    {/*        <div className={"heading"}>{subject?.name}</div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    {/*<div className={"course_tabs_in_app_detail_section"}>*/}
                                    {/*    <div className={"progress_bar_section"}>*/}
                                    {/*        <div className={"progress_bar_container"}>*/}
                                    {/*            <div className="progress_bar">*/}
                                    {/*                {*/}
                                    {/*                    (subject?.lesson_completed_percentage ? Math.round(subject?.lesson_completed_percentage) : 0)*/}
                                    {/*                }%*/}
                                    {/*                <br/>*/}
                                    {/*                <span>Lessons</span>*/}
                                    {/*            </div>*/}
                                    {/*            <div*/}
                                    {/*                style={{backgroundImage: `conic-gradient(rgb(24 168 241) ${subject?.lesson_completed_percentage}%,*/}
                                    {/*         rgb(242, 242, 242) ${subject?.lesson_completed_percentage}%)`}}*/}
                                    {/*                className="progress_spinner"></div>*/}
                                    {/*        </div>*/}
                                    {/*        <div className={"progress_bar_container"}>*/}
                                    {/*            <div className="progress_bar">*/}
                                    {/*                {*/}
                                    {/*                    (subject?.test_completed_percentage ? Math.round(subject?.test_completed_percentage) : 0)*/}
                                    {/*                }%*/}
                                    {/*                <br/><span>Tests</span>*/}
                                    {/*            </div>*/}
                                    {/*            <div*/}
                                    {/*                style={{backgroundImage: `conic-gradient(#ff9800 ${subject?.test_completed_percentage}%,*/}
                                    {/*         rgb(242, 242, 242) ${subject?.test_completed_percentage}%)`}}*/}
                                    {/*                className="progress_spinner"></div>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*    <div className={"heading_progress"}>Progress</div>*/}
                                    {/*</div>*/}
                                </div>
                            ))
                        }
                    </div>

                    <div className={"student_app_dashboard_app_main_body_inner_section"}>
                        <div className={"app_inner_tab_main_section_container_subject"}>
                            <div className={"app_inner_tab_heading_courses"}>Subjects</div>
                            <div className={"app_inner_tab_main_section_tabs"}>
                                {(allClassStandardGradesData?.loading) ?
                                    <div className={"loader_section"}>
                                        <FacebookLoader type={"appLoader"}/>
                                    </div>
                                    :
                                    teacherClassData?.subjects ?
                                        (teacherClassData?.subjects?.map((subject, key) => (
                                            <div key={key}
                                                 style={{background: _getIconBySubjectKey(subject?.name)?.color}}
                                                 onClick={() => openSubjectChapters(subject)}
                                                 className={"course_tabs_in_app_panel_loop"}>
                                                <div className={"course_tabs_in_app_panel_loop_inner"}>
                                                    <div className={"icon_section"}>
                                                        <img alt={'subject?.photo'} src={subject?.photo ? subject?.photo : 'https://stemcity.s3.ap-southeast-2.amazonaws.com/subject/hindi.jpg'}/>
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

                    {/*<div className={"app_inner_tab_heading_courses"}>Popular Courses</div>*/}
                    {/*<div className={"popular_courses_main_section"}>*/}
                    {/*    <div className={"popular_courses_main_section_inner_loop"}>*/}
                    {/*        <div className={"popular_course_icon_mg_section"}>*/}
                    {/*            <img src={popularCourse2}/>*/}
                    {/*        </div>*/}
                    {/*        <div className={"popular_course_text_section"}>*/}
                    {/*            <p className={"popular_courses_main_section_heading_tab"}>*/}
                    {/*                Where we use physics in our daily life?*/}
                    {/*            </p>*/}
                    {/*            <p className={"popular_courses_main_section_lesson_tab"}>*/}
                    {/*                5 Lessons*/}
                    {/*            </p>*/}
                    {/*            <p className={"popular_courses_main_section_quick_click_tab"}>*/}
                    {/*                Click to explore*/}
                    {/*            </p>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className={"popular_courses_main_section_inner_loop"}>*/}
                    {/*        <div className={"popular_course_icon_mg_section"}>*/}
                    {/*            <img src={popularCourse1}/>*/}
                    {/*        </div>*/}
                    {/*        <div className={"popular_course_text_section"}>*/}
                    {/*            <p className={"popular_courses_main_section_heading_tab"}>*/}
                    {/*                How they do that?*/}
                    {/*            </p>*/}
                    {/*            <p className={"popular_courses_main_section_lesson_tab"}>*/}
                    {/*                24 Lessons*/}
                    {/*            </p>*/}
                    {/*            <p className={"popular_courses_main_section_quick_click_tab"}>*/}
                    {/*                Click to explore*/}
                    {/*            </p>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className={"app_inner_tab_heading_courses"}>Speak to us</div>
                    <div className={"speak_to_us_main_section"}>
                        <div className={"speak_to_us_inner_section"}>
                            <div className={"col-4 speak_to_us_inner_section_col_1"}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path
                                        d="M512 256.006C512 397.402 397.394 512.004 256.004 512 114.606 512.004 0 397.402 0 256.006-.007 114.61 114.606 0 256.004 0 397.394 0 512 114.614 512 256.006z"
                                        fill="#4fc0e8"/>
                                    <path
                                        d="M511.675 268.88l-.538-.538-132.993-132.993C346.976 103.798 303.748 84.187 256 84.187c-94.737 0-171.813 77.076-171.813 171.813 0 47.748 19.612 90.975 51.164 122.144l132.992 132.993.539.539c131.14-6.494 236.298-111.651 242.793-242.796z"
                                        fill="#3daed9"/>
                                    <path
                                        d="M256 323.231c-8.257 0-14.94 6.695-14.94 14.941 0 8.257 6.683 14.94 14.94 14.94 8.244 0 14.94-6.683 14.94-14.94 0-8.245-6.696-14.941-14.94-14.941zm0-239.044c-94.737 0-171.813 77.076-171.813 171.813S161.263 427.813 256 427.813 427.813 350.737 427.813 256 350.737 84.187 256 84.187zm0 328.686c-86.501 0-156.873-70.371-156.873-156.873S169.499 99.127 256 99.127 412.873 169.499 412.873 256 342.501 412.873 256 412.873zm0-261.454c-26.773 0-48.556 22.341-48.556 49.799a7.47 7.47 0 1 0 14.94 0c0-19.222 15.078-34.86 33.616-34.86s33.616 15.265 33.616 34.031c0 18.128-15.71 34.028-33.616 34.028a7.47 7.47 0 0 0-7.47 7.47v43.993a7.47 7.47 0 0 0 7.47 7.47c4.125 0 7.47-3.345 7.47-7.47v-37.129c22.925-3.749 41.086-24.372 41.086-48.363 0-27-21.783-48.969-48.556-48.969z"
                                        fill="#f4f6f9"/>
                                </svg>
                            </div>
                            <div className={"col-8 speak_to_us_inner_section_col_2"}>
                                <p className={"have_query_section_heading"}>
                                    Have Queries
                                </p>
                                <p className={"have_query_section_sub_heading"}>
                                    Talk to your academic counsellor
                                </p>
                                <button type={"button"} className={"call_now_button_section"}>Call Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export const StudentDashboardAppMainBody = React.memo(StudentDashboardAppMainBodyFunction);
