import React, {useEffect} from 'react';
import {StudentSearchTopicMainBody} from "./StudentSearchTopicMainBody";
import {Capacitor} from "@capacitor/core";
import {StatusBar} from "@capacitor/status-bar";
import {useParams} from "react-router";
export const StudentSearchTopicMobileComponent = ()=>{
    useEffect(()=>{
        if (Capacitor.isNativePlatform()) {
            StatusBar?.setOverlaysWebView({overlay: false});
            StatusBar?.setBackgroundColor({color: '#79d1fe'});
        }
    },[])
    const {search} = useParams();
    return (
        <StudentSearchTopicMainBody search={search}/>
    )
}