import React from "react";
import {LeftSideBarComponent} from "../LeftSideBarComponents/LeftSideBarComponent";
import {IonPage} from "@ionic/react";
import {StudentSearchTopicDesktopMainBodyComponent} from "./StudentSearchTopicDesktopMainBodyComponent";

export default function StudentSearchTopicDesktopComponent(){
    return (
        <div className={"main_body_content_section_for_search_page"}>
            <StudentSearchTopicDesktopMainBodyComponent/>
        </div>
    )
}
