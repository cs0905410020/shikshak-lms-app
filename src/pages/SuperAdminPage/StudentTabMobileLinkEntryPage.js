import React from "react";
import {StudentAppFooterTabComponent} from "../../components/StudentComponent/StudentAppFooterTabComponent";
import {Redirect, Route, Switch, useHistory, useRouteMatch} from "react-router-dom";
import ProfileMobileComponent from "../../components/ProfileComponent/ProfileMobileComponent";
import {StudentMobileProgressComponent} from "../../components/StudentComponent/StudentMobileProgressComponent";
import {StudentHistoryTopicMobileComponent} from "../../components/StudentComponent/StudentHistoryTopicMobileComponent";
import {StudentMobileDashboard} from "../../components/StudentComponent/StudentMobileDashboard";
import {StudentSearchTopicMobileComponent} from "../../components/StudentComponent/StudentSearchTopicMobileComponent";

export default function StudentTabMobileLinkEntryPage() {
    const { path } = useRouteMatch();
    const history = useHistory();
    return (
        <div className={"student_app_dashboard_app_view_container"}>
            <Switch>
                <Route exact path={`${path}`} render={()=> (<Redirect to={`${path}/home`}/>)}></Route>
                <Route path={`${path}/home`}>
                    <StudentMobileDashboard/>
                </Route>
                <Route path={`${path}/student-profile-page`}>
                    <ProfileMobileComponent/>
                </Route>
                <Route path={`${path}/student-progress-page`}>
                    <StudentMobileProgressComponent/>
                </Route>
                <Route path={`${path}/student-history-topic-page`}>
                    <StudentHistoryTopicMobileComponent/>
                </Route>
                <Route exact path={`${path}/student-search-topic-page`}>
                    <StudentSearchTopicMobileComponent/>
                </Route>
                <Route exact path={`${path}/student-search-topic-page/:search`}>
                    <StudentSearchTopicMobileComponent/>
                </Route>
            </Switch>
            {(history?.location?.pathname?.indexOf('subject-chapters') < 0 && history?.location?.pathname?.indexOf('chapter-topics') < 0 && history?.location?.pathname?.indexOf('student-search-topic-page') < 0 && history?.location?.pathname?.indexOf('chapter-test-detail') < 0 && history?.location?.pathname?.indexOf('chapter-test-main') < 0) ?
                <StudentAppFooterTabComponent/>
                : ''
            }
        </div>
    )
}
