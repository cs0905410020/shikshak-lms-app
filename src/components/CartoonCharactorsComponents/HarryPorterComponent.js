import React from 'react';
import '../../theme/css/harrypoter.css';


export const HarryPorterComponent = ({lypSyncType}) =>{
    return(
        <div className="character_voice_command_main_container_inner cartoon ha harry">
                <div className="shoe b"></div>
                <div className="shoe b"></div>
                <div className="pants b"></div>
                <div className="pants b"></div>
                <div className="hand b r"></div>
                <div className="hand b r"></div>
                <div className="wand b"></div>
                <div className="arm b"></div>
                <div className="arm b"></div>
                <div className="body b"></div>
                <div className="scarf-2 b"></div>
                <div className="scarf b"></div>
                <div className="ear b r"></div>
                <div className="ear b r"></div>
                <div className="face b">
                    <div className="glasses-bar"></div>
                    <div className="glasses b r"></div>
                    <div className="glasses b r"></div>
                    <div className="eye r"></div>
                    <div className="eye r"></div>
                    <div className={"mouth b r "+lypSyncType}></div>
                    <div className="scar ha"></div>
                </div>
                <div className="hair hair-1 b"></div>
                <div className="hair hair-2 b"></div>
                <div className="hair hair-3 b"></div>
                <div className="hair-mess ha r"></div>
            </div>
    )
}