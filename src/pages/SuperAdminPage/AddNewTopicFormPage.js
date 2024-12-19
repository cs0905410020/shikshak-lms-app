import React, {useEffect} from "react";
import {IonContent, IonPage} from "@ionic/react";
import {AddNewTopicFormComponent} from "../../components/SuperAdminComponent/AddNewTopicFormComponent";
import {actionToGetAllChapterListData, actionToGetAllSubjectDataListByCondition} from "../../actions/CommonAction";
import {useDispatch} from "react-redux";

export default function AddNewTopicFormPage(){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(actionToGetAllChapterListData());
    },[])
    return (
        <IonPage>
            <AddNewTopicFormComponent/>
        </IonPage>
    )
}