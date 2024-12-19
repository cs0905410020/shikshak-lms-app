import React from 'react';
//import '../../theme/css/horror.scss';

export const HorrorCartoonComponent = ({lypSyncType}) =>{
    return(
        <div className={"character_voice_command_main_container_inner horror"}>
        <div className="canvas">
            <div className="head">
                <div className="earring"></div>
                <div className="hair"></div>
                <div className="head-copy"></div>
                <div className="hair"></div>
                <div className="scar">
                    <ul className="scars">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div className="eyebrow"></div>
                <div className="eyes">
                    <div className="left">
                        <div className="inner-eye"></div>
                    </div>
                    <div className="right">
                        <div className="inner-eye"></div>
                    </div>
                </div>
                <div className={"mouth "+lypSyncType}>
                    <div className="teeth"></div>
                </div>
                <div className="neck">
                    <div className="bolts">
                        <div className="left"></div>
                        <div className="right"></div>
                    </div>
                </div>
            </div>

        </div>
        </div>
    )
}