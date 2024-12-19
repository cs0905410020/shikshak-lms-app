import React, {useEffect} from "react";
import {IonContent, IonPage} from "@ionic/react";
import {AllSchoolUserListComponent} from "../../components/SuperAdminComponent/AllSchoolUserListComponent";
import {useDispatch} from "react-redux";
import {actionToGetAllUserListByCondition} from "../../actions/CommonAction";

export default function AllSchoolUserListPage(){
    const dispatch = useDispatch();
    useEffect(()=>{
        const condition = ` role = 2`;
        dispatch(actionToGetAllUserListByCondition(condition));
    },[])
    return (
        <IonPage>
            <AllSchoolUserListComponent/>
        </IonPage>
    )
}