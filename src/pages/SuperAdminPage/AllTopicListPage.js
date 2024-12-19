import React, {useEffect} from "react";
import {IonContent, IonPage} from "@ionic/react";
import {useDispatch} from "react-redux";
import {actionToGetAllChapterListData, actionToGetAllTopicListData} from "../../actions/CommonAction";
import {AllTopicListComponent} from "../../components/SuperAdminComponent/AllTopicListComponent";

export default function AllTopicListPage(){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(actionToGetAllChapterListData());
        dispatch(actionToGetAllTopicListData());
    },[])
    return (
        <IonPage>
            <AllTopicListComponent/>
        </IonPage>
    )
}