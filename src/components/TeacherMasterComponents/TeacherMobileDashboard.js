import React, {useEffect} from "react";
import { StatusBar } from '@capacitor/status-bar';
import {Capacitor} from '@capacitor/core';
import {Route, Switch, useRouteMatch} from "react-router-dom";
import {ChapterAllTopicsMobileComponent} from "../ChapterTopicComponents/ChapterAllTopicsMobileComponent";
import {TeacherAllClassesMobileComponent} from "./TeacherAllClassesMobileComponent";
import {SubjectAllChaptersMobileComponent} from "../StudentComponent/SubjectAllChaptersMobileComponent";
import {ChapterTestDetailPageComponent} from "../StudentComponent/ChapterTestDetailPageComponent";
import {ChapterAllTopicsVideoMobileComponent} from "../StudentComponent/ChapterAllTopicsVideoMobileComponent";


function TeacherMobileDashboardFunction(){
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
                <TeacherAllClassesMobileComponent/>
            </Route>
            <Route exact path={`${path}/subject-chapters/:id`}>
                <SubjectAllChaptersMobileComponent/>
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
export const TeacherMobileDashboard = React.memo(TeacherMobileDashboardFunction);
