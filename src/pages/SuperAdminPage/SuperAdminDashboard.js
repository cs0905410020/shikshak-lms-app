import React from "react";
import {IonPage} from "@ionic/react";
import {SuperAdminDashboardBodyComponent} from "../../components/SuperAdminComponent/SuperAdminDashboardBodyComponent";

export default function SuperAdminDashboard(){
    return (
        <IonPage>
            <SuperAdminDashboardBodyComponent/>
        </IonPage>
    )
}
