import React, {useEffect} from "react";
import { StatusBar } from '@capacitor/status-bar';
import {Capacitor} from '@capacitor/core';
import {StudentAllCoursesMobileComponent} from "./StudentAllCoursesMobileComponent";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import {SubjectAllChaptersMobileComponent} from "./SubjectAllChaptersMobileComponent";
import {ChapterAllTopicsMobileComponent} from "../ChapterTopicComponents/ChapterAllTopicsMobileComponent";
import {ChapterAllTopicsVideoMobileComponent} from "./ChapterAllTopicsVideoMobileComponent";
import {ChapterTestDetailPageComponent} from "./ChapterTestDetailPageComponent";
import {SubjectAllSubjectTopicDesktopComponent} from "./SubjectAllSubjectTopicDesktopComponent";
import {SubjectAllSubjectTopicMobileComponent} from "./SubjectAllSubjectTopicMobileComponent";


function StudentMobileDashboardFunction(){
    useEffect(()=>{
        if (Capacitor.isNativePlatform()) {
            StatusBar?.setOverlaysWebView({overlay: false});
            StatusBar?.setBackgroundColor({color: '#ffffff'});
        }
    },[])
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={path}>
                <StudentAllCoursesMobileComponent/>
            </Route>
            <Route exact path={`${path}/subject-chapters/:id`}>
                <SubjectAllChaptersMobileComponent/>
            </Route>
            <Route path={`${path}/grade-subject/:id/:grade`}>
                <SubjectAllSubjectTopicMobileComponent/>
            </Route>
            <Route exact path={`${path}/chapter-topics/:id`}>
                <ChapterAllTopicsMobileComponent/>
            </Route>
            <Route exact path={`${path}/chapter-test-detail/:chapter_id/:test_id`}>
                <ChapterTestDetailPageComponent/>
            </Route>
            <Route exact path={`${path}/chapter-topics-video/:chapter_id/:topic_id`}>
                <ChapterAllTopicsVideoMobileComponent/>
            </Route>
        </Switch>
    )
}
export const StudentMobileDashboard = React.memo(StudentMobileDashboardFunction);
