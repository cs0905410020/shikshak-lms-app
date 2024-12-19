import React from "react";
import {IonPage} from "@ionic/react";
import {Route,useRouteMatch,Redirect,Switch} from "react-router-dom";
import {LeftSideBarComponent} from "../../components/LeftSideBarComponents/LeftSideBarComponent";
import {TeacherDesktopDashboard} from "../../components/TeacherMasterComponents/TeacherDesktopDashboard";
import {TeacherDesktopProgressComponent} from "../../components/TeacherMasterComponents/TeacherDesktopProgressComponent";
import StudentSearchTopicDesktopComponent from "../../components/StudentComponent/StudentSearchTopicDesktopComponent";
import ProfileDesktopComponent from "../../components/ProfileComponent/ProfileDesktopComponent";
import StudentHistoryTopicDesktopComponent from "../../components/StudentComponent/StudentHistoryTopicDesktopComponent";

export default function TeacherTabDesktopLinkEntryPage() {
    const { path } = useRouteMatch();
    return (
        <IonPage className={"main_padding_main_page dashboard_container"}>
            <div className={"row"}>
                <div className={"col-2"}>
                    <LeftSideBarComponent isTeacherLeftSideBar={true}/>
                </div>
                <div className={"col-10"}>
                    <Switch>
                        <Route exact path={path} render={()=> (<Redirect to={`${path}/home`}/>)}></Route>
                        <Route path={`${path}/home`}>
                            <TeacherDesktopDashboard/>
                        </Route>
                        <Route path={`${path}/all-student-progress-page`}>
                            <TeacherDesktopProgressComponent/>
                        </Route>
                        <Route path={`${path}/student-search-topic-page`}>
                            <StudentSearchTopicDesktopComponent/>
                        </Route>
                        <Route path={`${path}/student-profile-page`}>
                            <ProfileDesktopComponent/>
                        </Route>
                        <Route path={`${path}/student-history-topic-page`}>
                            <StudentHistoryTopicDesktopComponent/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </IonPage>
    )
}