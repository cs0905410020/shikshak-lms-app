import React from "react";
import {useSelector} from "react-redux";
import ProfileDesktopComponent from "../../components/ProfileComponent/ProfileDesktopComponent";
import ProfileMobileComponent from "../../components/ProfileComponent/ProfileMobileComponent";

export default function StudentProfileDetailPage(){
    const windowResizeCount = useSelector((state) => state.windowResizeCount);
    return (
        <>
            {(windowResizeCount >= 800) ?
                <ProfileDesktopComponent/>
                :
                <ProfileMobileComponent/>
            }
        </>
    )
}
