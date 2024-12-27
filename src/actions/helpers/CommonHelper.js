import {_getIconBySubjectKey} from "../../helpers/CommonHelper";

export const modifyHistoryUserData = (historyData)=>{
   let addedSubjectIds = [];
   let addedChapterIds = [];
   let addedTopicIds = [];
   let finalDataArray = [];

    historyData?.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.updated_at) - new Date(a.updated_at);
    });

    historyData?.map((subjectData)=>{
        if(!addedSubjectIds.includes(subjectData?.subject_id)){
            addedSubjectIds.push(subjectData?.subject_id);
            finalDataArray[addedSubjectIds?.indexOf(subjectData?.subject_id)] = {subject_name:subjectData?.subject_name,
                                                                                 subject_id:subjectData?.subject_id,
                                                                                 chapter_data:[]};
        }
        let indexOfSubject = addedSubjectIds?.indexOf(subjectData?.subject_id)
        historyData?.map((chapterData)=>{
            if(subjectData?.subject_id == chapterData?.subject_id) {
                if (!addedChapterIds.includes(chapterData?.chapter_id)) {
                    addedChapterIds.push(chapterData?.chapter_id);
                    finalDataArray[indexOfSubject].chapter_data[addedChapterIds?.indexOf(chapterData?.chapter_id)] = {
                        chapter_name: chapterData?.chapter_name,
                        chapter_id: chapterData?.chapter_id,
                        topic_data: []
                    };
                }
                let indexOfChapter = addedChapterIds?.indexOf(chapterData?.chapter_id);
                historyData?.map((topicData) => {
                    if(chapterData?.chapter_id == topicData?.chapter_id && !addedTopicIds.includes(topicData?.school_students_topic_progress_id)){
                        finalDataArray[indexOfSubject].chapter_data[indexOfChapter].topic_data.push(topicData);
                        addedTopicIds.push(topicData?.school_students_topic_progress_id);
                    }
                })
            }
        })
    })
    return finalDataArray;
}
export const getChartDataByFormat = (dataSet)=>{
    function generateRandomColor(){
        let maxVal = 0xFFFFFF; // 16777215
        let randomNumber = Math.random() * maxVal;
        randomNumber = Math.floor(randomNumber);
        randomNumber = randomNumber.toString(16);
        let randColor = randomNumber.padStart(6, 0);
        return `#${randColor.toUpperCase()}`
    }
    let dataPoints = [];
    let totalOverAllTime = 0;
    let totalProgressTime = 0;

    dataSet?.map((progressData)=>{
        if(Number(progressData?.percentage))
            dataPoints?.push({name:progressData?.subject_name,y:Math.round(Number(progressData?.percentage)),
                color:progressData?.name ? _getIconBySubjectKey(progressData?.name)?.color  : generateRandomColor()});

        totalProgressTime += Number(progressData?.total_spent);
        totalOverAllTime += Number(progressData?.total);
    })
    let totalPercentage = 0;
    if(totalOverAllTime)
        totalPercentage = Math.round((100/totalOverAllTime) * totalProgressTime);


    totalPercentage = totalPercentage ? totalPercentage : 0;

    let finalData = {dataPoints,totalPercentage};
    return finalData;
}