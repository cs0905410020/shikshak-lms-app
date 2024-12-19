import React, {useEffect} from "react";
import {IonContent, IonPage} from "@ionic/react";
import {useDispatch, useSelector} from "react-redux";
import {actionToGetAllUserListByCondition} from "../../actions/CommonAction";
import {AllAdminUserListComponent} from "../../components/SuperAdminComponent/AllAdminUserListComponent";

export default function AllAdminListPage(){
    const dispatch = useDispatch();
    const {userInfo} = useSelector((state) => state.userSignin);
    useEffect(()=>{
        const condition = ` role = 1 AND id != '${userInfo?.id}'`;
        dispatch(actionToGetAllUserListByCondition(condition));
    },[])
    return (
        <IonPage>
            <AllAdminUserListComponent/>
        </IonPage>
    )
}