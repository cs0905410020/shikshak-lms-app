import React from "react";
import {Redirect, Route, Switch, useHistory, useRouteMatch} from "react-router-dom";
import ProfileMobileComponent from "../../components/ProfileComponent/ProfileMobileComponent";
import {StudentHistoryTopicMobileComponent} from "../../components/StudentComponent/StudentHistoryTopicMobileComponent";
import {StudentSearchTopicMobileComponent} from "../../components/StudentComponent/StudentSearchTopicMobileComponent";
import {StudentAppFooterTabComponent} from "../../components/StudentComponent/StudentAppFooterTabComponent";
import {TeacherMobileDashboard} from "../../components/TeacherMasterComponents/TeacherMobileDashboard";
import {TeacherMobileProgressComponent} from "../../components/TeacherMasterComponents/TeacherMobileProgressComponent";

export default function TeacherTabMobileLinkEntryPage() {
    const { path } = useRouteMatch();
    const history = useHistory();
    return (
        <div className={"student_app_dashboard_app_view_container"}>
            <Switch>
                <Route exact path={`${path}`} render={()=> (<Redirect to={`${path}/home`}/>)}></Route>
                <Route path={`${path}/home`}>
                    <TeacherMobileDashboard/>
                </Route>
                <Route path={`${path}/student-profile-page`}>
                    <ProfileMobileComponent isTeacherCompoent={true}/>
                </Route>
                <Route path={`${path}/all-student-progress-page`}>
                    <TeacherMobileProgressComponent/>
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
