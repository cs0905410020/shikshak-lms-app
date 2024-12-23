import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import StudentTabDesktopLinkEntryPage from "./StudentTabDesktopLinkEntryPage";
import StudentTabMobileLinkEntryPage from "../SuperAdminPage/StudentTabMobileLinkEntryPage";
import {actionToGetAllClassStandardGradesData} from "../../actions/CommonAction";
//import VoiceAssistantComponent from "../../components/CartoonCharactorsComponents/VoiceAssistantComponent";

export default function StudentTabCommonLinkEntryPage() {
    const windowResizeCount = useSelector((state) => state.windowResizeCount);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actionToGetAllClassStandardGradesData());
    }, []);

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
