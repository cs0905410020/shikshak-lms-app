import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {StudentDesktopDashboard} from "../../components/StudentComponent/StudentDexktopDashboard";
import {StudentMobileDashboard} from "../../components/StudentComponent/StudentMobileDashboard";
import {actionToGetAllStudentClassDataByClassSectionId} from "../../actions/CommonAction";

export default function StudentDashboard() {
    const windowResizeCount = useSelector((state) => state.windowResizeCount);
    const userInfo = useSelector((state) => state.userSignin.userInfo);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(actionToGetAllStudentClassDataByClassSectionId(userInfo?.school_class_with_section_id));
    },[])
    return (
        <>
            {(windowResizeCount >= 1200) ?
                <StudentDesktopDashboard/>
                :
                <StudentMobileDashboard/>
            }
        </>
    )
}
