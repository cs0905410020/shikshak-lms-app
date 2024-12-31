import React, {useEffect} from 'react';
import {_getIconBySubjectKey} from "../../helpers/CommonHelper";
import {useHistory} from "react-router-dom";
import {Capacitor} from "@capacitor/core";
import {StatusBar} from "@capacitor/status-bar";

export const StudentDashMobileSubSecondHeaderComponent = ({subjectName,pageName})=>{
    const color = _getIconBySubjectKey(subjectName)?.color;
    const icon = _getIconBySubjectKey(subjectName)?.icon;
    const history = useHistory();
    const goBack = ()=>{
        history.goBack();
    }
    useEffect(()=>{
        if (Capacitor.isNativePlatform()) {
            StatusBar?.setOverlaysWebView({overlay: false});
            StatusBar?.setBackgroundColor({color: color});
        }
    },[color])
    const getBreadcrumData = (type)=>{
        switch (type){
            case 'subject-chapters':
                return  (
                    <div className={"breadcrumb_section"}>
                        <div onClick={goBack}>Dashboard</div> <div>{'>'}</div> <div className={"main_link"}>{subjectName}</div>
                    </div>
                )
            case 'chapter-mobile-topics':
                return  (
                  <></>
                )

        }
    }
    return (
        <div className={"app_main_sub_header_container"} style={{background:'#f42c37'}}>
            <div className={"app_sub_header_welcome_text"}>
                {getBreadcrumData(pageName)}
                <div className={"app_sub_header_main_text_heading_subject "+pageName}>{subjectName}</div>
            </div>
            <div className={"icon_section"}>
                {icon}
            </div>
        </div>
    )
}
