import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import StudentHistoryTopicDesktopComponent from "../../components/StudentComponent/StudentHistoryTopicDesktopComponent";
import {actionToGetChaptersAllTopicsHistoryDataByUserId} from "../../actions/CommonAction";
import {StudentHistoryTopicMobileComponent} from "../../components/StudentComponent/StudentHistoryTopicMobileComponent";
export const StudentHistoryTopicPage = ()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(actionToGetChaptersAllTopicsHistoryDataByUserId())
    },[])
    const windowResizeCount = useSelector((state) => state.windowResizeCount);
    return (
        <>
            {(windowResizeCount >= 1200) ?
                <StudentHistoryTopicDesktopComponent/>
                :
                <StudentHistoryTopicMobileComponent/>
            }
        </>
    )
}