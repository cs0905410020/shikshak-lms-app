import React, {useEffect} from "react";
import {IonContent, IonPage} from "@ionic/react";
import {useDispatch} from "react-redux";
import {actionToGetAllUserListByCondition} from "../../actions/CommonAction";
import {AllStudentUserListProgressComponent} from "../../components/SchoolMasterComponent/AllStudentUserListProgressComponent";

export default function AllStudentUserListProgressPage(){
    const dispatch = useDispatch();
    useEffect(()=>{
        const condition = ` role = 4`;
        dispatch(actionToGetAllUserListByCondition(condition));
    },[])
    return (
        <IonPage>
            <AllStudentUserListProgressComponent/>
        </IonPage>
    )
}