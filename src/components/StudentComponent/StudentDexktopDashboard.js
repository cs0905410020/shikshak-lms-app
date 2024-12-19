import React from "react";
import {StudentAllCoursesComponent} from "./StudentAllCoursesComponent";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import ChapterAllTopicsVideoDesktopComponent from "./ChapterAllTopicsVideoDesktopComponent";
import {SubjectAllChaptersDesktopComponent} from "./SubjectAllChaptersDesktopComponent";
import {ChapterAllTopicsDesktopComponent} from "../ChapterTopicComponents/ChapterAllTopicsDesktopComponent";

function StudentDesktopDashboardFunction(){
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={path}>
                <StudentAllCoursesComponent/>
            </Route>
            <Route exact path={`${path}/chapter-topics-video/:chapter_id/:topic_id`}>
                <ChapterAllTopicsVideoDesktopComponent/>
            </Route>
            <Route path={`${path}/subject-chapters/:id`}>
                <SubjectAllChaptersDesktopComponent/>
            </Route>
            <Route path={`${path}/chapter-topics/:id`}>
                <ChapterAllTopicsDesktopComponent/>
            </Route>
        </Switch>
    )
}
export const StudentDesktopDashboard = React.memo(StudentDesktopDashboardFunction);
