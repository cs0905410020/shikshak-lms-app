import React, {useEffect} from 'react';
import {StudentHistoryTopicMobileMainBodyComponent} from "../SuperAdminComponent/StudentHistoryTopicMobileMainBodyComponent";
import {Capacitor} from "@capacitor/core";
import {StatusBar} from "@capacitor/status-bar";
import {actionToGetChaptersAllTopicsHistoryDataByUserId} from "../../actions/CommonAction";
import {useDispatch} from "react-redux";
export const StudentHistoryTopicMobileComponent = ()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        if (Capacitor.isNativePlatform()) {
            StatusBar?.setOverlaysWebView({overlay: false});
            StatusBar?.setBackgroundColor({color: '#79d1fe'});
        }
    },[])
    useEffect(()=>{
        dispatch(actionToGetChaptersAllTopicsHistoryDataByUserId())
    },[])
    return (
        <StudentHistoryTopicMobileMainBodyComponent/>
    )
}