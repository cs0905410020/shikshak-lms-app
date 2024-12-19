import React, {useEffect} from "react";
import {IonContent, IonPage} from "@ionic/react";
import {useDispatch} from "react-redux";
import {actionToGetAllChapterListData, actionToGetAllSubjectDataListByCondition} from "../../actions/CommonAction";
import {AllChapterListComponent} from "../../components/SuperAdminComponent/AllChapterListComponent";

export default function AllChapterListPage(){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(actionToGetAllChapterListData());
        dispatch(actionToGetAllSubjectDataListByCondition());
    },[])
    return (
        <IonPage>
            <AllChapterListComponent/>
        </IonPage>
    )
}