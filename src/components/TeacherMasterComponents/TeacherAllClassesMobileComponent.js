import React, {useEffect} from "react";
import { StatusBar } from '@capacitor/status-bar';
import {Capacitor} from '@capacitor/core';
import {useRouteMatch} from "react-router-dom";
import {StudentDashboardAppHeader} from "../StudentComponent/StudentDashboardAppHeader";
import {TeacherDashboardAppMainBody} from "./TeacherDashboardAppMainBody";


function TeacherAllClassesMobileComponentFunction(){
    useEffect(()=>{
        if (Capacitor.isNativePlatform()) {
            StatusBar?.setOverlaysWebView({overlay: false});
            StatusBar?.setBackgroundColor({color: '#ffffff'});
        }
    },[])
    const { path } = useRouteMatch();
    return (
        <>
            <StudentDashboardAppHeader/>
            <TeacherDashboardAppMainBody/>
        </>
    )
}
export const TeacherAllClassesMobileComponent = React.memo(TeacherAllClassesMobileComponentFunction);
