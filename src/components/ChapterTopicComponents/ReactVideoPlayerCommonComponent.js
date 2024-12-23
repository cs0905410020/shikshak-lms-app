import React, {useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {
    actionToSetVideoProgressUpdate,
    actionToToSetTotalVideoProgressPlayedData,
} from "../../actions/CommonAction";
import ReactPlayer from "react-player/lazy";
import { useWakeLock } from 'react-screen-wake-lock';

export const ReactVideoPlayerCommonComponent=({openTopicVideoSection})=>{
    const dispatch = useDispatch();
    const playerRef = useRef();
    const [isReady, setIsReady] = React.useState(false);
    console.log(openTopicVideoSection)
    const callFunctionToSetTotalPlayedData = (seconds)=>{
       dispatch(actionToSetVideoProgressUpdate(seconds))
    }
    const { isSupported, released, request, release } = useWakeLock({
        onRequest: () => console.log('Screen Wake Lock: requested!'),
        onError: () => console.log('An error happened!'),
        onRelease: () => console.log('Screen Wake Lock: released!'),
    });
    const playerReadyFunction = React.useCallback(() => {
        if (!isReady) {
            const timeToStart = openTopicVideoSection?.progress_time_last_watched ? openTopicVideoSection?.progress_time_last_watched : 0;
            playerRef.current.seekTo(timeToStart, 'seconds');
            setIsReady(true);
        }
    }, [isReady]);

    const componentIsClosingFunction = ()=>{
        dispatch(actionToToSetTotalVideoProgressPlayedData(openTopicVideoSection))
        playerRef?.current?.stop();
    }

    useEffect(()=>{
        const keepAwake =  () => {
            if(isSupported){
                request();
            }
        };
        const allowSleep =  () => {
            if(isSupported){
                release();
            }
        };
        keepAwake();
        dispatch(actionToSetVideoProgressUpdate(0));
        return ()=>{
            allowSleep();
            componentIsClosingFunction();
        }
    },[])

    return (
        <ReactPlayer
            ref={playerRef}
            className={'react_player'}
            controls={true}
            playing={true}
            config={{
                file: {
                    attributes: {
                        crossOrigin: 'anonymous',
                        controlsList: 'nodownload',
                        playsInline:true
                    },
                },
            }}
            onReady={playerReadyFunction}
            onProgress={(progress) => {
                callFunctionToSetTotalPlayedData(progress?.playedSeconds)
            }}
            url={openTopicVideoSection?.url}/>
    )
}