import React, {useEffect} from "react";
import {ProfileMobileBodyComponent} from "./ProfileMobileBodyCompoent";
import {Capacitor} from "@capacitor/core";
import {StatusBar} from "@capacitor/status-bar";

export default function ProfileMobileComponent({isTeacherCompoent}){
    useEffect(()=>{
        if (Capacitor.isNativePlatform()) {
            StatusBar?.setOverlaysWebView({overlay: false});
            StatusBar?.setBackgroundColor({color: '#2196f3'});
        }
    },[])
    return (
        <ProfileMobileBodyComponent isTeacherCompoent={isTeacherCompoent}/>
    )
}
