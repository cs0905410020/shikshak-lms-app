import React, {useEffect} from "react";
import {IonContent, IonPage} from "@ionic/react";
import {AllSchoolUserListComponent} from "../../components/SuperAdminComponent/AllSchoolUserListComponent";
import {useDispatch} from "react-redux";
import {actionToGetAllUserListByCondition} from "../../actions/CommonAction";
import {AllTeacherUserListComponent} from "../../components/SchoolMasterComponent/AllTeacherUserListComponent";
import {AllTeacherUserListProgressComponent} from "../../components/SchoolMasterComponent/AllTeacherUserListProgressComponent";

export default function AllTeacherUserListProgressPage(){
    const dispatch = useDispatch();
    useEffect(()=>{
        const condition = ` role = 3`;
        dispatch(actionToGetAllUserListByCondition(condition));
    },[])
    return (
        <IonPage>
            <AllTeacherUserListProgressComponent/>
        </IonPage>
    )
}