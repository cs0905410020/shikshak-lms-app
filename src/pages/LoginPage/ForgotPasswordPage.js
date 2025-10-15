import React, {useEffect} from "react";
import {ForgotPasswordComponent} from "../../components/LoginComponent/ForgotPasswordComponent";
import { StatusBar } from '@capacitor/status-bar';
import {Capacitor} from '@capacitor/core';

export default function ForgotPasswordPage(){
    useEffect(()=>{
        if (Capacitor.isNativePlatform()) {
            StatusBar?.setOverlaysWebView({overlay: true});
            StatusBar?.setBackgroundColor({color: '#f42c37'});
        }
    },[])
    return (
        <div className={"login_page_main_container_section"}>
            <div className={"login_page_main_inner_section"}>
                <ForgotPasswordComponent/>
            </div>
        </div>
    )
}
