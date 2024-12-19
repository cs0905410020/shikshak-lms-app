import React, {useEffect} from "react";
import {IonContent, IonPage} from "@ionic/react";
import {useDispatch} from "react-redux";
import {actionToGetAllUserListByCondition} from "../../actions/CommonAction";
import {AllStudentUserListComponent} from "../../components/SchoolMasterComponent/AllStudentUserListComponent";

export default function AllStudentUserListPage(){
    const dispatch = useDispatch();
    useEffect(()=>{
        const condition = ` role = 4`;
        dispatch(actionToGetAllUserListByCondition(condition));
    },[])
    return (
        <IonPage>
            <AllStudentUserListComponent/>
        </IonPage>
    )
}