import React from "react";
import {IonContent, IonPage} from "@ionic/react";
import {AddNewAdminFormComponent} from "../../components/SuperAdminComponent/AddNewAdminFormComponent";

export default function AddNewAdminFormPage(){
    return (
        <IonPage>
            <AddNewAdminFormComponent/>
        </IonPage>
    )
}