import React, {useEffect} from "react";
import {IonPage} from "@ionic/react";
import {actionToGetAllChapterListData} from "../../actions/CommonAction";
import {useDispatch} from "react-redux";
import {AddNewChapterWiseTestComponentBody} from "../../components/SuperAdminComponent/AddNewChapterWiseTestComponentBody";

export default function AddNewChapterWiseTestPage(){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(actionToGetAllChapterListData());
    },[])
    return (
        <IonPage>
            <AddNewChapterWiseTestComponentBody/>
        </IonPage>
    )
}