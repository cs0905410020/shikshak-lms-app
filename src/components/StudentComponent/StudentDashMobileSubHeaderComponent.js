import React from 'react';
import {_getIconBySubjectKey} from "../../helpers/CommonHelper";
import {useHistory} from "react-router-dom";

export const StudentDashMobileSubHeaderComponent = ({subjectName})=>{
    console.log(subjectName,'subjectName');
    const color = _getIconBySubjectKey(subjectName)?.color;
    const history = useHistory();
    const goBack = ()=>{
        history.goBack();
    }
    return (
        <div className={"student_app_dash_sub_header_section"} style={{background:'#f42c37'}}>
            <div className={"student_app_dash_sub_header_inner_section"}>
                <div onClick={goBack} className={"app_sub_header_welcome_text"}>
                    <svg style={{fill:'#f42c37'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.032 46.033"><path d="M8.532 18.531l8.955-8.999a2.71 2.71 0 0 0-1.54-1.653c-1.01-.418-2.177-.185-2.95.591L1.047 20.479c-1.396 1.402-1.396 3.67 0 5.073l11.949 12.01a2.71 2.71 0 0 0 2.951.592 2.72 2.72 0 0 0 1.54-1.652l-8.956-9c-2.461-2.475-2.46-6.499.001-8.971zM45.973 31.64c-1.396-5.957-5.771-14.256-18.906-16.01v-5.252a2.71 2.71 0 0 0-1.676-2.5c-.334-.138-.686-.205-1.033-.205-.705 0-1.398.276-1.917.796L10.49 20.479a3.6 3.6 0 0 0-.001 5.073l11.95 12.009a2.7 2.7 0 0 0 1.92.797 2.68 2.68 0 0 0 1.031-.205c1.012-.418 1.676-1.404 1.676-2.5V30.57c4.494.004 10.963.596 15.564 3.463.361.225.77.336 1.176.336a2.22 2.22 0 0 0 1.297-.416c.733-.524 1.077-1.438.87-2.313z"/></svg>
                </div>
            </div>
        </div>
    )
}
