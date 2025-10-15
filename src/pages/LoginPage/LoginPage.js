import React, {useEffect} from "react";
import {LoginComponent} from "../../components/LoginComponent/LoginComponent";
import { StatusBar } from '@capacitor/status-bar';
import {Capacitor} from '@capacitor/core';

export default function LoginPage(){
    useEffect(()=>{
        if (Capacitor.isNativePlatform()) {
            StatusBar?.setOverlaysWebView({overlay: true});
            StatusBar?.setBackgroundColor({color: '#f42c37'});
        }
    },[])
    return (
        <div className={"login_page_main_container_section"}>
            <div className={"login_page_main_inner_section"}>
                <LoginComponent/>
            </div>
        </div>
    )
}
