import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
    allChapterDataListReducer,
    allChapterTestDataReducer,
    allClassSectionDataReducer, allClassStandardDataReducer, allClassStandardGradesDataReducer,
    allSchoolDataListReducer,
    allSubjectDataListReducer,
    allSubjectStudentClassSectionWiseReducer,
    allSyllabusDataReducer,
    allTopicDataListReducer, assistantSearchTestForSpeakReducer,
    chapterAllTopicsDataReducer,
    chapterAllTopicsSearchDataReducer,
    chapterTopicsDataByTopicIdReducer,
    chartDataJsProgressDataSetReducer, gradeSubjectAllChapterDataReducer,
    selectedChapterDataReducer, selectedGradeSubjectDataReducer,
    selectedSubjectDataReducer,
    selectedTestDataByTestIdReducer,
    subjectAllChapterDataReducer,
    teacherAllClassesDataReducer,
    testAllQuestionOptionsDataReducer,
    userClassSubjectDataReducer,
    userHistoryChapterSubjectTopicDataReducer,
    userProfileInEditModeReducer,
    userSigninReducer, userVoiceAssistantSelectionReducer,
    videoProgressUpdateReducer,
    wakeupAssistantReducer, webSettingReducer,
    windowResizeCountReducer
} from "./reducers/CommonReducers";

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo') || `{}`)
            : null,
    },
    windowResizeCount: 0,
    wakeupAssistant:false,
    allSubjectStudentClassSectionWise:{prevId:'',loading:localStorage.getItem('ALL_SUBJECT_STUDENT_SCHOOL') ? false : true,subjectData:
            localStorage.getItem('ALL_SUBJECT_STUDENT_SCHOOL') ?
                JSON.parse((localStorage.getItem('ALL_SUBJECT_STUDENT_SCHOOL') || '[]')) : []},
    subjectAllChapterData:{prevId:'',loading:true,chapterData:[]},
    gradeSubjectChapterData:{prevId:'',loading:true,chapterData:[]},
    allClassStandardGradesData:{loading:true,gradesData:[]},
    selectedSubjectData:{prevId:'',loading:true,selectedSubject:[]},
    selectedGradeSubjectData:{prevId:'',loading:true,selectedGradeSubjectData:[]},
    selectedChapterData:{prevId:'',loading:true,selectedChapter:[]},
    chapterAllTopicsData:{prevId:'',loading:true,topicsData:[]},
    chapterAllTopicsSearchData:{prevId:'',loading:false,topicsData:[]},
    chapterTopicsDataByTopicId:{},
    videoProgressUpdate:0,
    allSchoolDataList:{prevId:'',loading:true,schoolData:[]},
    allSubjectDataList:{prevId:'',loading:true,subjectData:[]},
    allChapterDataList:{prevId:'',loading:true,chapterData:[]},
    allTopicDataList:{prevId:'',loading:true,topicData:[]},
    chartDataJsProgressDataSet:{prevId:'',loading:true,chartData:[]},
    userHistoryChapterSubjectTopicData:{prevId:'',loading:true,historyData:[]},
    allChapterTestData:{prevId:'',loading:true,testData:[]},
    testAllQuestionOptionsData:{prevId:'',loading:true,testData:[]},
    selectedTestDataByTestId:{prevId:'',loading:true,testData:{}},
    teacherAllClassesData:{prevId:'',loading:true,classData:[]},
    userClassSubjectData:{loading:true,studentData:{}},
    allSyllabusData:[],
    allClassSectionData:[],
    userProfileInEditMode:false,
    assistantSearchTestForSpeak:'',
    allClassStandardData:[],
    //userVoiceAssistantSelection:localStorage?.getItem('userVoiceAssistantSelection') ? localStorage.getItem('userVoiceAssistantSelection') : 'minion',
};
export const rootReducer = combineReducers({
    allClassStandardGradesData: allClassStandardGradesDataReducer,
    userVoiceAssistantSelection: userVoiceAssistantSelectionReducer,
    allClassStandardData: allClassStandardDataReducer,
    assistantSearchTestForSpeak: assistantSearchTestForSpeakReducer,
    userClassSubjectData: userClassSubjectDataReducer,
    allClassSectionData: allClassSectionDataReducer,
    teacherAllClassesData: teacherAllClassesDataReducer,
    selectedTestDataByTestId: selectedTestDataByTestIdReducer,
    testAllQuestionOptionsData: testAllQuestionOptionsDataReducer,
    allChapterTestData: allChapterTestDataReducer,
    videoProgressUpdate: videoProgressUpdateReducer,
    chapterTopicsDataByTopicId: chapterTopicsDataByTopicIdReducer,
    userHistoryChapterSubjectTopicData: userHistoryChapterSubjectTopicDataReducer,
    chapterAllTopicsSearchData: chapterAllTopicsSearchDataReducer,
    chartDataJsProgressDataSet: chartDataJsProgressDataSetReducer,
    userProfileInEditMode: userProfileInEditModeReducer,
    allTopicDataList: allTopicDataListReducer,
    allChapterDataList: allChapterDataListReducer,
    allSubjectDataList: allSubjectDataListReducer,
    allSyllabusData: allSyllabusDataReducer,
    allSchoolDataList: allSchoolDataListReducer,
    wakeupAssistant: wakeupAssistantReducer,
    chapterAllTopicsData: chapterAllTopicsDataReducer,
    subjectAllChapterData: subjectAllChapterDataReducer,
    gradeSubjectChapterData: gradeSubjectAllChapterDataReducer,
    selectedSubjectData: selectedSubjectDataReducer,
    selectedGradeSubjectData: selectedGradeSubjectDataReducer,
    selectedChapterData: selectedChapterDataReducer,
    allSubjectStudentClassSectionWise: allSubjectStudentClassSectionWiseReducer,
    userSignin: userSigninReducer,
    windowResizeCount: windowResizeCountReducer,
    webSetting: webSettingReducer,
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancer =  window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
const store = createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);
export type RootState = ReturnType<typeof rootReducer>
export default store;
