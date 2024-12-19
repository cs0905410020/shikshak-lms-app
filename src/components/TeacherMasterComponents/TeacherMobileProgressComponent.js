import React, {useEffect} from "react";
import {Capacitor} from "@capacitor/core";
import {StatusBar} from "@capacitor/status-bar";
import {AllStudentProgressAppMainBody} from "./AllStudentProgressAppMainBody";

function TeacherMobileProgressComponentFunction(){
    useEffect(()=>{
        if (Capacitor.isNativePlatform()) {
            StatusBar?.setOverlaysWebView({overlay: false});
            StatusBar?.setBackgroundColor({color: '#79d1fe'});
        }
    },[])

    return (
        <AllStudentProgressAppMainBody/>
    )
}
export const TeacherMobileProgressComponent = React.memo(TeacherMobileProgressComponentFunction);
