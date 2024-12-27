import React, {useEffect} from 'react';
/*import {isSchoolMasterLogin, isStudentLogin, isSuperAdminLogin, isTeacherMasterLogin} from "../middlewear/auth";*/
import {IonReactRouter} from "@ionic/react-router";
import {Redirect, Route} from "react-router-dom";
import SuperAdminDashboard from "./SuperAdminPage/SuperAdminDashboard";

import {useDispatch, useSelector} from "react-redux";
import {getWebsocketConnectedMessage} from "../actions/helpers/WebSocketHelper";
import {w3cwebsocket as W3CWebSocket} from "websocket";
/*import {
    actionToGetAllClassSectionTypeData, actionToGetAllClassStandardData,
    actionToGetAllStudentClassDataByClassSectionId, actionToGetAllSyllabusTypeData,
} from "../actions/CommonAction";*/

import {IonRouterOutlet} from "@ionic/react";
// import $ from 'jquery';

import StudentTabCommonLinkEntryPage from "./StudentPage/StudentTabCommonLinkPage";
import TeacherTabCommonLinkEntryPage from "./TeacherMasterPage/TeacherTabCommonLinkEntryPage";

import SchoolMasterDashboard from "./SchoolMasterPage/SchoolMasterDashboard";
import UserProgressReportPage from "./SchoolMasterPage/UserProgressReportPage";
import AddNewTeacherFormPage from "./SchoolMasterPage/AddNewTeacherFormPage";
import AllTeacherUserListPage from "./TeacherMasterPage/AllTeacherUserListPage";
import AddNewStudentFormPage from "./SchoolMasterPage/AddNewStudentFormPage";
import AllStudentUserListPage from "./SchoolMasterPage/AllStudentUserListPage";
import AllStudentUserListProgressPage from "./SchoolMasterPage/AllStudentUserListProgressPage";
import AllTeacherUserListProgressPage from "./SchoolMasterPage/AllTeacherUserListProgressPage";
import AddNewSchoolFormPage from "./SuperAdminPage/AddNewSchoolFormPage";
import AllSchoolUserListPage from "./SuperAdminPage/AllSchoolUserListPage";
import AddNewSubjectFormPage from "./SuperAdminPage/AddNewSubjectFormPage";
import AllSubjectListPage from "./SuperAdminPage/AllSubjectListPage";
import AddNewChapterFormPage from "./SuperAdminPage/AddNewChapterFormPage";
import AllChapterListPage from "./SuperAdminPage/AllChapterListPage";
import AddNewTopicFormPage from "./SuperAdminPage/AddNewTopicFormPage";
import AllTopicListPage from "./SuperAdminPage/AllTopicListPage";
import AddNewAdminFormPage from "./SuperAdminPage/AddNewAdminFormPage";
import AllAdminListPage from "./SuperAdminPage/AllAdminListPage";
import ChangeMyPasswordPage from "./SuperAdminPage/ChangeMyPasswordPage";
import AddNewChapterWiseTestPage from "./SuperAdminPage/AddNewChapterWiseTestPage";


export const AppEnterMainPage = ()=>{
    const {userInfo} = useSelector((state) => state.userSignin);
    const dispatch = useDispatch();

    const TeacherMasterPrivateRoutes = () => {
        return (
            <IonReactRouter basename={"/app"}>
                <IonRouterOutlet>
                    <Route path="/dashboard" component={TeacherTabCommonLinkEntryPage} />
                    <Redirect exact from="/" to="/dashboard" />
                    <Route render={() => <Redirect to="/dashboard" />} />
                </IonRouterOutlet>
            </IonReactRouter>
        );
    }

    const StudentPrivateRoutes = () => {
        return (
            <IonReactRouter >
                <IonRouterOutlet>
                    {/* Redirect root to "/dashboard" */}
                    <Redirect exact from="/" to="/dashboard" />
                    {/* Route for dashboard */}
                    <Route path="/dashboard" component={StudentTabCommonLinkEntryPage} />
                    {/* Fallback redirect to "/dashboard" */}
                    <Route render={() => <Redirect to="/dashboard" />} />
                </IonRouterOutlet>
            </IonReactRouter>
        );
    }

    const SchoolMasterPrivateRoutes = () => {
        return (
            <IonReactRouter basename={"/app"}>
                <IonRouterOutlet>
                    <Route path="/dashboard" component={SchoolMasterDashboard} />
                    <Route path="/add-new-teacher"  component={AddNewTeacherFormPage} />
                    <Route path="/all-teacher-list"  component={AllTeacherUserListPage} />
                    <Route path="/add-new-student"  component={AddNewStudentFormPage} />
                    <Route path="/all-student-list"  component={AllStudentUserListPage} />
                    <Route path="/all-student-list-progress"  component={AllStudentUserListProgressPage} />
                    <Route path="/all-teacher-list-progress"  component={AllTeacherUserListProgressPage} />
                    <Route path="/user-progress-report/:id"  component={UserProgressReportPage} />
                    <Redirect exact from="/" to="/dashboard" />
                    <Route render={() => <Redirect to="/dashboard" />} />
                </IonRouterOutlet>
            </IonReactRouter>
        );
    }

    const SuperAdminPrivateRoutes = () => {
        return (
            <IonReactRouter basename={"/app"}>
                <IonRouterOutlet>
                    <Route path="/dashboard"  component={SuperAdminDashboard} />
                    <Route path="/add-new-school"  component={AddNewSchoolFormPage} />
                    <Route path="/all-school-list"  component={AllSchoolUserListPage} />
                    <Route path="/add-new-chapter-wise-test"  component={AddNewChapterWiseTestPage} />
                    <Route path="/add-new-subject"  component={AddNewSubjectFormPage} />
                    <Route path="/add-new-chapter"  component={AddNewChapterFormPage} />
                    <Route path="/add-new-topic"  component={AddNewTopicFormPage} />
                    <Route path="/add-new-admin"  component={AddNewAdminFormPage} />
                    <Route path="/change-my-password"  component={ChangeMyPasswordPage} />
                    <Route path="/all-subject-list"  component={AllSubjectListPage} />
                    <Route path="/all-chapter-list"  component={AllChapterListPage} />
                    <Route path="/all-topic-list"  component={AllTopicListPage} />
                    <Route path="/all-admin-list"  component={AllAdminListPage} />
                    <Redirect exact from="/" to="/dashboard" />
                    <Route render={() => <Redirect to="/dashboard" />} />
                </IonRouterOutlet>
            </IonReactRouter>
        );
    }


    useEffect(() => {
        getWebsocketConnectedMessage(W3CWebSocket,dispatch,userInfo);
        //dispatch(actionToGetAllStudentClassDataByClassSectionId(userInfo?.class_standard_id));
        //dispatch(actionToGetAllSyllabusTypeData());
       // dispatch(actionToGetAllClassSectionTypeData());
        //dispatch(actionToGetAllClassStandardData());
    }, []);

    return(
        <StudentPrivateRoutes/>
    )
}