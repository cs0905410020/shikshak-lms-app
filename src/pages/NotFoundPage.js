import React, {useEffect} from "react";
import {IonContent, IonPage} from "@ionic/react";
import notFoundImg from '../theme/image/no-data-found-mobile.png';
import $ from 'jquery';

export const NotFoundPage = ()=>{
    useEffect(()=>{
        $('#enable_voice_command_button_container').remove();
    },[])
    return (
        <IonPage>
            <IonContent>
                <div className={"page_not_found_class_main_container"}>
                    <img alt={'notFoundImg'} src={notFoundImg}/>
                </div>
            </IonContent>
        </IonPage>
    )
}