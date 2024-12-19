import React from 'react';
import {useSelector} from "react-redux";

export const ChapterTestMobileDataBodyComponent = ({setStartStopTest})=>{
    const {testData} = useSelector((state) => state.selectedTestDataByTestId);

    const callFunctionToOpenAndStartTest = ()=>{
        setStartStopTest(true);
    }
    return(
        <div className={"main_test_page_panel_main_container"}>
            <div className={"test_name"}>
                {testData?.name}
            </div>
            <div className={"test_questions_and_time_main_section"}>
                <div className={"test_questions_snd_time"}>
                    <div className={"test_questions_snd_time_inner_section"}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 493.508 493.508"><path d="M421.38 72.426C374.82 25.786 312.86.07 246.736.006 110.804.006.116 110.578 0 246.506c-.064 65.916 25.548 127.904 72.1 174.56 46.568 46.628 108.284 72.436 174.196 72.436h.572v-.024c134.956 0 246.54-110.596 246.64-246.516.064-65.912-25.584-127.892-72.128-174.536zm-163.68 304.7c-2.836 2.864-6.8 4.504-10.872 4.504-4.088-.008-8.064-1.656-10.932-4.56-2.848-2.824-4.484-6.792-4.48-10.876.008-4.072 1.664-8.064 4.532-10.924 2.856-2.848 7.064-4.488 10.92-4.488 4.06 0 8.028 1.648 10.86 4.504 2.896 2.92 4.556 6.916 4.548 10.932-.004 4.032-1.672 8.004-4.576 10.908zm7.424-94.452c-1.76.388-3.02 1.948-3.024 3.752l-.02 18.12c-.008 8.488-6.916 15.408-15.436 15.408a15.44 15.44 0 0 1-15.404-15.436l.036-34.964c.008-8.484 6.916-15.08 15.416-15.08h.068c29.488 0 53.5-24.32 53.532-53.808.012-14.288-5.536-27.884-15.64-38.024-10.14-10.132-23.568-15.788-37.884-15.804-29.492 0-53.512 23.956-53.544 53.464-.008 8.492-6.924 15.38-15.44 15.38-4.12 0-7.996-1.624-10.9-4.544a15.28 15.28 0 0 1-4.504-10.904c.044-46.492 37.896-84.324 84.448-84.324 46.532.048 84.344 37.936 84.3 84.46-.032 39.172-27.78 73.788-66.004 82.304z"/></svg>
                    </div>
                    <div className={"test_questions_snd_time_inner_section"}>
                        <strong>{testData?.number_of_questions}</strong> Questions
                    </div>
                </div>
                <div className={"test_questions_snd_time"}>
                    <div className={"test_questions_snd_time_inner_section"}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 466.008 466.008"><path d="M233.004 0C104.224 0 0 104.212 0 233.004c0 128.781 104.212 233.004 233.004 233.004 128.782 0 233.004-104.212 233.004-233.004C466.008 104.222 361.796 0 233.004 0zm11.48 242.659l-63.512 75.511c-5.333 6.34-14.797 7.156-21.135 1.824s-7.157-14.795-1.824-21.135l59.991-71.325V58.028c0-8.284 6.716-15 15-15s15 6.716 15 15v174.976h0c0 3.532-1.247 6.952-3.52 9.655z"/></svg>
                    </div>
                    <div className={"test_questions_snd_time_inner_section"}>
                        <strong>{Number(testData?.time_in_seconds)/60}</strong> Minutes
                    </div>
                </div>
            </div>
            <div className={"test_instructions"}>
                Instructions
            </div>
            <div className={"test_instructions_main_section_container"}>
                <div className={"test_instructions_main_section_container_loop"}>
                    <div className={"row"}>
                        <div className={"col-2 svg_col"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 403.48 403.48"><path d="M277.271 0H46.176v403.48h311.129V80.035L277.271 0zm4.393 25.607l50.033 50.034h-50.033V25.607zM61.176 388.48V15h205.489v75.641h75.641v297.84H61.176zm40.263-270.9h55.18V62.4h-55.18v55.18zm15-40.18h25.18v25.18h-25.18V77.4zm-15 114.68h55.18V136.9h-55.18v55.18zm15-40.18h25.18v25.18h-25.18V151.9zm-15 114.681h55.18V211.4h-55.18v55.181zm15-40.181h25.18v25.181h-25.18V226.4zm-15 114.681h55.18v-55.18h-55.18v55.18zm15-40.18h25.18v25.18h-25.18v-25.18zm61.396 25.18h114.688v15H177.835zm0-74.5h114.688v15H177.835zm0-74.501h114.688v15H177.835zm0-74.5h114.688v15H177.835z"/></svg>
                        </div>
                        <div className={"col-10 text_col"}>
                            1 mark is awarded for correct attempts and 0 marks for incorrect attempt.
                        </div>
                    </div>
                </div>
                <div className={"test_instructions_main_section_container_loop"}>
                    <div className={"row"}>
                        <div className={"col-2 svg_col"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 403.48 403.48"><path d="M277.271 0H46.176v403.48h311.129V80.035L277.271 0zm4.393 25.607l50.033 50.034h-50.033V25.607zM61.176 388.48V15h205.489v75.641h75.641v297.84H61.176zm40.263-270.9h55.18V62.4h-55.18v55.18zm15-40.18h25.18v25.18h-25.18V77.4zm-15 114.68h55.18V136.9h-55.18v55.18zm15-40.18h25.18v25.18h-25.18V151.9zm-15 114.681h55.18V211.4h-55.18v55.181zm15-40.181h25.18v25.181h-25.18V226.4zm-15 114.681h55.18v-55.18h-55.18v55.18zm15-40.18h25.18v25.18h-25.18v-25.18zm61.396 25.18h114.688v15H177.835zm0-74.5h114.688v15H177.835zm0-74.501h114.688v15H177.835zm0-74.5h114.688v15H177.835z"/></svg>
                        </div>
                        <div className={"col-10 text_col"}>
                            Tap on options to select the correct answer.
                        </div>
                    </div>
                </div>
            </div>
            <div className={"start_test_button_div_container"}>
               <button onClick={callFunctionToOpenAndStartTest} className={"start_test_button"} type={"button"}>Start Test</button>
            </div>
        </div>
    )
}