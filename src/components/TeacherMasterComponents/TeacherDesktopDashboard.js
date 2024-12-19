import React from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import {TeacherAllClassesComponent} from "./TeacherAllClassesComponent";
import {SubjectAllChaptersDesktopComponent} from "../StudentComponent/SubjectAllChaptersDesktopComponent";
import {ChapterAllTopicsDesktopComponent} from "../ChapterTopicComponents/ChapterAllTopicsDesktopComponent";
import ChapterAllTopicsVideoDesktopComponent from "../StudentComponent/ChapterAllTopicsVideoDesktopComponent";

function TeacherDesktopDashboardFunction(){
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={path}>
                <TeacherAllClassesComponent/>
            </Route>
            <Route path={`${path}/subject-chapters/:id`}>
                <SubjectAllChaptersDesktopComponent/>
            </Route>
            <Route path={`${path}/chapter-topics/:id`}>
                <ChapterAllTopicsDesktopComponent/>
            </Route>
            <Route exact path={`${path}/chapter-topics-video/:chapter_id/:topic_id`}>
                <ChapterAllTopicsVideoDesktopComponent/>
            </Route>
        </Switch>
    )
}
export const TeacherDesktopDashboard = React.memo(TeacherDesktopDashboardFunction);
