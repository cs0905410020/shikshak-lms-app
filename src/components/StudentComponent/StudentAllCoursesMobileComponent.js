import React, {useEffect} from "react";
import { StatusBar } from '@capacitor/status-bar';
import {Capacitor} from '@capacitor/core';
import {useRouteMatch} from "react-router-dom";
import {StudentDashboardAppHeader} from "./StudentDashboardAppHeader";
import {StudentDashboardAppMainBody} from "./StudentDashboardAppMainBody";


function StudentAllCoursesMobileComponentFunction(){
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
            <StudentDashboardAppMainBody/>
        </>
    )
}
export const StudentAllCoursesMobileComponent = React.memo(StudentAllCoursesMobileComponentFunction);
