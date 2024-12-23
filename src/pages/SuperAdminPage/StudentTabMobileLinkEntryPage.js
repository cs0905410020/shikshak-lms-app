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
                {/* Main dashboard routes */}
                <Route path={`/dashboard/home`} component={StudentMobileDashboard} />
                <Route exact path={`/dashboard/student-profile-page`} component={ProfileMobileComponent} />
                <Route exact path={`/dashboard/student-progress-page`} component={StudentMobileProgressComponent} />
                <Route exact path={`/dashboard/student-history-topic-page`} component={StudentHistoryTopicMobileComponent} />
                <Route exact path={`/dashboard/student-search-topic-page`} component={StudentSearchTopicMobileComponent} />
                <Route exact path={`/dashboard/student-search-topic-page/:search`} component={StudentSearchTopicMobileComponent} />

                {/* Fallback redirect for undefined dashboard routes */}
                <Redirect to={`/dashboard/home`} />
            </Switch>
            {(history?.location?.pathname?.indexOf('subject-chapters') < 0 && history?.location?.pathname?.indexOf('chapter-topics') < 0 && history?.location?.pathname?.indexOf('student-search-topic-page') < 0 && history?.location?.pathname?.indexOf('chapter-test-detail') < 0 && history?.location?.pathname?.indexOf('chapter-test-main') < 0) ?
                <StudentAppFooterTabComponent/>
                : ''
            }
        </div>
    )
}
