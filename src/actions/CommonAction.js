import {
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNOUT,
    WINDOW_RESIZE_COUNT,
    ALL_SUBJECT_STUDENT_SCHOOL_REQUEST,
    ALL_SUBJECT_STUDENT_SCHOOL_SUCCESS,
    SUBJECT_ALL_CHAPTER_DATA_REQUEST,
    SUBJECT_ALL_CHAPTER_DATA_SUCCESS,
    SELECTED_CHAPTER_DATA_REQUEST,
    SELECTED_SUBJECT_DATA_REQUEST,
    SELECTED_SUBJECT_DATA_SUCCESS,
    SELECTED_CHAPTER_DATA_SUCCESS,
    CHAPTER_ALL_TOPICS_DATA_REQUEST,
    CHAPTER_ALL_TOPICS_DATA_SUCCESS,
    WAKEUP_ASSISTANT,
    ALL_SCHOOL_DATA_LIST_REQUEST,
    ALL_SCHOOL_DATA_LIST_SUCCESS,
    ALL_SYLLABUS_DATA,
    ALL_SUBJECT_DATA_LIST_REQUEST,
    ALL_SUBJECT_DATA_LIST_SUCCESS,
    ALL_CHAPTER_DATA_LIST_REQUEST,
    ALL_CHAPTER_DATA_LIST_SUCCESS,
    ALL_TOPIC_DATA_LIST_REQUEST,
    ALL_TOPIC_DATA_LIST_SUCCESS,
    USER_PROFILE_IN_EDIT_MODE,
    CHAT_DATA_JS_PROGRESS_DATA_SET_REQUEST,
    CHAT_DATA_JS_PROGRESS_DATA_SET_SUCCESS,
    CHAPTER_ALL_TOPICS_SEARCH_DATA_SUCCESS,
    CHAPTER_ALL_TOPICS_SEARCH_DATA_REQUEST,
    USER_HISTORY_CHAPTER_SUBJECT_TOPIC_DATA_REQUEST,
    USER_HISTORY_CHAPTER_SUBJECT_TOPIC_DATA_SUCCESS,
    CHAPTER_TOPICS_DATA_BY_TOPIC_ID_SUCCESS,
    VIDEO_PROGRESS_UPDATED,
    CHAPTER_ALL_TEST_DATA_REQUEST,
    CHAPTER_ALL_TEST_DATA_SUCCESS,
    TEST_ALL_QUESTION_OPTIONS_DATA_REQUEST,
    TEST_ALL_QUESTION_OPTIONS_DATA_SUCCESS,
    TEST_DATA_BY_TEST_ID_REQUEST,
    TEST_DATA_BY_TEST_ID_SUCCESS,
    TEACHER_ALL_CLASSES_DATA_REQUEST,
    TEACHER_ALL_CLASSES_DATA_SUCCESS,
    ALL_CLASS_SECTION_DATA,
    USER_CLASS_SUBJECT_DATA_REQUEST,
    USER_CLASS_SUBJECT_DATA_SUCCESS,
    ASSISTANT_SEARCH_TEST_FOR_SPEAK,
    ALL_CLASS_STANDARD_DATA,
    USER_VOICE_ASSISTANT_SELECTION, ALL_CLASS_STANDARD_GRADES_DATA_REQUEST, ALL_CLASS_STANDARD_GRADES_DATA_SUCCESS
} from "../constants/CommonConstants";
import {handleWebSocketEvent} from "./helpers/WebSocketHelper";
import {storeDataIntoLocalstorage} from "./helpers/LocalStorageHelper";
import {_generateUniqueIdForBlock} from "../helpers/CommonHelper";
import {callFunctionToStartTextToVoice} from "../helpers/VoiceAssistanceHelper";
import {cloneDeep} from "lodash";
import {getChartDataByFormat, modifyHistoryUserData} from "./helpers/CommonHelper";
import {api} from "../hooks/api/ApiConfig";

export const actionToGetUserProfileData = () => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST });
    try {
        api.post(`users/get-user-profile`,{}).then(response=>{
            let userData = response.data;
            dispatch({ type: USER_SIGNIN_SUCCESS, payload: userData});
            // switch (Number(userData?.userData?.role)){
            //     case 1:
            //         localStorage.setItem('superAdminAuthentication',JSON.stringify(userData.userData));
            //         break;
            //     case 2:
            //         localStorage.setItem('schoolMasterAuthentication',JSON.stringify(userData.userData));
            //         break;
            //     case 3:
            //         localStorage.setItem('teacherMasterAuthentication',JSON.stringify(userData.userData));
            //         break;
            //     case 4:
            //         localStorage.setItem('studentAuthentication',JSON.stringify(userData.userData));
            //         break;
            // }
        })
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}
export const handleWebSocketEventCall = (data) => async (dispatch,getState) => {
    handleWebSocketEvent(dispatch,getState(),data);
}
export const signout = () => (dispatch) => {
    document.location.href = '/';
    localStorage.removeItem('accessToken');
    setTimeout(function(){
        dispatch({ type: USER_SIGNOUT });
    },1000)
};

export const callInsertDataFunction = (payload) => async () => {
    try {
        const { data } = await api.post('common/insertCommonApiCall',payload);
        return data;
    } catch (error) {
        console.log(error,'error');
    }
}

export const commonUpdateFunction = (payload) => async () => {
    try {
        const { data } = await api.post('common/updateCommonApiCall',payload);
        return data;
    } catch (error) {
        console.log(error,'error');
    }
}

export const callDeleteDataFunction = (payload) => async () => {
    try {
        const { data } = await api.post('common/deleteCommonApiCall',payload);
        return data;
    } catch (error) {
        console.log(error,'error');
    }
}
export const actionToGetAllClassStandardGradesData = () => async (dispatch) => {
    const {data} = await api.post(`curriculum/get-grades-subject`, {});
    dispatch({type: ALL_CLASS_STANDARD_GRADES_DATA_SUCCESS, payload: [...data]});
}
export const actionToGetSubjectAllChapterDataById = (subjectId) => async (dispatch,getState) => {
    const {prevId} = getState().subjectAllChapterData;

    if(prevId != subjectId) {
        dispatch({type: SUBJECT_ALL_CHAPTER_DATA_REQUEST, payload:subjectId });
        const {data} = await api.post(`curriculum/get-grades-subject-curriculum`, {
            subjectId
        });
        dispatch({type: SUBJECT_ALL_CHAPTER_DATA_SUCCESS, payload: [...data]});
    }
}
export const actionToSetWindowSizeCount = (count) => async (dispatch) => {
    dispatch({type: WINDOW_RESIZE_COUNT, payload:count});
}
export const actionToChangeUserVoiceAssistantSelection = (name) => async (dispatch) => {
    dispatch({type: USER_VOICE_ASSISTANT_SELECTION, payload:name});
    localStorage.setItem('userVoiceAssistantSelection',name);
}
export const actionToSetUserProfileInEditMode = (action) => (dispatch) => {
    dispatch({type: USER_PROFILE_IN_EDIT_MODE, payload:action});
}
/*export const actionToGetAllSyllabusTypeData = () => async (dispatch) => {
    const {data} = await api.post(`common/actionToGetAllSyllabusTypeDataApiCall`);
    dispatch({type: ALL_SYLLABUS_DATA, payload:[...data?.response]});
}
export const actionToGetAllClassSectionTypeData = () => async (dispatch) => {
    const {data} = await api.post(`common/actionToGetAllClassSectionTypeDataApiCall`);
    dispatch({type: ALL_CLASS_SECTION_DATA, payload:[...data?.response]});
}
export const actionToGetAllClassStandardData = () => async (dispatch) => {
    const {data} = await api.post(`common/actionToGetAllClassStandardDataApiCall`);
    dispatch({type: ALL_CLASS_STANDARD_DATA, payload:[...data?.response]});
}*/
export const actionToGetTeacherAllClassesData = (teacherId,schoolId) => async (dispatch,getState) => {
    const {prevId} = getState().teacherAllClassesData;

    if(prevId != teacherId) {
        ///// Store in local storage
        if (!localStorage.getItem('TEACHER_ALL_CLASSES_DATA'))
            dispatch({type: TEACHER_ALL_CLASSES_DATA_REQUEST, payload: teacherId});
        ///// Store in local storage

        const {data} = await api.post(`common/actionToGetTeacherAllClassesDataApiCall`, {
            teacherId: teacherId,
            schoolId: schoolId,
        });
        storeDataIntoLocalstorage('classes', data?.response);
        dispatch({type: TEACHER_ALL_CLASSES_DATA_SUCCESS, payload: [...data?.response]});
    }
}
export const actionToGetUserAllClassesSubjectData = (userId) => async (dispatch) => {
    dispatch({type: USER_CLASS_SUBJECT_DATA_REQUEST});
    const {data} = await api.post(`common/actionToGetUserAllClassesSubjectDataApiCall`, {userId: userId,});
    dispatch({type: USER_CLASS_SUBJECT_DATA_SUCCESS, payload: data?.response});
}
export const actionToGetAllStudentClassDataByClassSectionId = (classStandardId) => async (dispatch,getState) => {
    const userInfo = getState().userSignin.userInfo;
    const {prevId} = getState().allSubjectStudentClassSectionWise;

    if(prevId != classStandardId && classStandardId) {
        ///// Store in local storage
        if (!localStorage.getItem('ALL_SUBJECT_STUDENT_SCHOOL'))
            dispatch({type: ALL_SUBJECT_STUDENT_SCHOOL_REQUEST, payload: classStandardId});
        ///// Store in local storage

        const {data} = await api.post(`common/actionToGetAllStudentClassDataByClassSectionIdApiCall`, {
            classStandardId: classStandardId,
            userId: userInfo.id,
            schoolSyllabusId: userInfo?.school_syllabus_id
        });
        storeDataIntoLocalstorage('subject', data?.response);
        dispatch({type: ALL_SUBJECT_STUDENT_SCHOOL_SUCCESS, payload: [...data?.response]});
    }
}
export const actionToSetTopicDataById = (data) => async (dispatch) => {
    console.log(data,'data');
    dispatch({type: CHAPTER_TOPICS_DATA_BY_TOPIC_ID_SUCCESS, payload:cloneDeep(data)});
}
export const actionToSetVideoProgressUpdate = (data) => async (dispatch) => {
    dispatch({type: VIDEO_PROGRESS_UPDATED, payload:data});
}
export const actionToGetTestDataByTestId = (testId) => async (dispatch,getState) => {
    const {prevId} = getState().selectedTestDataByTestId;
    if(prevId != testId) {
        dispatch({type: TEST_DATA_BY_TEST_ID_REQUEST, payload:testId});
        const {data} = await api.post(`common/actionToGetTestDataByTestIdApiCall`, {testId});
        dispatch({type: TEST_DATA_BY_TEST_ID_SUCCESS, payload: data?.response});
    }
}
export const actionToGetChapterAllTopicDataById = (chapterId,topicId) => async (dispatch,getState) => {
    const userInfo = getState().userSignin.userInfo;

    const {prevId} = getState().chapterAllTopicsData;
    const {topicsData} = getState().chapterAllTopicsData;

    if(prevId !== chapterId) {
        dispatch({type: CHAPTER_ALL_TOPICS_DATA_REQUEST, payload: chapterId});
        const {data} = await api.post(`curriculum/get-curriculum-content-by-id`, {
            chapterId,
            userId: userInfo?.id
        });
        dispatch({type: CHAPTER_ALL_TOPICS_DATA_SUCCESS, payload: [...data]});
        let foundIndex = null;
        data?.map((topic, key) => {
            if (Number(topic?.id) === Number(topicId)) {
                foundIndex = key;
            }
        })
        if (foundIndex !== null) {
            let topiData = cloneDeep(data[foundIndex]);
            dispatch(actionToSetTopicDataById(cloneDeep(topiData)));
        }
    }else{
        let foundIndex = null;
        topicsData?.map((topic, key) => {
            if (topic?.id === topicId) {
                foundIndex = key;
            }
        })
        if (foundIndex !== null) {
            let topiDataFinal = cloneDeep(topicsData[foundIndex]);
            dispatch(actionToSetTopicDataById(cloneDeep(topiDataFinal)));
        }
    }
}
export const actionToGetChaptersAllTopicsHistoryDataByUserId = () => async (dispatch,getState) => {
    dispatch({type: USER_HISTORY_CHAPTER_SUBJECT_TOPIC_DATA_REQUEST,payload:'actionToGetChaptersAllTopicsHistoryDataByUserId'});
    const {data} = await api.post(`curriculum/get-chapters-all-topics-history-data`);
    let finalData = modifyHistoryUserData(data);
    dispatch({type: USER_HISTORY_CHAPTER_SUBJECT_TOPIC_DATA_SUCCESS, payload: [...finalData]});
}
export const actionToGetChapterAllTopicDataBySearchData = (searchData,limitData) => async (dispatch,getState) => {
    if(searchData?.trim()?.length) {
        const userInfo = getState().userSignin.userInfo;
        dispatch({type: CHAPTER_ALL_TOPICS_SEARCH_DATA_REQUEST});
        let condition = `curriculum_content.name LIKE '%${searchData}%'`;
        let limitQuery = `LIMIT ${limitData} OFFSET 0`;
        const {data} = await api.post(`curriculum/get-curriculum-content-by-id`, {
            searchData,
            condition,
            limitQuery,
            userId: userInfo?.id
        });
        dispatch({type: CHAPTER_ALL_TOPICS_SEARCH_DATA_SUCCESS, payload: [...data]});
    }else{
        dispatch({type: CHAPTER_ALL_TOPICS_SEARCH_DATA_SUCCESS, payload: []});
    }
}
export const actionToGetChapterAllTopicDataBySearchDataLoadMore = (searchData,limitData,limitOffset) => async (dispatch,getState) => {
    const userInfo = getState().userSignin.userInfo;
    const chapterAllTopicsSearchData = getState().chapterAllTopicsSearchData.topicsData;
    let condition = `chapter_wise_video_lessons.name LIKE '%${searchData}%' OR chapter_wise_video_lessons.description LIKE '%${searchData}%'`;
    let limitQuery = `LIMIT ${limitData} OFFSET ${limitOffset}`;
    const {data} = await api.post(`curriculum/get-curriculum-content-by-id`, {
        condition,
        limitQuery,
        userId: userInfo?.id
    });
    dispatch({type: CHAPTER_ALL_TOPICS_SEARCH_DATA_SUCCESS, payload: [...chapterAllTopicsSearchData,...data]});
}
export const actionToGetAllUserListByCondition = (condition) => async (dispatch) => {
    dispatch({type: ALL_SCHOOL_DATA_LIST_REQUEST});
    const {data} = await api.post(`common/actionToGetAllUserListByConditionApiCall`,{condition});
    dispatch({type: ALL_SCHOOL_DATA_LIST_SUCCESS, payload:[...data?.response]});
}
export const actionToGetAllSubjectDataListByCondition = () => async (dispatch) => {
    dispatch({type: ALL_SUBJECT_DATA_LIST_REQUEST});
    const {data} = await api.post(`common/actionToGetAllSubjectDataListApiCall`);
    dispatch({type: ALL_SUBJECT_DATA_LIST_SUCCESS, payload:[...data?.response]});
}
export const actionToGetAllChapterListData = () => async (dispatch) => {
    dispatch({type: ALL_CHAPTER_DATA_LIST_REQUEST});
    const {data} = await api.post(`common/actionToGetAllChapterListDataApiCall`);
    dispatch({type: ALL_CHAPTER_DATA_LIST_SUCCESS, payload:[...data?.response]});
}
export const actionToGetAllTopicListData = () => async (dispatch) => {
    dispatch({type: ALL_TOPIC_DATA_LIST_REQUEST});
    const {data} = await api.post(`common/actionToGetAllTopicListDataApiCall`);
    dispatch({type: ALL_TOPIC_DATA_LIST_SUCCESS, payload:[...data?.response]});
}
export const actionToGetSubjectDataBySubjectId = (subjectId) => async (dispatch,getState) => {
    const selectedSubject = getState().selectedSubjectData.selectedSubject;

    if(!selectedSubject?.id)
        dispatch({type: SELECTED_SUBJECT_DATA_REQUEST});

    const {data} = await api.post(`curriculum/get-subjects`,{subjectId});
    console.log(data,'data')
    dispatch({type: SELECTED_SUBJECT_DATA_SUCCESS, payload:subjectId ? data && data[0] : data});
}
export const actionToGetChapterDataByChapterId = (chapterId) => async (dispatch,getState) => {
    const selectedChapter = getState().selectedChapterData.selectedChapter;
    const {prevId} = getState().selectedChapterData;

    if(prevId != chapterId) {
        if (!selectedChapter?.id)
            dispatch({type: SELECTED_CHAPTER_DATA_REQUEST, payload:chapterId});

        const {data} = await api.post(`curriculum/get-curriculum-by-id`, {chapterId});
        console.log(data,'data')
        dispatch({type: SELECTED_CHAPTER_DATA_SUCCESS, payload: chapterId ? data && data[0] : ''});
    }
}
export const actionToGetChaptersAllTestDataById = (chapterId) => async (dispatch,getState) => {
    const {prevId} = getState().allChapterTestData;

    if(prevId != chapterId) {
        dispatch({type: CHAPTER_ALL_TEST_DATA_REQUEST, payload:chapterId});
        const {data} = await api.post(`common/actionToGetChaptersAllTestDataByIdApiCall`, {chapterId});
        dispatch({type: CHAPTER_ALL_TEST_DATA_SUCCESS, payload: data?.response});
    }
}
export const actionToGetTestQuestionsAndOptionsDataById = (testId) => async (dispatch,getState) => {
    const {prevId} = getState().testAllQuestionOptionsData;

    if(prevId != testId) {
        dispatch({type: TEST_ALL_QUESTION_OPTIONS_DATA_REQUEST, payload: testId});
        const {data} = await api.post(`common/actionToGetTestQuestionsAndOptionsDataByIdApiCall`, {testId});
        dispatch({type: TEST_ALL_QUESTION_OPTIONS_DATA_SUCCESS, payload: data?.response});
    }
}
export const actionToCallFunctionToValidatePassword = (value) => async () => {
    const {data} = await api.post(`common/actionToCallFunctionToValidatePasswordApiCall`,{password:value});
    return data;
}
export const actionToGetChartDataJsProgressDataSet = (subjectId,student) => async (dispatch) => {
    dispatch({type: CHAT_DATA_JS_PROGRESS_DATA_SET_REQUEST});
    let url = `curriculum/get-chart-data-js-progress`;
    if(subjectId){
        url = `curriculum/get-chart-data-js-progress-data`;
    }

    const {data} = await api.post(url,{subject_id:subjectId});
    const dataSet = getChartDataByFormat(data);
    setTimeout(function (){
        dispatch({type: CHAT_DATA_JS_PROGRESS_DATA_SET_SUCCESS, payload:cloneDeep(dataSet)});
    })
}
export const actionToAddNewUserInDb = (payload) => async (dispatch,getState) => {
    const userInfo = getState().userSignin.userInfo;
    const aliasArray = ['?','?','?','?','?','?','?','?','?','?','?'];
    const columnArray = ['id','name','email','role','avatar','created_by','panel_password','mobile','school_class_with_section_id','syllabus_type','school_id'];
    const valuesArray = [payload?.id,payload.name,payload.email,payload?.role,payload?.avatar,userInfo?.id,payload?.password,payload?.mobile,payload?.school_class_with_section_id,payload?.syllabus_type,payload?.school_id];
    const insertData = {alias:aliasArray,column:columnArray,values:valuesArray,tableName:'app_user'};
    await dispatch(callInsertDataFunction(insertData));
}
export const actionToSubmitTestReport = (testId,score) => async (dispatch,getState) => {
    const userInfo = getState().userSignin.userInfo;
    const aliasArray = ['?','?','?'];
    const columnArray = ['student_id','test_id','score'];
    const valuesArray = [userInfo?.id,testId,score];
    const insertData = {alias:aliasArray,column:columnArray,values:valuesArray,tableName:'student_test_result_data'};
    await dispatch(callInsertDataFunction(insertData));
}
export const actionToAddNewSubjectInDb = (payload) => async (dispatch,getState) => {
    const userInfo = getState().userSignin.userInfo;
    const aliasArray = ['?','?','?','?'];
    const columnArray = ['syllabus_type_id','subject_name','created_by','class_standard_id'];
    const valuesArray = [payload?.syllabus_type_id,payload.name,userInfo?.id,payload?.class_standard_id];
    const insertData = {alias:aliasArray,column:columnArray,values:valuesArray,tableName:'class_wise_subject'};
    await dispatch(callInsertDataFunction(insertData));
}
export const actionToAddNewTopicInDb = (payload) => async (dispatch,getState) => {
    const userInfo = getState().userSignin.userInfo;
    const aliasArray = ['?','?','?','?','?','?','?'];
    const columnArray = ['name','description','video_url','poster_url','video_duration_in_seconds','chapter_id','created_by'];
    const valuesArray = [payload.name,payload?.description,payload?.video_url,payload?.poster_url,payload?.video_duration_in_seconds,payload?.chapter_id,userInfo?.id];
    const insertData = {alias:aliasArray,column:columnArray,values:valuesArray,tableName:'chapter_wise_video_lessons'};
    await dispatch(callInsertDataFunction(insertData));
}
export const actionToAddNewTestDataInDb = (payload) => async (dispatch,getState) => {
    const userInfo = getState().userSignin.userInfo;
    const id = _generateUniqueIdForBlock()+'-'+_generateUniqueIdForBlock()+'-'+_generateUniqueIdForBlock()+'-'+_generateUniqueIdForBlock();
    let aliasArray = ['?','?','?','?','?','?'];
    let columnArray = ['id','name','description','time_in_seconds','chapter_id','created_by'];
    let valuesArray = [id,payload.name,payload?.description,payload?.time_in_seconds,payload?.chapter_id,userInfo?.id];
    let insertData = {alias:aliasArray,column:columnArray,values:valuesArray,tableName:'chapter_wise_test'};
    dispatch(callInsertDataFunction(insertData));

    payload?.questionOptionsArray?.map((testQuestions)=>{
        aliasArray = ['?','?','?','?','?','?','?','?'];
        columnArray = ['question','option_1','option_2','option_3','option_4','answer','answer_explain','chapter_wise_test_id'];
        valuesArray = [testQuestions?.question,testQuestions.option1,testQuestions?.option2,testQuestions?.option3,testQuestions?.option4,testQuestions?.answer,testQuestions?.answerExplanation,id];
        insertData = {alias:aliasArray,column:columnArray,values:valuesArray,tableName:'chapter_wise_test_options'};
        dispatch(callInsertDataFunction(insertData));
    })
}
export const actionToAddNewChapterInDb = (payload) => async (dispatch,getState) => {
    const userInfo = getState().userSignin.userInfo;
    const aliasArray = ['?','?','?','?','?'];
    const columnArray = ['subject_id','name','description','icon','created_by'];
    const valuesArray = [payload.subjectId,payload.name,payload.description,payload.icon,userInfo?.id];
    const insertData = {alias:aliasArray,column:columnArray,values:valuesArray,tableName:'subject_wise_chapter'};
    return await dispatch(callInsertDataFunction(insertData));
}
export const actionToUpdateNewUserLocally = (payload) => async (dispatch,getState) => {
    const allSchoolDataList = getState().allSchoolDataList.schoolData;
    let foundIndex = null;
    allSchoolDataList?.map((school,index)=>{
        if(school?.id?.toString() === payload?.id?.toString()){
            foundIndex = index;
        }
    })
    if(foundIndex !== null) {
        allSchoolDataList[foundIndex] = payload;
        dispatch({type: ALL_SCHOOL_DATA_LIST_SUCCESS, payload:[...allSchoolDataList]});
    }
}
export const actionToUpdateNewUserInDb = (payload) => async (dispatch) => {
    dispatch(actionToUpdateNewUserLocally(payload));
    const setData = `name = ?,email = ?,mobile = ?,panel_password = ?,syllabus_type=?,avatar=?,is_active=?`;
    const whereCondition = `id = '${payload.id}'`;
    const value = [payload.name,payload?.email,payload?.mobile,payload?.password,payload?.syllabus_type,payload?.avatar,payload?.is_active];
    const dataToSend = {column: setData, value, whereCondition, tableName: 'app_user'};
    return await dispatch(commonUpdateFunction(dataToSend));
}
export const actionToUpdateUserProfileDataLocally = (payload) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: cloneDeep(payload)});
    localStorage.setItem('userInfo',JSON.stringify(payload));
}
export const actionToUpdateUserProfileData = (payload) => async (dispatch) => {
    const setData = `name = ?,email = ?,mobile = ?,address = ?,gender=?,dob=?,avatar=?`;
    const whereCondition = `id = '${payload.id}'`;
    const value = [payload.name,payload?.email,payload?.mobile,payload?.address,payload?.gender,payload?.dob,payload?.avatar];
    const dataToSend = {column: setData, value, whereCondition, tableName: 'app_user'};
    await dispatch(commonUpdateFunction(dataToSend));
    dispatch(actionToUpdateUserProfileDataLocally(payload));
    return 1;
}
export const actionToUpdateUserPasswordInDb = (payload) => async (dispatch) => {
    dispatch(actionToUpdateNewUserLocally(payload));
    const setData = `password = ?`;
    const whereCondition = `id = '${payload.id}'`;
    const value = [payload.password];
    const dataToSend = {column: setData, value, whereCondition, tableName: 'app_user'};
    return await dispatch(commonUpdateFunction(dataToSend));
}
export const actionToUpdateSubjectInDbLocally = (payload) => async (dispatch,getState) => {
    const allSubjectDataList = getState().allSubjectDataList.subjectData;
    let foundIndex = null;
    allSubjectDataList?.map((school,index)=>{
        if(school?.id?.toString() === payload?.id?.toString()){
            foundIndex = index;
        }
    })
    if(foundIndex !== null) {
        allSubjectDataList[foundIndex] = payload;
        dispatch({type: ALL_SUBJECT_DATA_LIST_SUCCESS, payload:[...allSubjectDataList]});
    }
}
export const actionToUpdateSubjectInDb = (payload) => async (dispatch) => {
    dispatch(actionToUpdateSubjectInDbLocally(payload));
    const setData = `subject_name = ?`;
    const whereCondition = `id = '${payload.id}'`;
    const value = [payload.name];
    const dataToSend = {column: setData, value, whereCondition, tableName: 'class_wise_subject'};
    return await dispatch(commonUpdateFunction(dataToSend));
}
export const actionToUpdateChapterInDbLocally = (payload) => async (dispatch,getState) => {
    const allChapterDataList = getState().allChapterDataList.chapterData;
    let foundIndex = null;
    allChapterDataList?.map((school,index)=>{
        if(school?.id?.toString() === payload?.id?.toString()){
            foundIndex = index;
        }
    })
    if(foundIndex !== null) {
        allChapterDataList[foundIndex] = payload;
        dispatch({type: ALL_CHAPTER_DATA_LIST_SUCCESS, payload:[...allChapterDataList]});
    }
}
export const actionToUpdateChapterInDb = (payload) => async (dispatch) => {
    dispatch(actionToUpdateChapterInDbLocally(payload));
    const setData = `name = ?,description = ?,icon = ?,subject_id = ?`;
    const whereCondition = `id = '${payload.id}'`;
    const value = [payload.name,payload.description,payload.icon,payload.subject_id];
    const dataToSend = {column: setData, value, whereCondition, tableName: 'subject_wise_chapter'};
    return await dispatch(commonUpdateFunction(dataToSend));
}
export const actionToUpdateTopicInDbLocally = (payload) => async (dispatch,getState) => {
    const allTopicDataList = getState().allTopicDataList.topicData;
    let foundIndex = null;
    allTopicDataList?.map((school,index)=>{
        if(school?.id?.toString() === payload?.id?.toString()){
            foundIndex = index;
        }
    })
    if(foundIndex !== null) {
        allTopicDataList[foundIndex] = payload;
        dispatch({type: ALL_TOPIC_DATA_LIST_SUCCESS, payload:[...allTopicDataList]});
    }
}
export const actionToUpdateTopicInDb = (payload) => async (dispatch) => {
    dispatch(actionToUpdateTopicInDbLocally(payload));
    const setData = `name = ?,description = ?,video_url = ?,poster_url = ?,video_duration_in_seconds = ?,chapter_id = ?`;
    const whereCondition = `id = '${payload.id}'`;
    const value = [payload.name,payload.description,payload.video_url,payload.poster_url,payload.video_duration_in_seconds,payload.chapter_id];
    const dataToSend = {column: setData, value, whereCondition, tableName: 'chapter_wise_video_lessons'};
    return await dispatch(commonUpdateFunction(dataToSend));
}
export const actionToToSetTotalVideoProgressPlayedDataLocally = (payload,seconds) => async (dispatch,getState) => {
    let lessonCompletedPercentage = ((100/payload.video_duration_in_seconds)*seconds);
    payload.progress_time_last_watched = seconds;
    payload.lesson_completed_percentage = lessonCompletedPercentage;

    const topicsData = getState().chapterAllTopicsData.topicsData;
    let index = null;
    topicsData?.map((topic,key)=>{
        if(topic?.id === payload?.id) {
            index = key;
        }
    })
    if(index !== null) {
        topicsData[index] = payload;
        dispatch({type: CHAPTER_ALL_TOPICS_DATA_SUCCESS, payload:[...topicsData]});
    }
}
export const actionToToGetApiResponseForTextSearch = (text,callFunctionToGetCommandsForTextSpeech,TextToSpeech,voices) => async (dispatch,getState) => {
    const wakeupAssistant = getState().wakeupAssistant;
    if(wakeupAssistant) {
        dispatch(actionToAddAssistantSearchTestForSpeak('Searching...'));
        const {data} = await api.post(`common/actionToToGetApiResponseForTextSearchApiCall`, {searchText: text});
        if (data?.response?.organic_results?.length) {
            callFunctionToGetCommandsForTextSpeech(data.response.organic_results[0].snippet,TextToSpeech,voices);
        }else{
            callFunctionToGetCommandsForTextSpeech('Sorry no result found',TextToSpeech,voices);
        }
    }
}
export const actionToWakeupAssistant = (action) => async (dispatch) => {
    dispatch({type: WAKEUP_ASSISTANT, payload:action});
}
export const actionToAddAssistantSearchTestForSpeak = (action) => async (dispatch) => {
    dispatch({type: ASSISTANT_SEARCH_TEST_FOR_SPEAK, payload:action});
}
export const actionToOpenVoiceBot = (setLypSyncType,isNativePlatform,TextToSpeech,voices) => async (dispatch,getState) => {
    const wakeupAssistant = getState().wakeupAssistant;
    const userInfo = getState().userSignin.userInfo;
    if(!wakeupAssistant) {
        dispatch(actionToWakeupAssistant(true))
        let text = `Hello ${userInfo?.name}`;
        setTimeout(function(){
            callFunctionToStartTextToVoice(text,setLypSyncType,isNativePlatform,TextToSpeech,voices,dispatch);
        })
    }
}
export const actionToGetCommandsForTextSpeech = (text, setLypSyncType,isNativePlatform,TextToSpeech,voices) => async (dispatch,getState) => {
    const wakeupAssistant = getState().wakeupAssistant;
    if(wakeupAssistant){
        callFunctionToStartTextToVoice(text,setLypSyncType,isNativePlatform,TextToSpeech,voices,dispatch);
    }
}

export const actionToToSetTotalVideoProgressPlayedData = (payload) => async (dispatch,getState) => {
    const videoProgressUpdate = getState().videoProgressUpdate;
    if(videoProgressUpdate){
        const userInfo = getState().userSignin.userInfo;
        dispatch(actionToToSetTotalVideoProgressPlayedDataLocally(payload,videoProgressUpdate));
        if(payload.school_students_topic_progress_id) {
            const setData = `progress_time_last_watched = ?,updated_at = ?`;
            const whereCondition = `id = '${payload.school_students_topic_progress_id}'`;
            const value = [videoProgressUpdate,new Date().toISOString()];
            const dataToSend = {column: setData, value, whereCondition, tableName: 'curriculum_content_progress'};
            dispatch(commonUpdateFunction(dataToSend));
        }else{
            const school_students_topic_progress_id = _generateUniqueIdForBlock()+'-'+_generateUniqueIdForBlock()+'-'+_generateUniqueIdForBlock();
            const aliasArray = ['?','?','?','?'];
            const columnArray = ['id','topic_id','progress_time_last_watched','created_by'];
            const valuesArray = [school_students_topic_progress_id,payload.id,videoProgressUpdate,userInfo?.id];
            const insertData = {alias:aliasArray,column:columnArray,values:valuesArray,tableName:'curriculum_content_progress'};
            dispatch(callInsertDataFunction(insertData));
            payload.school_students_topic_progress_id = school_students_topic_progress_id;
        }
        //dispatch(actionToGetAllStudentClassDataByClassSectionId(userInfo?.class_standard_id));
    }
}
