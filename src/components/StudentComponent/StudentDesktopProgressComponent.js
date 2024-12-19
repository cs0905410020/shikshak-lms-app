import React from "react";
import {LeftSideBarComponent} from "../LeftSideBarComponents/LeftSideBarComponent";
import {IonPage} from "@ionic/react";
import {StudentProgressDesktopMainBodyComponent} from "./StudentProgressDesktopMainBodyComponent";

function StudentDesktopProgressComponentFunction(){

    return (
        <div className={"main_body_content_section"}>
            <StudentProgressDesktopMainBodyComponent/>
        </div>
    )
}
export const StudentDesktopProgressComponent = React.memo(StudentDesktopProgressComponentFunction);
