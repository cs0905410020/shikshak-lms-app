import React, {useEffect} from "react";
import {IonContent, IonPage} from "@ionic/react";
import {AddNewChapterFormComponent} from "../../components/SuperAdminComponent/AddNewChapterFormComponent";
import {actionToGetAllSubjectDataListByCondition} from "../../actions/CommonAction";
import {useDispatch} from "react-redux";

export default function AddNewChapterFormPage(){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(actionToGetAllSubjectDataListByCondition());
    },[])
    return (
        <IonPage>
            <AddNewChapterFormComponent/>
        </IonPage>
    )
}