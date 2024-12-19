// //------------------------SPEECH RECOGNITION-----------------------------//
// const speechRecognition = new window.webkitSpeechRecognition();
// speechRecognition.continous = true
// speechRecognition.interimResults = true
// speechRecognition.lang = 'en-US'
// //------------------------SPEECH RECOGNITION-----------------------------//

import SpeechRecognition from 'react-speech-recognition';
import {actionToAddAssistantSearchTestForSpeak} from "../actions/CommonAction";

export const callFunctionToLipsync = (arg,setLypSyncType,index,textLength) => {
    if (arg == ' ' || arg == '.') {
        setLypSyncType('s');
    }
    if (arg == 'a') {
        setLypSyncType('D');
    }
    if (arg == 'b') {
        setLypSyncType('|');
    }
    if (arg == 'c') {
        setLypSyncType('D');
    }
    if (arg == 'd') {
        setLypSyncType('|');
    }
    if (arg == 'e') {
        setLypSyncType('D');
    }
    if (arg == 'f') {
        setLypSyncType('|');
    }
    if (arg == 'g') {
        setLypSyncType('|');
    }
    if (arg == 'h') {
        setLypSyncType('|');
    }
    if (arg == 'i') {
        setLypSyncType('D');
    }
    if (arg == 'j') {
        setLypSyncType('I');
    }
    if (arg == 'k') {
        setLypSyncType('I');
    }
    if (arg == 'l') {
        setLypSyncType('P');
    }
    if (arg == 'm') {
        setLypSyncType('(');
    }
    if (arg == 'n') {
        setLypSyncType(')');
    }
    if (arg == 'o') {
        setLypSyncType('o');
    }
    if (arg == 'p') {
        setLypSyncType('|');
    }
    if (arg == 'q') {
        setLypSyncType('D');
    }
    if (arg == 'r') {
        setLypSyncType('o');
    }
    if (arg == 's') {
        setLypSyncType(')');
    }
    if (arg == 't') {
        setLypSyncType('|');
    }
    if (arg == 'u') {
        setLypSyncType('o');
    }
    if (arg == 'v') {
        setLypSyncType('/');
    }
    if (arg == 'w') {
        setLypSyncType('o');
    }
    if (arg == 'x') {
        setLypSyncType('x');
    }
    if (arg == 'y') {
        setLypSyncType('D');
    }
    if (arg == 'z') {
        setLypSyncType('/');
    }
    if(index === textLength-1){
        setTimeout(function(){
            setLypSyncType('s');
        })
    }
}

export const callFunctionToSpeakText = (text,setLypSyncType,dispatch) => {
    let timeSpeed = 50;
    for (let i = 0, len = text.length; i < len; i++) {
        setTimeout((function (i) {
            return function () {
                callFunctionToLipsync(text[i],setLypSyncType,i,text?.length);
            };
        }(i)), (timeSpeed * i));
    }
}

export const callFunctionToStartSpeechRecg = (getCommandWiseActions,matches) => {
    getCommandWiseActions(matches);
}
export const callFunctionToStartStopSpeech = (stop) => {
    if(!stop) {
           SpeechRecognition.startListening({ continuous: true });
    }else{
        SpeechRecognition.stopListening();
        SpeechRecognition.abortListening();
    }
}
export const callFunctionToStartTextToVoice = (text,setLypSyncType,isNativePlatform,TextToSpeech,voices,dispatch) => {

    dispatch(actionToAddAssistantSearchTestForSpeak(text));

    function getWordAt(str, pos) {
        // Perform type conversions.
        str = String(str);
        pos = Number(pos) >>> 0;

        // Search for the word's beginning and end.
        const left = str.slice(0, pos + 1).search(/\S+$/),
            right = str.slice(pos).search(/\s/);

        // The last word in the string is a special case.
        if (right < 0) {
            return str.slice(left);
        }

        // Return the word, using the located bounds to extract it from the string.
        return str.slice(left, right + pos);
    }

    function onboundaryHandler(event){
        const index = event.charIndex;
        const word = getWordAt(text, index);
        callFunctionToSpeakText(word,setLypSyncType,dispatch);
    }

    if(isNativePlatform){
        callFunctionToStartStopSpeech(true,text);
        TextToSpeech.speak({
            text: text,
            lang: 'en-US',
            rate: 1.0,
            pitch: 2.0,
            volume: 1.0,
            onboundary:onboundaryHandler,
        }).then(()=>{
            callFunctionToStartStopSpeech(false,text);
        });
        callFunctionToSpeakText(text,setLypSyncType,dispatch);
    }else{
        //TextToSpeech({text,voice:voices[1]});
        const speakData = new SpeechSynthesisUtterance();
        let textToSpeak = text;
        let voices = window.speechSynthesis.getVoices();
        speakData.volume = 1; // From 0 to 1
        speakData.rate = 1; // From 0.1 to 10
        speakData.pitch = 2; // From 0 to 2
        speakData.text = textToSpeak;
        speakData.lang = 'en';
        speakData.voice  = voices[1];
        speakData.onboundary = onboundaryHandler;
        window.speechSynthesis.speak(speakData);

        speakData.addEventListener("start", event => {
            callFunctionToStartStopSpeech(true);
        });
        speakData.addEventListener("end", event => {
            callFunctionToStartStopSpeech(false);
        });
    }
}