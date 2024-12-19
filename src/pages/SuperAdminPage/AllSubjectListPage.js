import React, {useEffect} from "react";
import {IonContent, IonPage} from "@ionic/react";
import {useDispatch} from "react-redux";
import {actionToGetAllSubjectDataListByCondition} from "../../actions/CommonAction";
import {AllSubjectListComponent} from "../../components/SuperAdminComponent/AllSubjectListComponent";

export default function AllSubjectListPage(){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(actionToGetAllSubjectDataListByCondition());
    },[])
    return (
        <IonPage>
            <AllSubjectListComponent/>
        </IonPage>
    )
}