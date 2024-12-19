import React from "react";
import {IonContent, IonPage} from "@ionic/react";
import {AddNewStudentFormComponent} from "../../components/SchoolMasterComponent/AddNewStudentFormComponent";

export default function AddNewStudentFormPage(){
    return (
        <IonPage>
            <AddNewStudentFormComponent/>
        </IonPage>
    )
}