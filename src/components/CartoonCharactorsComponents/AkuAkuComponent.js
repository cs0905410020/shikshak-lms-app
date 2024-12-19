import React from 'react';
//import '../../theme/css/akuaku.scss';

export const AkuAkuComponent = ({lypSyncType}) =>{
    return(
        <div className={"character_voice_command_main_container_inner akuaku_char"}>
                <div className="akuaku">
                    <div className="feather"></div>
                    <div className="feather"></div>
                    <div className="feather"></div>
                    <div className="feather"></div>
                    <div className="body"></div>
                    <div className="eyebrows"></div>
                    <div className="eyebrows"></div>
                    <div className="eye"></div>
                    <div className="eye"></div>
                    <div className="nose"></div>
                    <div className={"lip "+lypSyncType}></div>
                    <div className="beard"></div>
                    <div className="beard"></div>
                </div>
        </div>
    )
}