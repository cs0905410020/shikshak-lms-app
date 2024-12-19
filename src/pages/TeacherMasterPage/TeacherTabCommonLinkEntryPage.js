import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import TeacherTabDesktopLinkEntryPage from "./TeacherTabDesktopLinkEntryPage";
import TeacherTabMobileLinkEntryPage from "./TeacherTabMobileLinkEntryPage";
import {actionToGetTeacherAllClassesData} from "../../actions/CommonAction";
//import VoiceAssistantComponent from "../../components/CartoonCharactorsComponents/VoiceAssistantComponent";

export default function TeacherTabCommonLinkEntryPage() {
    const windowResizeCount = useSelector((state) => state.windowResizeCount);
    const userInfo = useSelector((state) => state.userSignin.userInfo);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(actionToGetTeacherAllClassesData(userInfo?.id,userInfo?.school_id));
    },[])
    return (
        <>
            {/*<VoiceAssistantComponent/>*/}
            {(windowResizeCount >= 1200) ?
                <TeacherTabDesktopLinkEntryPage/>
                :
                <TeacherTabMobileLinkEntryPage/>
            }
        </>
    )
}
