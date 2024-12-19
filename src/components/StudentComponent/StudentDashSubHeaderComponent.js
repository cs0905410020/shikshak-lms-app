import React from 'react';
import {useHistory} from "react-router-dom";
import {_getUserIconByKey} from "../../helpers/CommonHelper";
import {useDispatch, useSelector} from "react-redux";
import {actionToSetUserProfileInEditMode} from "../../actions/CommonAction";

export const StudentDashSubHeaderComponent = ({pageName,subjectName})=>{
    const history = useHistory();
    const {userInfo} = useSelector((state) => state.userSignin);
    const userProfileInEditMode = useSelector((state) => state.userProfileInEditMode);
    const dispatch = useDispatch();
    const goBack = ()=>{
        history.goBack();
    }
    const userInEditMode = ()=>{
        dispatch(actionToSetUserProfileInEditMode(!userProfileInEditMode));
    }
    const getBreadcrumData = (type)=>{
        switch (type){
            case 'subject-chapters':
            case 'profile-page':
                return  (
                    <div className={"breadcrumb_section"}>
                       <div onClick={goBack}>Back</div> <div>{'>'}</div> <div className={"main_link"}>{subjectName}</div>
                    </div>
                )
        }
    }
    return (
        <div className={"student_dash_header_section"}>
            <div className={"student_dash_header_inner_section"}>
                <div className={"header_welcome_text"}>
                    {getBreadcrumData(pageName)}
                    <div className={"header_main_text_heading_subject"}>{subjectName}</div>
                </div>
                    <div className={"header_profile_right_side_panel"}>
                        {(pageName === 'profile-page') ?
                            <div onClick={userInEditMode} className={"profile_edit_save_button"}>
                                {(!userProfileInEditMode) ?
                                    <div>Edit</div>
                                    :
                                    <div>Exit</div>
                                }
                            </div>:''
                        }
                    </div>
            </div>
        </div>
    )
}