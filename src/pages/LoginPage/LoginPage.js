import React, {useEffect} from "react";
import planeImg from '../../theme/image/plane.png';
import frontimgboook from '../../theme/image/Model-4.png';
import marker from '../../theme/image/Model-4 (1).png';
import readinggirl from '../../theme/image/readinggirl.gif';
import plane_second from '../../theme/image/plane-second.png';
import trophy from '../../theme/image/Model-1.png';
import {LoginComponent} from "../../components/LoginComponent/LoginComponent";
import {useSelector} from "react-redux";
import { StatusBar } from '@capacitor/status-bar';
import {Capacitor} from '@capacitor/core';

export default function LoginPage(){
    const windowResizeCount = useSelector((state) => state.windowResizeCount);
    useEffect(()=>{
        if (Capacitor.isNativePlatform()) {
            StatusBar?.setOverlaysWebView({overlay: true});
            StatusBar?.setBackgroundColor({color: '#f42c37'});
        }
    },[])
    return (
        <div className={"login_page_main_container_section"}>
            <div className={"login_top_header_green"}></div>
            <div className={"login_body_light_green"}></div>
            <div className={"login_body_light_green_bottom"}></div>
            <div className={"login_page_main_inner_section"}>
                <div className={"login_bag_image"}>
                    <img src={planeImg}/>
                </div>
                {(windowResizeCount >= 800) ?
                    <div className={"login_readinggirl_image"}>
                        <img src={readinggirl}/>
                    </div>
                    : ''
                }
                {(windowResizeCount >= 800) ?
                    <div className={"login_frontimgboook_image"}>
                        <img src={frontimgboook}/>
                    </div> : ''
                }
                {(windowResizeCount >= 800) ?
                    <div className={"login_marker_image"}>
                        <img src={marker}/>
                    </div>
                    : ''
                }
                {(windowResizeCount >= 800) ?
                    <div className={"login_compas_image"}>
                        <img src={plane_second}/>
                    </div> : ''
                }
                {(windowResizeCount >= 800) ?
                    <div className={"login_trophy_image"}>
                        <img src={trophy}/>
                    </div>
                    : ''
                }
                <LoginComponent/>
            </div>
        </div>
    )
}
