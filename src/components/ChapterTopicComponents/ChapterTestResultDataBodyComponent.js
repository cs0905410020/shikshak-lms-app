import React, {useState} from 'react';

export const ChapterTestResultDataBodyComponent = ({answerResult,answerQuestionAnswerData})=>{
    const [viewSolutions,setViewSolutions] = useState(false);

    return(
        <div className={"main_test_page_panel_main_container"}>
            <div className={"test_name"}>
                Test score
            </div>
            <div className={"test_score_main_circle_container"}>
                <div className={"test_score_main_circle_container_inner"}>
                    <div className={"test_score_main_circle_container_inner_score_content"}>
                        <div className={"total_score"}>{answerResult}</div>
                        <div className={"total_score_1"}></div>
                        <div className={"total_score_2"}>{answerQuestionAnswerData.length}</div>
                    </div>
                </div>
            </div>
            {(viewSolutions) ?
                <div className={"question_with_solutions_section_container_main"}>
                    {(answerQuestionAnswerData?.map((questionWithSolution,key)=>(
                        <div key={key} className={"question_with_solutions_section_loop"}>
                            <div><strong>Question {key+1} : </strong>{questionWithSolution?.question}</div>
                            <div><strong>Your answer : </strong>{questionWithSolution?.your_answer}</div>
                            <div><strong>Correct answer : </strong>{questionWithSolution?.answer}</div>
                            <div><strong>Explanation : </strong>{questionWithSolution?.answer_explain}</div>
                        </div>
                    )))}
                </div>
                :
                ''
            }
            {(!viewSolutions) ?
                <div className={"start_test_button_div_container"}>
                    <button onClick={()=>setViewSolutions(true)} className={"start_test_button"} type={"button"}>View Solutions</button>
                </div>
                : ''
            }
        </div>
    )
}