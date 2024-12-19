import React from "react";
import {AllStudentProgressDesktopMainBodyComponent} from "./AllStudentProgressDesktopMainBodyComponent";

function TeacherDesktopProgressComponentFunction(){

    return (
        <div className={"main_body_content_section"}>
            <AllStudentProgressDesktopMainBodyComponent/>
        </div>
    )
}
export const TeacherDesktopProgressComponent = React.memo(TeacherDesktopProgressComponentFunction);
