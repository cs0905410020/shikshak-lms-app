import React from "react";
import {IonContent, IonPage} from "@ionic/react";
import {AddNewSchoolFormComponent} from "../../components/SuperAdminComponent/AddNewSchoolFormComponent";

export const AddNewSchoolUserListPage = ()=>{
    return (
        <IonPage>
            <IonContent>
                <AddNewSchoolFormComponent/>
            </IonContent>
        </IonPage>
    )
}