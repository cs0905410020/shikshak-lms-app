import React from "react";
import {useSelector} from "react-redux";
import TeacherTabDesktopLinkEntryPage from "./TeacherTabDesktopLinkEntryPage";
import TeacherTabMobileLinkEntryPage from "./TeacherTabMobileLinkEntryPage";

export default function TeacherTabCommonLinkEntryPage() {
    const windowResizeCount = useSelector((state) => state.windowResizeCount);

    return (
        <>
            {(windowResizeCount >= 1200) ?
                <TeacherTabDesktopLinkEntryPage/>
                :
               ''
            }
        </>
    )
}
