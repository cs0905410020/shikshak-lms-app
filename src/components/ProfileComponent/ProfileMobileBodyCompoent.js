import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {_getFormatByFormatType, _getUserIconByKey, _userSchoolAvatarObject} from "../../helpers/CommonHelper";
import {
    actionToChangeUserVoiceAssistantSelection,
    actionToUpdateUserProfileData,
    signout
} from "../../actions/CommonAction";
import {IonAlert} from "@ionic/react";
import harry from "../../theme/image/avatar/harry.png";
import minion from "../../theme/image/avatar/minion.png";
import alien from "../../theme/image/avatar/alien.png";
import akuaku from "../../theme/image/avatar/akuaku.png";
import horror from "../../theme/image/avatar/horror.png";
import useAuth from "../../hooks/useAuth";
import bgImage from "../../theme/image/side-panel.webp";

function ProfileMobileBodyComponentFunction(){
    const userVoiceAssistantSelection = useSelector((state) => state.userVoiceAssistantSelection);
    const userInfo = useSelector((state) => state.userSignin.userInfo);
    const [name,setName] = useState(userInfo?.name);
    const [email,setEmail] = useState(userInfo?.email);
    const [avatar,setAvatar] = useState(userInfo?.avatar);
    const [mobile,setMobile] = useState(userInfo?.mobile);
    const [address,setAddress] = useState(userInfo?.address);
    const [gender,setGender] = useState(userInfo?.gender);
    const [chooseIconDiv,setChooseIconDiv] = useState(false);
    const [userInEditMode,setUserInEditMode] = useState(false);
    const [dob,setDob] = useState(userInfo?.date_of_birth);
    const [savingMode, setSavingMode] = useState(false);
    const dispatch = useDispatch();
    const [showAlert,setShowAlert] = useState(false);
    const { setAuth } = useAuth();

    const selectVoiceAssistantAvatar =(name)=>{
        if(name !== userVoiceAssistantSelection)
            dispatch(actionToChangeUserVoiceAssistantSelection(name));
    }
    const logOutMe = ()=>{
        setAuth({});
        dispatch(signout());
    }
    const openChooseAvatarIcon = ()=>{
        setChooseIconDiv(!chooseIconDiv);
    }

    const validateForm = ()=>{
        if(!name?.trim()?.length){
            return false;
        }else if(!email?.trim()?.length){
            return false;
        }else if(!email?.trim()?.length){
            return false;
        }else if(!avatar?.trim()?.length){
            return false;
        }else if(!mobile?.trim()?.length){
            return false;
        }else if(!address?.trim()?.length){
            return false;
        }else if(!gender?.trim()?.length){
            return false;
        }
        return true;
    }

    const updateUserProfile = async (e)=>{
        if(validateForm()){
            setSavingMode(true);
            let payload = {
                id:userInfo?.id,
                name:name,
                email:email,
                mobile:mobile,
                avatar:avatar,
                dob:_getFormatByFormatType(dob,'YYYY/MM/DD'),
                gender:gender,
                address:address,
                syllabus_type_id:userInfo?.syllabus_type_id,
                school_syllabus_id:userInfo?.school_syllabus_id,
                school_class_with_section_id:userInfo?.school_class_with_section_id,
                role:1,
            }
            await dispatch(actionToUpdateUserProfileData(payload));
            setTimeout(function(){
                resetForm();
            },1000)
        }
        e.preventDefault();
        return false;
    }
    const resetForm = ()=>{
        setSavingMode(false);
        setUserInEditMode(false);
    }
    const callFunctionToSetAvatar =(key)=>{
        setAvatar(key);
        setChooseIconDiv(false);
    }

    return (
        <div className={"student_app_dashboard_app_view_container_scroll profile_page"} style={{ background: `url(${bgImage}) no-repeat center center / cover`, }}>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header="Logout"
                message="Are you sure to logout?"
                buttons={
                    [
                        {
                            text: 'No',
                            role: 'cancel',
                            handler: () => {
                                setShowAlert(false)
                            },
                        },
                        {
                            text: 'Yes',
                            role: 'confirm',
                            handler: () => {
                                logOutMe();
                            },
                        },
                    ]
                }
            />
            <div className={"app_main_sub_header_container"}>
                <div className={"app_sub_header_welcome_text"}>
                    <div className={"app_sub_header_main_text_heading_subject profile-page"}>My Profile</div>
                </div>
                <div onClick={()=>setShowAlert(true)} className={"profile_logout_button_button"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489.9 489.9"><path d="M468.3 255.8l.2-.2c.3-.4.6-.7.8-1.1.1-.1.1-.2.2-.3.2-.4.5-.8.7-1.2 0-.1.1-.2.1-.2l.6-1.3c0-.1 0-.1.1-.2.2-.4.3-.9.5-1.4 0-.1 0-.2.1-.2.1-.5.3-.9.3-1.4 0-.2 0-.3.1-.5.1-.4.1-.8.2-1.2.1-.6.1-1.1.1-1.7s0-1.1-.1-1.7c0-.4-.1-.8-.2-1.2 0-.2 0-.3-.1-.5l-.3-1.4c0-.1 0-.2-.1-.2-.1-.5-.3-.9-.5-1.4 0-.1 0-.1-.1-.2l-.6-1.3c0-.1-.1-.2-.1-.2-.2-.4-.4-.8-.7-1.2-.1-.1-.1-.2-.2-.3-.3-.4-.5-.8-.8-1.1l-.2-.2c-.4-.4-.7-.9-1.2-1.3l-98.9-98.8c-6.7-6.7-17.6-6.7-24.3 0s-6.7 17.6 0 24.3l69.6 69.6H136.8c-9.5 0-17.2 7.7-17.2 17.1 0 9.5 7.7 17.2 17.2 17.2h276.8l-69.1 69.1c-6.7 6.7-6.7 17.6 0 24.3 3.3 3.3 7.7 5 12.1 5s8.8-1.7 12.1-5l98.3-98.3c.5-.6.9-1 1.3-1.4zM110.7 34.3h128c9.5 0 17.2-7.7 17.2-17.1 0-9.5-7.7-17.2-17.2-17.2h-128C59.4 0 17.6 41.8 17.6 93.1v303.7c0 51.3 41.8 93.1 93.1 93.1h125.9c9.5 0 17.2-7.7 17.2-17.1 0-9.5-7.7-17.2-17.2-17.2H110.7c-32.4 0-58.8-26.4-58.8-58.8V93.1c.1-32.5 26.4-58.8 58.8-58.8z"></path></svg>
                </div>
                <div onClick={()=>setUserInEditMode(!userInEditMode)} className={"profile_edit_save_button"}>
                    {(!userInEditMode) ?
                        <div>Edit</div>
                        :
                        <div>Exit</div>
                    }
                </div>
            </div>
            <div className={"subject_chapter_mobile_main_container_section"}>
                <div className={"profile_edit_user_avatar_button_header"}>
                    <div className="app_header_user_icon_section">
                        <img alt={"avatar"} src={_getUserIconByKey(avatar)}/>
                        {(userInEditMode) ?
                            <div onClick={openChooseAvatarIcon} className={"edit_overlay"}>
                                <span>Choose profile icon</span>
                            </div>
                            : ''
                        }
                    </div>
                </div>
                <div className={"profile_edit_user_profile_form_section"}>
                    <div className={"profile_edit_user_profile_form_input_group"}>
                        <div className={"label"}>
                            Name
                        </div>
                        {(userInEditMode) ?
                            <input className={"text_input"} type={"text"} placeholder={"Enter your name"} value={name}
                                   onChange={(e) => setName(e.target.value)}/>
                            :
                            <div className={"sudo_div_section"}>{name}</div>
                        }
                    </div>
                    <div className={"profile_edit_user_profile_form_input_group"}>
                        <div className={"label"}>
                            Email
                        </div>
                        {(userInEditMode) ?
                            <input  className={"text_input"} type={"text"} placeholder={"Enter your email"} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            :
                            <div className={"sudo_div_section"}>{email}</div>
                        }
                    </div>
                    <div className={"profile_edit_user_profile_form_input_group"}>
                        <div className={"label"}>
                            Mobile Number
                        </div>
                        {(userInEditMode) ?
                            <input  className={"text_input"} type={"text"} placeholder={"Enter your mobile number"} value={mobile} onChange={(e)=>setMobile(e.target.value)}/>
                            :
                            <div className={"sudo_div_section"}>{mobile}</div>
                        }
                    </div>
                    <div className={"profile_edit_user_profile_form_input_group"}>
                        <div className={"label"}>
                            Address
                        </div>
                        {(userInEditMode) ?
                            <textarea  className={"text_input"} rows={2} placeholder={"Enter your address"} value={address} onChange={(e)=>setAddress(e.target.value)}/>
                            :
                            <div className={"sudo_div_section"}>{address}</div>
                        }
                    </div>
                    <div className={"profile_edit_user_profile_form_input_group"}>
                        <div className={"label"}>
                            Gender
                        </div>
                        {(userInEditMode) ?
                            <div className={"input_radio_button"}>
                                <input className={"radio_input"} type={"radio"} name={"gender"}
                                       checked={gender === "Male"} value={"Male"}
                                       onChange={(e)=>setGender(e.target.value)}/>
                                <div className={"radio_label"}>Male</div>
                                <input className={"radio_input"} type={"radio"} name={"gender"} value={"Female"}
                                       checked={gender === "Female"}
                                       onChange={(e)=>setGender(e.target.value)}/>
                                <div className={"radio_label"}>Female</div>
                            </div>
                            :
                            <div className={"sudo_div_section"}>{gender}</div>
                        }
                    </div>
                    <div className={"profile_edit_user_profile_form_input_group"}>
                        <div className={"label"}>
                            Date of birth
                        </div>
                        {(userInEditMode) ?
                            <input value={_getFormatByFormatType(dob,'YYYY-MM-DD')} className={"text_input"} max={new Date()} type={"date"} onChange={(e)=>setDob(e.target.value)}/>
                            :
                            <div className={"sudo_div_section"}>{_getFormatByFormatType(dob,'MM/D/Y')}</div>
                        }
                    </div>
                    {(!userInEditMode) ?
                        <div className={"profile_edit_user_profile_form_input_group"}>
                            <div className={"label"}>
                                Select voice assistant avatar
                            </div>
                            <div className={"row-custom"}>
                                <div className={"col-custom"}>
                                    <div onClick={()=>selectVoiceAssistantAvatar('minion')} className={"voice_avatar_select_section_loop "+(userVoiceAssistantSelection === 'minion' ? 'active' : '')}>
                                        <img alt={'minion'} src={minion}/>
                                    </div>
                                </div>
                                <div className={"col-custom"}>
                                    <div onClick={()=>selectVoiceAssistantAvatar('harry')} className={"voice_avatar_select_section_loop "+(userVoiceAssistantSelection === 'harry' ? 'active' : '')}>
                                        <img alt={'minion'} src={harry}/>
                                    </div>
                                </div>
                                <div className={"col-custom"}>
                                    <div onClick={()=>selectVoiceAssistantAvatar('alien')} className={"voice_avatar_select_section_loop "+(userVoiceAssistantSelection === 'alien' ? 'active' : '')}>
                                        <img alt={'alien'} src={alien}/>
                                    </div>
                                </div>
                                <div className={"col-custom"}>
                                    <div onClick={()=>selectVoiceAssistantAvatar('akuaku')} className={"voice_avatar_select_section_loop "+(userVoiceAssistantSelection === 'akuaku' ? 'active' : '')}>
                                        <img alt={'minion'} src={akuaku}/>
                                    </div>
                                </div>
                                <div className={"col-custom"}>
                                    <div onClick={()=>selectVoiceAssistantAvatar('horror')} className={"voice_avatar_select_section_loop "+(userVoiceAssistantSelection === 'horror' ? 'active' : '')}>
                                        <img alt={'minion'} src={horror}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    :''
                    }
                    {(userInEditMode) ?
                        <div className={"profile_edit_user_profile_form_input_group"}>
                            <button type="button" className="btn btn-primary"
                                    onClick={updateUserProfile}
                                    disabled={!validateForm()}>
                                {savingMode ? 'Updating...' : 'Update'}
                            </button>
                        </div>
                        : ''
                    }
                </div>
                {(chooseIconDiv) ?
                    <div className={"choose_user_profile_icon_main_container"}>
                        <div className={"choose_user_profile_icon_header"}>
                            <div className={"test_header"}>Choose avatar</div>
                            <div onClick={openChooseAvatarIcon} className={"close_modal_form_button"}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330">
                                    <path
                                        d="M165 0C120.926 0 79.492 17.163 48.328 48.327c-64.334 64.333-64.334 169.011-.002 233.345C79.49 312.837 120.926 330 165 330s85.508-17.163 116.672-48.328c64.334-64.334 64.334-169.012 0-233.345C250.508 17.163 209.072 0 165 0zm74.246 239.245c-2.93 2.929-6.768 4.394-10.607 4.394s-7.678-1.465-10.605-4.394L165 186.213l-53.033 53.033c-2.93 2.929-6.768 4.394-10.607 4.394s-7.678-1.465-10.605-4.394a15 15 0 0 1 0-21.213L143.787 165l-53.033-53.033a15 15 0 0 1 0-21.213c5.857-5.857 15.355-5.857 21.213 0L165 143.787l53.031-53.033c5.857-5.857 15.355-5.857 21.213 0a15 15 0 0 1 0 21.213L186.213 165l53.033 53.032c5.858 5.858 5.858 15.356 0 21.213z"/>
                                </svg>
                            </div>
                        </div>
                        <div className={"choose_user_profile_icon_body"}>
                            <div className={"avatar_select_section_container"}>
                                {Object.keys(_userSchoolAvatarObject)?.map((key, index) => (
                                    <div key={index} onClick={() => callFunctionToSetAvatar(key)}
                                         className={"avatar_select_section_loop " + (key === avatar ? 'active' : '')}>
                                        <img src={_userSchoolAvatarObject[key]} alt={"avatar"}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    : ''
                }
            </div>
        </div>
    )
}
export const ProfileMobileBodyComponent = React.memo(ProfileMobileBodyComponentFunction);
