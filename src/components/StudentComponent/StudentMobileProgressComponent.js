import React, {useEffect} from "react";
import {StudentAppFooterTabComponent} from "./StudentAppFooterTabComponent";
import {StudentProgressAppMainBody} from "./StudentProgressAppMainBody";
import {Capacitor} from "@capacitor/core";
import {StatusBar} from "@capacitor/status-bar";
import {useDispatch, useSelector} from "react-redux";
import {actionToGetAllStudentClassDataByClassSectionId} from "../../actions/CommonAction";

function StudentMobileProgressComponentFunction(){
    useEffect(()=>{
        if (Capacitor.isNativePlatform()) {
            StatusBar?.setOverlaysWebView({overlay: false});
            StatusBar?.setBackgroundColor({color: '#79d1fe'});
        }
    },[])
    const userInfo = useSelector((state) => state.userSignin.userInfo);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(actionToGetAllStudentClassDataByClassSectionId(userInfo?.class_standard_id));
    },[])
    return (
        <StudentProgressAppMainBody/>
    )
}
export const StudentMobileProgressComponent = React.memo(StudentMobileProgressComponentFunction);
