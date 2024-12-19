import React from "react";
import {useSelector} from "react-redux";
import StudentTabDesktopLinkEntryPage from "./StudentTabDesktopLinkEntryPage";
import StudentTabMobileLinkEntryPage from "../SuperAdminPage/StudentTabMobileLinkEntryPage";
//import VoiceAssistantComponent from "../../components/CartoonCharactorsComponents/VoiceAssistantComponent";

export default function StudentTabCommonLinkEntryPage() {
    const windowResizeCount = useSelector((state) => state.windowResizeCount);

    return (
        <>
         {/*   <VoiceAssistantComponent/>*/}
            {(windowResizeCount >= 1200) ?
                <StudentTabDesktopLinkEntryPage/>
                :
                <StudentTabMobileLinkEntryPage/>
            }
        </>
    )
}
