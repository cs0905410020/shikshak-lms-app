import React from "react";
import {LeftSideBarComponent} from "../components/LeftSideBarComponents/LeftSideBarComponent";
import {IonPage} from "@ionic/react";
import {Route,useRouteMatch,Redirect,Switch} from "react-router-dom";
import ProfileDesktopComponent from "../components/ProfileComponent/ProfileDesktopComponent";
import {StudentDesktopProgressComponent} from "../components/StudentComponent/StudentDesktopProgressComponent";
import StudentSearchTopicDesktopComponent from "../components/StudentComponent/StudentSearchTopicDesktopComponent";
import StudentHistoryTopicDesktopComponent from "../components/StudentComponent/StudentHistoryTopicDesktopComponent";
import {StudentDesktopDashboard} from "../components/StudentComponent/StudentDexktopDashboard";

export default function StudentTabDesktopLinkEntryPage() {
    const { path } = useRouteMatch();
    return (
        <IonPage className={"main_padding_main_page dashboard_container"} >
            <div className={"row"}>
                <div className={"col-2"}>
                    <LeftSideBarComponent/>
                </div>
                <div className={"col-10"}>
                    <Switch>
                            <Route exact path={`${path}`} render={()=> (<Redirect to={`${path}/home`}/>)}></Route>
                            <Route path={`${path}/home`}>
                                <StudentDesktopDashboard/>
                            </Route>
                            <Route path={`${path}/student-profile-page`}>
                                <ProfileDesktopComponent/>
                            </Route>
                            <Route path={`${path}/student-progress-page`}>
                                <StudentDesktopProgressComponent/>
                            </Route>
                            <Route path={`${path}/student-search-topic-page`}>
                                <StudentSearchTopicDesktopComponent/>
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
