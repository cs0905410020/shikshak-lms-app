import React from "react";
import {StudentAllCoursesComponent} from "./StudentAllCoursesComponent";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import ChapterAllTopicsVideoDesktopComponent from "./ChapterAllTopicsVideoDesktopComponent";
import {SubjectAllChaptersDesktopComponent} from "./SubjectAllChaptersDesktopComponent";
import {ChapterAllTopicsDesktopComponent} from "../ChapterTopicComponents/ChapterAllTopicsDesktopComponent";
import {SubjectAllSubjectTopicDesktopComponent} from "./SubjectAllSubjectTopicDesktopComponent";

function StudentDesktopDashboardFunction(){
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={'/dashboard/home'}>
                <StudentAllCoursesComponent/>
            </Route>
            <Route exact path={`/dashboard/home/chapter-topics-video/:chapter_id/:topic_id`}>
                <ChapterAllTopicsVideoDesktopComponent/>
            </Route>
            <Route path={`/dashboard/home/subject-chapters/:id`}>
                <SubjectAllChaptersDesktopComponent/>
            </Route>
            <Route path={`/dashboard/home/grade-subject/:id/:grade`}>
                <SubjectAllSubjectTopicDesktopComponent/>
            </Route>
            <Route path={`/dashboard/home/chapter-topics/:id`}>
                <ChapterAllTopicsDesktopComponent/>
            </Route>
        </Switch>
    )
}
export const StudentDesktopDashboard = React.memo(StudentDesktopDashboardFunction);
