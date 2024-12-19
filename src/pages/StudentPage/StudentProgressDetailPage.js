import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actionToGetAllStudentClassDataByClassSectionId} from "../../actions/CommonAction";
import {StudentMobileProgressComponent} from "../../components/StudentComponent/StudentMobileProgressComponent";
import {StudentDesktopProgressComponent} from "../../components/StudentComponent/StudentDesktopProgressComponent";

export default function StudentProgressDetailPage() {
    const windowResizeCount = useSelector((state) => state.windowResizeCount);
    const userInfo = useSelector((state) => state.userSignin.userInfo);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(actionToGetAllStudentClassDataByClassSectionId(userInfo?.school_class_with_section_id));
    },[])
    return (
        <>
            {(windowResizeCount >= 800) ?
                <StudentDesktopProgressComponent/>
                :
                <StudentMobileProgressComponent/>
            }
        </>
    )
}
