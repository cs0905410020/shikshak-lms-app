import React from 'react';
import {useSelector} from "react-redux";
import {StudentSearchTopicMobileComponent} from "../../components/StudentComponent/StudentSearchTopicMobileComponent";
import StudentSearchTopicDesktopComponent from "../../components/StudentComponent/StudentSearchTopicDesktopComponent";
export const StudentSearchTopicPage = ()=>{
    const windowResizeCount = useSelector((state) => state.windowResizeCount);
    return (
        <>
            {(windowResizeCount >= 1200) ?
                <StudentSearchTopicDesktopComponent/>
                :
                <StudentSearchTopicMobileComponent/>
            }
        </>
    )
}