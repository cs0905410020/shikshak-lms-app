import React, {useEffect} from "react";
import {IonPage} from "@ionic/react";
import {useDispatch} from "react-redux";
import {actionToGetAllUserListByCondition} from "../../actions/CommonAction";
import {AllTeacherUserListComponent} from "../../components/SchoolMasterComponent/AllTeacherUserListComponent";

export default function AllTeacherUserListPage(){
    const dispatch = useDispatch();
    useEffect(()=>{
        const condition = ` role = 3`;
        dispatch(actionToGetAllUserListByCondition(condition));
    },[])
    return (
        <IonPage>
            <AllTeacherUserListComponent/>
        </IonPage>
    )
}