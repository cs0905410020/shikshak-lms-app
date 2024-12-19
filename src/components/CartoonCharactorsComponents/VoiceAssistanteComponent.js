
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {MinionComponent} from "./MinionComponent";
import {useSpeechSynthesis} from "react-speech-kit";
import {useSpeechRecognition} from "react-speech-recognition";
import {Capacitor} from "@capacitor/core";
import {TextToSpeech} from "@capacitor-community/text-to-speech";
import {
    actionToGetCommandsForTextSpeech,
    actionToOpenVoiceBot, actionToToGetApiResponseForTextSearch,
    actionToWakeupAssistant
} from "../../actions/CommonAction";
import {callFunctionToStartStopSpeech} from "../../helpers/VoiceAssistanceHelper";

export default function VoiceAssistantComponent() {
    const dispatch = useDispatch();
    const wakeupAssistant = useSelector((state) => state.wakeupAssistant);
    const { speak,voices,speaking,cancel } = useSpeechSynthesis();
    const [lypSyncType, setLypSyncType] = useState('s');
    const commands = [
        {
            command: "*",
            callback: (command) => {
                if(command.trim().length){
                    getCommandWiseActions(command);
                }
            },
        }
    ]
    const {transcript,resetTranscript} = useSpeechRecognition({commands});

    const callFunctionToGetCommandsForTextSpeech = (text)=>{
        let speechFunction;
        if(Capacitor.isNativePlatform()){
            speechFunction = TextToSpeech;
        }else{
            speechFunction = speak;
        }
        dispatch(actionToGetCommandsForTextSpeech(text,setLypSyncType,Capacitor.isNativePlatform(),speechFunction,voices));
    }

    const callFunctionToSetWakeupAssistance = (action) => {
        if(!action){
            resetTranscript();
            if(Capacitor.isNativePlatform()){
                TextToSpeech.stop();
            }else{
                cancel();
            }
            callFunctionToStartStopSpeech(false,'');
        }
        dispatch(actionToWakeupAssistant(action));
    }

    const initializedVoiceAssistance = ()=>{
        callFunctionToOpenVoiceBot();
        //$('#enable_voice_command_button_container').remove();
    }

    const getCommandWiseActions = (command) => {
        switch (command?.trim()?.toLowerCase()) {
            case 'robot':
                callFunctionToOpenVoiceBot();
                resetTranscript();
                break;
            case 'how are you':
                callFunctionToGetCommandsForTextSpeech('i am fine what about you');
                resetTranscript();
                break;
            case 'hello':
                callFunctionToGetCommandsForTextSpeech('How can i help you');
                resetTranscript();
                break;
            case 'hi':
                callFunctionToGetCommandsForTextSpeech('How can i help you');
                resetTranscript();
                break;
            case 'i am fine too':
                callFunctionToGetCommandsForTextSpeech('ohh that good');
                resetTranscript();
                break;
            case 'sleep':
                callFunctionToGetCommandsForTextSpeech('Okay good bye');
                resetTranscript();
                setTimeout(function () {
                    callFunctionToSetWakeupAssistance(false);
                },1000);
                break;
            case 'shutup':
                callFunctionToGetCommandsForTextSpeech('okay sorry');
                resetTranscript();
                break;
            default:
                callFunctionToGetApiResponseForTextSearch(command?.trim()?.toLowerCase(),callFunctionToGetCommandsForTextSpeech);
                resetTranscript();
                break;
        }
    }
    const callFunctionToOpenVoiceBot = () => {
        let speechFunction;
        if(Capacitor.isNativePlatform()){
            speechFunction = TextToSpeech;
        }else{
            speechFunction = speak;
        }
        dispatch(actionToOpenVoiceBot(setLypSyncType,Capacitor.isNativePlatform(),speechFunction,voices));
    }
    const callFunctionToGetApiResponseForTextSearch = (text) => {
        dispatch(actionToToGetApiResponseForTextSearch(text,callFunctionToGetCommandsForTextSpeech))
    }

    useEffect(() => {
        callFunctionToStartStopSpeech(speaking,transcript);
    }, [speaking,transcript]);

    return (
        <>
            {(!wakeupAssistant) ?
                <button
                    id={"enable_voice_command_button_container"}
                    className={"enable_voice_command_button"}
                    onClick={() => initializedVoiceAssistance()}>
                    Enable Robot
                </button>
                :
                <div className={"character_voice_command_main_container"}>
                    <div onClick={() => callFunctionToSetWakeupAssistance(false)} className={"close_button"}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330">
                            <path
                                d="M165 0C120.926 0 79.492 17.163 48.328 48.327c-64.334 64.333-64.334 169.011-.002 233.345C79.49 312.837 120.926 330 165 330s85.508-17.163 116.672-48.328c64.334-64.334 64.334-169.012 0-233.345C250.508 17.163 209.072 0 165 0zm74.246 239.245c-2.93 2.929-6.768 4.394-10.607 4.394s-7.678-1.465-10.605-4.394L165 186.213l-53.033 53.033c-2.93 2.929-6.768 4.394-10.607 4.394s-7.678-1.465-10.605-4.394a15 15 0 0 1 0-21.213L143.787 165l-53.033-53.033a15 15 0 0 1 0-21.213c5.857-5.857 15.355-5.857 21.213 0L165 143.787l53.031-53.033c5.857-5.857 15.355-5.857 21.213 0a15 15 0 0 1 0 21.213L186.213 165l53.033 53.032c5.858 5.858 5.858 15.356 0 21.213z"/>
                        </svg>
                    </div>
                    <MinionComponent lypSyncType={lypSyncType}/>
                </div>
            }
        </>
    )
}