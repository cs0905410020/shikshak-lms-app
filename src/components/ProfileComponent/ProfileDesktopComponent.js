import React from "react";
import {LeftSideBarComponent} from "../LeftSideBarComponents/LeftSideBarComponent";
import {StudentDashSubHeaderComponent} from "../StudentComponent/StudentDashSubHeaderComponent";
import {IonPage} from "@ionic/react";
import {ProfileDesktopBodyComponent} from "./ProfileDesktopBodyCompoent";

export default function ProfileDesktopComponent(){
    return (
        <div className={"main_body_content_section"}>
            <StudentDashSubHeaderComponent pageName={'profile-page'}  subjectName={'Profile'}/>
            <ProfileDesktopBodyComponent/>
        </div>
    )
}
