import React from 'react';
import '../../theme/css/alien.css';

export const AlienComponent = ({lypSyncType}) =>{
    return(
        <div className={"character_voice_command_main_container_inner alien"} id="toystoy-alien">
            <div id="antenna"></div>
            <div id="head">
                <div className="ear" id="left-ear"></div>
                <div className="ear" id="right-ear"></div>
                <div id="eyes">
                    <div className="eye"></div>
                    <div className="eye"></div>
                    <div className="eye"></div>
                </div>
                <div className={"mouth "+lypSyncType}></div>
            </div>
            <div id="alien-body">
                <div className="arm" id="left-arm">
                    <div className="hands"></div>
                </div>
                <div className="arm" id="right-arm">
                    <div className="hands"></div>
                </div>
                <div id="legs"></div>
                <div id="left-foot"></div>
                <div id="right-foot"></div>
            </div>
        </div>
    )
}