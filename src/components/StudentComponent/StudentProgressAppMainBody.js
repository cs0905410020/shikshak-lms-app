import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {_getIconBySubjectKey} from "../../helpers/CommonHelper";
import {ChartComponent} from "../../helpers/chart/ChartComponent";
import {actionToGetChartDataJsProgressDataSet} from "../../actions/CommonAction";
import {FacebookLoader} from "../Loader/FacebookLoader";
import bgImage from "../../theme/image/side-panel.webp";

function StudentProgressAppMainBodyFunction(){
    const allSubjectStudentClassSectionWise = useSelector((state) => state.allSubjectStudentClassSectionWise);
    const chartDataJsProgressDataSet = useSelector((state) => state.chartDataJsProgressDataSet);
    const userInfo = useSelector((state) => state.userSignin.userInfo);
    const [selectedSubjectTab,setSelectedSubjectTab] = useState('');
    const [selectChartType,setSelectChartType] = useState('doughnut');
    const dispatch = useDispatch();

    const changeSubjectTab = (subject)=>{
        setSelectedSubjectTab(subject?.name);
        getChartDataResultBySelection(subject?.id);
    }

    const getChartDataResultBySelection = (subjectId)=>{
        dispatch(actionToGetChartDataJsProgressDataSet(subjectId,userInfo));
    }

    useEffect(()=>{
        changeSubjectTab({name:'All Subjects',id:0});
    },[])

    return (
        <div className={"student_app_main_body_container_sub_pages"} style={{ background: `url(${bgImage}) no-repeat center center / cover`, }}>
            <div className={"student_app_main_body_container_header_section"}>
                <div>Your Progress</div>
            </div>
            <div className={"student_app_main_body_container_sub_pages_inner"}>
                <div className={"all_subject_menu_container"}>
                    <div className={"all_subject_loop_section all_section "+(selectedSubjectTab === 'All Subjects' ? 'active' : '')}>
                        <div
                            onClick={()=>changeSubjectTab({name:'All Subjects',id:0})}
                            style={{background:_getIconBySubjectKey('')}} className={"icon_section"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="#4ab8a1"/><path d="M412 280l-60-64-60 127.252L172 280 52 400v10.62C98.752 472.204 172.72 512 256 512c141.384 0 256-114.616 256-256 0-44.752-11.512-86.8-31.696-123.404L412 280z" fill="#e16b5a"/><path d="M52 408c-2.048 0-4.092-.78-5.656-2.344a8 8 0 0 1 0-11.312l120-120c2.48-2.48 6.28-3.064 9.388-1.42l112.6 59.36 56.432-119.688c1.124-2.4 3.368-4.08 5.984-4.492 2.624-.424 5.268.496 7.084 2.428l51.892 55.356L480.74 112.64c1.86-4.012 6.612-5.748 10.62-3.896a8 8 0 0 1 3.896 10.62l-76 164c-1.116 2.416-3.36 4.112-5.984 4.54-2.616.408-5.288-.492-7.104-2.424l-51.948-55.424-54.98 116.604c-.924 1.976-2.628 3.484-4.7 4.176a7.99 7.99 0 0 1-6.264-.508l-114.78-60.504L57.664 405.652A7.98 7.98 0 0 1 52 408z" fill="#f5f5f5"/><circle cx="172" cy="280" r="16" fill="#e16b5a"/><use fill="#f5f5f5"/><circle cx="46.964" cy="404" r="16" fill="#e16b5a"/><use x="-125.036" y="124" fill="#f5f5f5"/><circle cx="486.96" cy="116" r="16" fill="#e16b5a"/><path d="M486.96 100c8.844 0 16 7.16 16 16s-7.156 16-16 16a16 16 0 1 1 0-32m0-8c-13.236 0-24 10.764-24 24s10.764 24 24 24 24-10.764 24-24-10.76-24-24-24h0z" fill="#f5f5f5"/><circle cx="352" cy="216" r="16" fill="#e16b5a"/><use x="180" y="-64" fill="#f5f5f5"/><defs><path id="B" d="M172 264a16 16 0 1 1 0 32 16 16 0 1 1 0-32m0-8c-13.236 0-24 10.764-24 24s10.764 24 24 24 24-10.764 24-24-10.764-24-24-24h0z"/></defs></svg>
                        </div>
                        <div className={"heading"}>All</div>
                    </div>
                    {allSubjectStudentClassSectionWise?.subjectData?.map((subject,key)=>(
                        <div
                            onClick={()=>changeSubjectTab(subject)}
                            key={key}
                            className={"all_subject_loop_section "+(selectedSubjectTab === subject?.name ? 'active' : '')}>
                            <div
                                style={{background:_getIconBySubjectKey(subject?.name)?.color}}
                                className={"icon_section"}>
                                {_getIconBySubjectKey(subject?.name)?.icon}
                            </div>
                            <div className={"heading"}>{subject?.name}</div>
                        </div>
                    ))}
                </div>
                <div className={"main_progress_bar_container_report"}>
                    <div className={"selected_sub_heading"}>
                        {selectedSubjectTab}:
                    </div>
                    {(!chartDataJsProgressDataSet?.loading) ?
                        <div className={"selected_sub_overall_heading"}>
                            <div
                                onClick={() => setSelectChartType('doughnut')}
                                className={"chart_menu_button " + (selectChartType === 'doughnut' ? 'active' : '')}>Doughnut
                            </div>
                            <div
                                onClick={() => setSelectChartType('pie')}
                                className={"chart_menu_button " + (selectChartType === 'pie' ? 'active' : '')}>Pie
                            </div>
                            <div
                                onClick={() => setSelectChartType('bar')}
                                className={"chart_menu_button " + (selectChartType === 'bar' ? 'active' : '')}>Bar
                            </div>
                            <div
                                onClick={() => setSelectChartType('line')}
                                className={"chart_menu_button " + (selectChartType === 'line' ? 'active' : '')}>Line
                            </div>
                            <div
                                onClick={() => setSelectChartType('pyramid')}
                                className={"chart_menu_button " + (selectChartType === 'pyramid' ? 'active' : '')}>Pyramid
                            </div>
                            <div
                                onClick={() => setSelectChartType('column')}
                                className={"chart_menu_button " + (selectChartType === 'column' ? 'active' : '')}>Column
                            </div>
                            <div
                                onClick={() => setSelectChartType('waterfall')}
                                className={"chart_menu_button " + (selectChartType === 'waterfall' ? 'active' : '')}>Waterfall
                            </div>
                            <div
                                onClick={() => setSelectChartType('funnel')}
                                className={"chart_menu_button " + (selectChartType === 'funnel' ? 'active' : '')}>Funnel
                            </div>
                        </div>
                        : ''
                    }
                    <div className={"selected_main_pie_chart_section_div_container"}>
                        {(chartDataJsProgressDataSet?.loading) ?
                            <div className={"loader_in_chart"}>
                               <FacebookLoader type={"appLoader"}/>
                            </div>
                            :
                            <ChartComponent chartDataSet={chartDataJsProgressDataSet?.chartData} chartType={selectChartType}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export const StudentProgressAppMainBody = React.memo(StudentProgressAppMainBodyFunction);
