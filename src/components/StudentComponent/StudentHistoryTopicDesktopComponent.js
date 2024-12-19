import React, {useEffect} from "react";
import {StudentHistoryTopicDesktopMainBodyComponent} from "./StudentHistoryTopicDesktopMainBodyComponent";
import {useDispatch} from "react-redux";
import {actionToGetChaptersAllTopicsHistoryDataByUserId} from "../../actions/CommonAction";

export default function StudentHistoryTopicDesktopComponent(){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(actionToGetChaptersAllTopicsHistoryDataByUserId());
    },[])
    return (
        <div className={"main_body_content_section_for_history_page"}>
            <StudentHistoryTopicDesktopMainBodyComponent/>
        </div>
    )
}




