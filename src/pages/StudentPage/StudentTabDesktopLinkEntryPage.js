import React from "react";
import {LeftSideBarComponent} from "../../components/LeftSideBarComponents/LeftSideBarComponent";
import {IonPage} from "@ionic/react";
import {Route,useRouteMatch,Redirect,Switch} from "react-router-dom";
import ProfileDesktopComponent from "../../components/ProfileComponent/ProfileDesktopComponent";
import {StudentDesktopProgressComponent} from "../../components/StudentComponent/StudentDesktopProgressComponent";
import StudentSearchTopicDesktopComponent from "../../components/StudentComponent/StudentSearchTopicDesktopComponent";
import StudentHistoryTopicDesktopComponent from "../../components/StudentComponent/StudentHistoryTopicDesktopComponent";
import {StudentDesktopDashboard} from "../../components/StudentComponent/StudentDexktopDashboard";

export default function StudentTabDesktopLinkEntryPage() {
    const { path } = useRouteMatch();
    return (
        <IonPage className={"main_padding_main_page dashboard_container"}>
            <div className={"row"}>
                <div className={"col-2"}>
                    <LeftSideBarComponent/>
                </div>
                <div className={"col-10"}>
                    <Switch>
                        {/* Main dashboard routes */}
                        <Route path={`/dashboard/home`} component={StudentDesktopDashboard} />
                        <Route exact path={`/dashboard/student-progress-page`} component={StudentDesktopProgressComponent} />
                        <Route exact path={`/dashboard/student-search-topic-page`} component={StudentSearchTopicDesktopComponent} />
                        <Route exact path={`/dashboard/student-profile-page`} component={ProfileDesktopComponent} />
                        <Route exact path={`/dashboard/student-history-topic-page`} component={StudentHistoryTopicDesktopComponent} />
                        {/* Catch-all redirect to home if no route matches */}
                        <Redirect to={`/dashboard/home`} />
                    </Switch>
                </div>
            </div>
        </IonPage>
    )
}