import React from 'react';
import '../../theme/css/minion.css';

export const MinionComponent = ({lypSyncType}) =>{
    return(
        <div className="character_voice_command_main_container_inner bill minion">
            <div className="lights">
                <span className="white_light"></span>
                <span className="dark_light"></span>
            </div>
            <div className="hair">
                <span className="hair1"></span>
                <span className="hair1 make_it_left_hair1"></span>
                <span className="hair2"></span>
            </div>

            <div className="eyes">
                <div className="eye_animate"></div>

                <div className="glasses"></div>
                <div className="white_part">
                    <div className="brown_eye">
                        <span className="black_part"></span>
                    </div>
                </div>
            </div>

            <div className="black_tie">
                <span className="right_tie">
                    <div className="top_tie"></div>
                    <div className="down_tie"></div>
                </span>
                <span className="left_tie">
                    <div className="top_tie"></div>
                    <div className="down_tie"></div>
                </span>
            </div>

            <div className={"smile "+lypSyncType}></div>

            <div className="arm"></div>
            <div className="hand">
                <span className="hand_parts"></span>
            </div>

            <div className="arm make_it_right_arm"></div>
            <div className="hand make_it_right_hand"><span className="hand_parts"></span></div>

            <div className="curves">
                <span className="curve1"></span>
                <span className="curve1 make_it_left_curve"></span>
                <span className="curve2"></span>
            </div>

            <div className="clothes">
                <div className="main"></div>
                <div className="blue_borders"></div>
                <div className="right_shirt"></div>
                <div className="right_shirt make_it_left"></div>
                <div className="bottom"></div>
            </div>

            <div className="pocket">
                <div className="logo"></div>
                <span className="lines"></span>
            </div>

            <div className="legs">
                <div className="right_leg"></div>
                <div className="right_leg make_it_left_leg"></div>
                <div className="shoes"><span className="small_shoes"></span></div>
                <div className="shoes make_it_left_shoes"><span className="small_shoes"></span></div>
            </div>
        </div>
    )
}