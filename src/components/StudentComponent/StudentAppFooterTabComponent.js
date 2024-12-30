import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {signout} from "../../actions/CommonAction";
import {IonAlert} from "@ionic/react";
import {useRouteMatch,NavLink} from "react-router-dom";
import {isTeacherMasterLogin} from "../../middlewear/auth";
import useAuth from "../../hooks/useAuth";

function StudentAppFooterTabComponentFunction(){
    const dispatch = useDispatch();
    const [showAlert,setShowAlert] = useState(false);
    const { path } = useRouteMatch();
    const { setAuth } = useAuth();
    const logOutMe = ()=>{
        setAuth({});
        dispatch(signout());
    }
    return (
        <div className={"student_app_footer_tab_container"}>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header="Logout"
                message="Are you sure to logout?"
                buttons={
                    [
                        {
                            text: 'No',
                            role: 'cancel',
                            handler: () => {
                                setShowAlert(false)
                            },
                        },
                        {
                            text: 'Yes',
                            role: 'confirm',
                            handler: () => {
                                logOutMe();
                            },
                        },
                    ]
                }
            />
            <div className={"student_app_footer_tab_container_inner"}>
                <div className={"col"}>
                    <NavLink to={`${path}/home`} activeClassName={"active"} className={"student_app_footer_tab_loop"}>
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.771 31.771"><path d="M31.771 20.319c0-.474-.279-.87-.676-1.066V11.9c.09-.034.146-.119.145-.214s-.062-.179-.149-.21L15.92 6.125a.9.9 0 0 0-.601 0L.15 11.477c-.089.031-.149.115-.15.21s.056.18.144.214l15.148 5.896c.211.081.444.081.655 0l14.102-5.492v6.947a1.19 1.19 0 0 0-.675 1.065 1.2 1.2 0 0 0 .729 1.102c-.429.847-.729 2.585-.729 3.081a1.2 1.2 0 0 0 1.198 1.197 1.2 1.2 0 0 0 1.197-1.197c0-.496-.301-2.234-.729-3.081.43-.181.731-.608.731-1.1zM4.888 14.87l.002 4.009c0 3.158 4.753 5.729 10.73 5.89 5.976-.161 10.729-2.729 10.729-5.89l.002-4.009-10.406 4.051c-.211.082-.444.082-.655 0L4.888 14.87z"/></svg>
                    </NavLink>
                </div>
                {(isTeacherMasterLogin()) ?
                    <div className={"col"}>
                        <NavLink to={`${path}/all-student-progress-page`} activeClassName={"active"} className={"student_app_footer_tab_loop"}>
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.14 30.14"><path d="M0 24.881h30.14v5.256H0zM3.095 4.327h4.324v19.007H3.095zm6.643 4.947h4.329v14.061H9.738zm6.491-3.556h4.327v17.615h-4.327zm6.7-5.716h4.324v23.331h-4.324z"/></svg>
                        </NavLink>
                    </div>
                    :
                    <div className={"col"}>
                        <NavLink to={`${path}/student-progress-page`} activeClassName={"active"} className={"student_app_footer_tab_loop"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.14 30.14"><path d="M0 24.881h30.14v5.256H0zM3.095 4.327h4.324v19.007H3.095zm6.643 4.947h4.329v14.061H9.738zm6.491-3.556h4.327v17.615h-4.327zm6.7-5.716h4.324v23.331h-4.324z"/></svg>
                        </NavLink>
                    </div>
                }
                <div className={"col"}>
                    <NavLink to={`${path}/student-history-topic-page`} activeClassName={"active"} className={"student_app_footer_tab_loop"}>
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.998 2.5A9.503 9.503 0 0 0 3.378 8H5.75a.75.75 0 0 1 0 1.5H2a1 1 0 0 1-1-1V4.75a.75.75 0 0 1 1.5 0v1.697A10.997 10.997 0 0 1 11.998 1C18.074 1 23 5.925 23 12s-4.926 11-11.002 11C6.014 23 1.146 18.223 1 12.275a.75.75 0 0 1 1.5-.037 9.5 9.5 0 0 0 9.498 9.262c5.248 0 9.502-4.253 9.502-9.5s-4.254-9.5-9.502-9.5zm.502 4.75a.75.75 0 0 0-1.5 0v5.5c0 .27.144.518.378.651l3.5 2a.75.75 0 0 0 .744-1.302L12.5 12.315V7.25z"></path></svg>
                    </NavLink>
                </div>
            
                <div className={"col"}>
                    <NavLink to={`${path}/student-profile-page`} activeClassName={"active"} className={"student_app_footer_tab_loop"}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 0 0 9.3-35.2l-.9-2.6a443.74 443.74 0 0 0-79.7-137.9l-1.8-2.1a32.12 32.12 0 0 0-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 0 0-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 0 0-25.8 25.7l-15.8 85.4a351.86 351.86 0 0 0-99 57.4l-81.9-29.1a32 32 0 0 0-35.1 9.5l-1.8 2.1a446.02 446.02 0 0 0-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 0 0-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0 0 35.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0 0 25.8 25.7l2.7.5a449.4 449.4 0 0 0 159 0l2.7-.5a32.05 32.05 0 0 0 25.8-25.7l15.7-85a350 350 0 0 0 99.7-57.6l81.3 28.9a32 32 0 0 0 35.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9a283 283 0 0 1 0 92.2l-6.6 40.1 74.7 63.9a370.03 370.03 0 0 1-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 0 1-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 0 1 512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 0 1 400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390s58 11.6 79.2 32.8A111.6 111.6 0 0 1 624 502c0 29.9-11.7 58-32.8 79.2z"/></svg>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
export const StudentAppFooterTabComponent = React.memo(StudentAppFooterTabComponentFunction);
