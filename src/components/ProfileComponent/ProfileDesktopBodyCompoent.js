import React, { useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {_getFormatByFormatType, _getUserIconByKey, _userSchoolAvatarObject} from "../../helpers/CommonHelper";
import {
    actionToChangeUserVoiceAssistantSelection,
    actionToSetUserProfileInEditMode,
    actionToUpdateUserProfileData
} from "../../actions/CommonAction";
import Modal from 'react-modal';
import {useHistory} from "react-router-dom";
import harry from "../../theme/image/avatar/harry.png";
import minion from "../../theme/image/avatar/minion.png";
import alien from "../../theme/image/avatar/alien.png";
import akuaku from "../../theme/image/avatar/akuaku.png";
import horror from "../../theme/image/avatar/horror.png";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
function ProfileDesktopBodyComponentFunction(){
    const history = useHistory();
    const goToPage = (type)=>{
        history.push(type);
    }
    const userInfo = useSelector((state) => state.userSignin.userInfo);
    const userProfileInEditMode = useSelector((state) => state.userProfileInEditMode);
    const [name,setName] = useState(userInfo?.name);
    const [email,setEmail] = useState(userInfo?.email);
    const [avatar,setAvatar] = useState(userInfo?.avatar);
    const [mobile,setMobile] = useState(userInfo?.mobile);
    const [address,setAddress] = useState(userInfo?.address);
    const [gender,setGender] = useState(userInfo?.gender);
    const [chooseIconDiv,setChooseIconDiv] = useState(false);
    const [dob,setDob] = useState(userInfo?.date_of_birth);
    const [savingMode, setSavingMode] = useState(false);
    const dispatch = useDispatch();
    const modalPopupRef = useRef();
    const userVoiceAssistantSelection = useSelector((state) => state.userVoiceAssistantSelection);

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
        dispatch(actionToSetUserProfileInEditMode(false));
    }
    const callFunctionToSetAvatar =(key)=>{
        setAvatar(key);
        setChooseIconDiv(false);
    }
    const selectVoiceAssistantAvatar =(name)=>{
        if(name !== userVoiceAssistantSelection)
           dispatch(actionToChangeUserVoiceAssistantSelection(name));
    }

    return (
        <div className={"subject_chapter_main_container_section"}>
            <div className={"subject_chapter_main_container_inner_section_profile_edit"}>
                <div className={"profile_edit_user_avatar_button_header"}>
                    <div className="app_header_user_icon_section">
                        <img alt={"avatar"} src={_getUserIconByKey(avatar)}/>
                        {(userProfileInEditMode) ?
                            <div onClick={openChooseAvatarIcon} className={"edit_overlay"}>
                                <span>Choose profile icon</span>
                            </div>
                            : ''
                        }
                    </div>
                </div>
                <form>
                  <div className={"profile_edit_user_profile_form_section"}>
                      <div className={"row"}>
                          <div className={"col"}>
                              <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">Name</label>
                                  <input className={"form-control"} type={"text"} placeholder={"Enter your name"} value={name}
                                         onChange={(e) => setName(e.target.value)}
                                         disabled={!userProfileInEditMode}
                                  />
                              </div>
                          </div>
                          <div className={"col"}>
                              <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">Email</label>
                                  <input  className={"form-control"} type={"text"} placeholder={"Enter your email"} value={email}
                                          onChange={(e)=>setEmail(e.target.value)}
                                          disabled={!userProfileInEditMode}
                                  />
                              </div>
                          </div>
                      </div>
                      <div className={"row"}>
                          <div className={"col"}>
                              <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">Mobile Number</label>
                                  <input  className={"form-control"} type={"text"} placeholder={"Enter your mobile number"} value={mobile}
                                          onChange={(e)=>setMobile(e.target.value)}
                                          disabled={!userProfileInEditMode}
                                  />

                              </div>
                          </div>
                          <div className={"col"}>
                              <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">Address</label>
                                  <textarea  className={"form-control"} rows={1} placeholder={"Enter your address"} value={address}
                                             onChange={(e)=>setAddress(e.target.value)}
                                             disabled={!userProfileInEditMode}
                                  />
                              </div>
                          </div>
                      </div>
                      <div className={"row"}>
                          <div className={"col"}>
                              <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">Gender</label>
                                  <select className={"form-control"} value={gender}
                                          onChange={(e)=>setGender(e.target.value)}
                                          disabled={!userProfileInEditMode}>
                                      <option value={'Male'}>Male</option>
                                      <option value={'Female'}>Female</option>
                                  </select>
                              </div>
                          </div>
                          <div className={"col"}>
                              <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">Date of birth</label>
                                  <input value={_getFormatByFormatType(dob,'YYYY-MM-DD')} className={"form-control"} max={new Date()} type={"date"}
                                         onChange={(e)=>setDob(e.target.value)}
                                         disabled={!userProfileInEditMode}
                                  />
                              </div>
                          </div>
                      </div>
                      {(!userProfileInEditMode) ?
                      <div className={"row"}>
                          <div className={"col"}>
                              <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">Select voice assistant avatar</label>
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
                                              <img alt={'akuaku'} src={akuaku}/>
                                          </div>
                                      </div>
                                      <div className={"col-custom"}>
                                          <div onClick={()=>selectVoiceAssistantAvatar('horror')} className={"voice_avatar_select_section_loop "+(userVoiceAssistantSelection === 'horror' ? 'active' : '')}>
                                              <img alt={'horror'} src={horror}/>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                          :''}
                      <>
                            {(userProfileInEditMode) ?
                                <div className={"profile_edit_user_profile_form_input_group"}>
                                    <button type="button" className="btn btn-primary"
                                            onClick={updateUserProfile}
                                            disabled={!validateForm()}>
                                        {savingMode ? 'Updating...' : 'Update'}
                                    </button>
                                </div>
                                : ''
                            }
                      </>
                </div>
                </form>
                <Modal
                    isOpen={chooseIconDiv ? true : false}
                    onRequestClose={openChooseAvatarIcon}
                    style={customStyles}
                    ref={modalPopupRef}
                    id={"editPopupId"}
                    contentLabel="Choose avatar">
                    <h2>Choose avatar</h2>
                    <div onClick={openChooseAvatarIcon} className={"close_modal_form_button"}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330"><path d="M165 0C120.926 0 79.492 17.163 48.328 48.327c-64.334 64.333-64.334 169.011-.002 233.345C79.49 312.837 120.926 330 165 330s85.508-17.163 116.672-48.328c64.334-64.334 64.334-169.012 0-233.345C250.508 17.163 209.072 0 165 0zm74.246 239.245c-2.93 2.929-6.768 4.394-10.607 4.394s-7.678-1.465-10.605-4.394L165 186.213l-53.033 53.033c-2.93 2.929-6.768 4.394-10.607 4.394s-7.678-1.465-10.605-4.394a15 15 0 0 1 0-21.213L143.787 165l-53.033-53.033a15 15 0 0 1 0-21.213c5.857-5.857 15.355-5.857 21.213 0L165 143.787l53.031-53.033c5.857-5.857 15.355-5.857 21.213 0a15 15 0 0 1 0 21.213L186.213 165l53.033 53.032c5.858 5.858 5.858 15.356 0 21.213z"/></svg>
                    </div>
                    <br/>
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
                </Modal>
            </div>
        </div>
    )
}
export const ProfileDesktopBodyComponent = React.memo(ProfileDesktopBodyComponentFunction);
