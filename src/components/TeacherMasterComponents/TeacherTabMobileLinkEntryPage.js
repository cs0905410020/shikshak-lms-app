import React from "react";
import {Redirect, Route, Switch, useHistory, useRouteMatch} from "react-router-dom";

export default function TeacherTabMobileLinkEntryPage() {
    const { path } = useRouteMatch();
    const history = useHistory();
    return (
        <div className={"student_app_dashboard_app_view_container"}>

        </div>
    )
}
