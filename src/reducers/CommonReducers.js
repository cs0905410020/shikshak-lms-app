import {
    ALL_SUBJECT_STUDENT_SCHOOL_SUCCESS,
    ALL_SUBJECT_STUDENT_SCHOOL_REQUEST,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT,
    WINDOW_RESIZE_COUNT,
    SUBJECT_ALL_CHAPTER_DATA_REQUEST,
    SUBJECT_ALL_CHAPTER_DATA_SUCCESS,
    SELECTED_SUBJECT_DATA_REQUEST,
    SELECTED_SUBJECT_DATA_SUCCESS,
    SELECTED_CHAPTER_DATA_REQUEST,
    SELECTED_CHAPTER_DATA_SUCCESS,
    CHAPTER_ALL_TOPICS_DATA_SUCCESS,
    CHAPTER_ALL_TOPICS_DATA_REQUEST,
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
    USER_VOICE_ASSISTANT_SELECTION,
    ALL_CLASS_STANDARD_GRADES_DATA_REQUEST,
    ALL_CLASS_STANDARD_GRADES_DATA_SUCCESS,
    GRADE_SUBJECT_CHAPTER_DATA_SUCCESS,
    GRADE_SUBJECT_CHAPTER_DATA_REQUEST,
    SELECTED_GRADE_SUBJECT_DATA_REQUEST,
    SELECTED_GRADE_SUBJECT_DATA_SUCCESS,
} from "../constants/CommonConstants";

export const userSigninReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_SIGNOUT:
            return { loading: false, userInfo: {}};
        default:
            return state;
    }
};

export const windowResizeCountReducer = (state = {}, action) => {
    switch (action.type) {
        case WINDOW_RESIZE_COUNT:
            return action.payload;
        default:
            return state;
    }
};
export const videoProgressUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case VIDEO_PROGRESS_UPDATED:
            return action.payload;
        default:
            return state;
    }
};
export const wakeupAssistantReducer = (state = {}, action) => {
    switch (action.type) {
        case WAKEUP_ASSISTANT:
            return action.payload;
        default:
            return state;
    }
};
export const allSyllabusDataReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_SYLLABUS_DATA:
            return action.payload;
        default:
            return state;
    }
};
export const allClassSectionDataReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_CLASS_SECTION_DATA:
            return action.payload;
        default:
            return state;
    }
};
export const allClassStandardDataReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_CLASS_STANDARD_DATA:
            return action.payload;
        default:
            return state;
    }
};
export const userProfileInEditModeReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_PROFILE_IN_EDIT_MODE:
            return action.payload;
        default:
            return state;
    }
};
export const selectedSubjectDataReducer = (state = {}, action) => {
    switch (action.type) {
        case SELECTED_SUBJECT_DATA_REQUEST:
            return { loading: true,selectedSubject:[],prevId:action.payload};
        case SELECTED_SUBJECT_DATA_SUCCESS:
            return { loading: false,selectedSubject:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const selectedGradeSubjectDataReducer = (state = {}, action) => {
    switch (action.type) {
        case SELECTED_GRADE_SUBJECT_DATA_REQUEST:
            return { loading: true,selectedTopic:[],prevId:action.payload};
        case SELECTED_GRADE_SUBJECT_DATA_SUCCESS:
            return { loading: false,selectedSubject:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const chartDataJsProgressDataSetReducer = (state = {}, action) => {
    switch (action.type) {
        case CHAT_DATA_JS_PROGRESS_DATA_SET_REQUEST:
            return { loading: true,chartData:[] ,prevId:action.payload};
        case CHAT_DATA_JS_PROGRESS_DATA_SET_SUCCESS:
            return { loading: false,chartData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const chapterAllTopicsSearchDataReducer = (state = {}, action) => {
    switch (action.type) {
        case CHAPTER_ALL_TOPICS_SEARCH_DATA_REQUEST:
            return { loading: true,topicData:[] ,prevId:action.payload};
        case CHAPTER_ALL_TOPICS_SEARCH_DATA_SUCCESS:
            return { loading: false,topicData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const userVoiceAssistantSelectionReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_VOICE_ASSISTANT_SELECTION:
            return action.payload;
        default:
            return state;
    }
};
export const chapterTopicsDataByTopicIdReducer = (state = {}, action) => {
    switch (action.type) {
        case CHAPTER_TOPICS_DATA_BY_TOPIC_ID_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};
export const assistantSearchTestForSpeakReducer = (state = {}, action) => {
    switch (action.type) {
        case ASSISTANT_SEARCH_TEST_FOR_SPEAK:
            return action.payload;
        default:
            return state;
    }
};
export const selectedChapterDataReducer = (state = {}, action) => {
    switch (action.type) {
        case SELECTED_CHAPTER_DATA_REQUEST:
            return { loading: true,selectedChapter:[] ,prevId:action.payload};
        case SELECTED_CHAPTER_DATA_SUCCESS:
            return { loading: false,selectedChapter:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const allSubjectStudentClassSectionWiseReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_SUBJECT_STUDENT_SCHOOL_REQUEST:
            return { loading: true,prevId:action.payload,subjectData:[] };
        case ALL_SUBJECT_STUDENT_SCHOOL_SUCCESS:
            return { loading: false,subjectData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};

export const allClassStandardGradesDataReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_CLASS_STANDARD_GRADES_DATA_REQUEST:
            return { loading: true,gradesData:[] };
        case ALL_CLASS_STANDARD_GRADES_DATA_SUCCESS:
            return { loading: false,gradesData:action.payload};
        default:
            return state;
    }
};
export const allSubjectDataListReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_SUBJECT_DATA_LIST_REQUEST:
            return { loading: true,subjectData:[] ,prevId:action.payload};
        case ALL_SUBJECT_DATA_LIST_SUCCESS:
            return { loading: false,subjectData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const allChapterTestDataReducer = (state = {}, action) => {
    switch (action.type) {
        case CHAPTER_ALL_TEST_DATA_REQUEST:
            return { loading: true,testData:[] ,prevId:action.payload};
        case CHAPTER_ALL_TEST_DATA_SUCCESS:
            return { loading: false,testData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const testAllQuestionOptionsDataReducer = (state = {}, action) => {
    switch (action.type) {
        case TEST_ALL_QUESTION_OPTIONS_DATA_REQUEST:
            return { loading: true,testData:[] ,prevId:action.payload};
        case TEST_ALL_QUESTION_OPTIONS_DATA_SUCCESS:
            return { loading: false,testData:action.payload ,prevId:state.prevId};
        default:
            return state;
    }
};
export const selectedTestDataByTestIdReducer = (state = {}, action) => {
    switch (action.type) {
        case TEST_DATA_BY_TEST_ID_REQUEST:
            return { loading: true,testData:{},prevId:action.payload};
        case TEST_DATA_BY_TEST_ID_SUCCESS:
            return { loading: false,testData:action.payload,prevId:state.prevId};
        default:
            return state;
    }
};
export const teacherAllClassesDataReducer = (state = {}, action) => {
    switch (action.type) {
        case TEACHER_ALL_CLASSES_DATA_REQUEST:
            return { loading: true,classData:{},prevId:action.payload};
        case TEACHER_ALL_CLASSES_DATA_SUCCESS:
            return { loading: false,classData:action.payload,prevId:state.prevId};
        default:
            return state;
    }
};
export const userClassSubjectDataReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_CLASS_SUBJECT_DATA_REQUEST:
            return { loading: true,studentData:{}};
        case USER_CLASS_SUBJECT_DATA_SUCCESS:
            return { loading: false,studentData:action.payload};
        default:
            return state;
    }
};
export const subjectAllChapterDataReducer = (state = {}, action) => {
    switch (action.type) {
        case SUBJECT_ALL_CHAPTER_DATA_REQUEST:
            return { loading: true,chapterData:[],prevId:action.payload};
        case SUBJECT_ALL_CHAPTER_DATA_SUCCESS:
            return { loading: false,chapterData:action.payload,prevId:state.prevId};
        default:
            return state;
    }
};
export const gradeSubjectAllChapterDataReducer = (state = {}, action) => {
    switch (action.type) {
        case GRADE_SUBJECT_CHAPTER_DATA_REQUEST:
            return { loading: true,chapterData:[],prevId:action.payload};
        case GRADE_SUBJECT_CHAPTER_DATA_SUCCESS:
            return { loading: false,chapterData:action.payload,prevId:state.prevId};
        default:
            return state;
    }
};
export const userHistoryChapterSubjectTopicDataReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_HISTORY_CHAPTER_SUBJECT_TOPIC_DATA_REQUEST:
            return { loading: true,historyData:[],prevId:action.payload};
        case USER_HISTORY_CHAPTER_SUBJECT_TOPIC_DATA_SUCCESS:
            return { loading: false,historyData:action.payload,prevId:state.prevId};
        default:
            return state;
    }
};
export const allChapterDataListReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_CHAPTER_DATA_LIST_REQUEST:
            return { loading: true,chapterData:[],prevId:action.payload};
        case ALL_CHAPTER_DATA_LIST_SUCCESS:
            return { loading: false,chapterData:action.payload,prevId:state.prevId};
        default:
            return state;
    }
};
export const allTopicDataListReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_TOPIC_DATA_LIST_REQUEST:
            return { loading: true,topicData:[],prevId:action.payload};
        case ALL_TOPIC_DATA_LIST_SUCCESS:
            return { loading: false,topicData:action.payload,prevId:state.prevId};
        default:
            return state;
    }
};
export const chapterAllTopicsDataReducer = (state = {}, action) => {
    switch (action.type) {
        case CHAPTER_ALL_TOPICS_DATA_REQUEST:
            return { loading: true,topicsData:[],prevId:action.payload};
        case CHAPTER_ALL_TOPICS_DATA_SUCCESS:
            return { loading: false,topicsData:action.payload,prevId:state.prevId};
        default:
            return state;
    }
};
export const allSchoolDataListReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_SCHOOL_DATA_LIST_REQUEST:
            return { loading: true,schoolData:[],prevId:action.payload};
        case ALL_SCHOOL_DATA_LIST_SUCCESS:
            return { loading: false,schoolData:action.payload,prevId:state.prevId};
        default:
            return state;
    }
};