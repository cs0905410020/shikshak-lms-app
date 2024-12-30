import React, {useState} from "react";
import siteLogo from "../../theme/image/siteLog.png";
import {useDispatch} from "react-redux";
import {signout} from "../../actions/CommonAction";
import {IonAlert} from "@ionic/react";
import {NavLink} from "react-router-dom";
import useAuth from "../../hooks/useAuth";


function LeftSideBarComponentFunction({isTeacherLeftSideBar}){
    const dispatch = useDispatch();
    const [showAlert,setShowAlert] = useState(false);
    const path = '/dashboard';
    const { setAuth } = useAuth();

    const logOutMe = ()=>{
        setAuth({});
        dispatch(signout());
    }

    return (
        <div className={"left_side_bar_main_section_container"}>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header="Logout"
                message="Are you sure to logout?"
                buttons={
                    [
                        {
                            text: 'No',
                            role: 'cancel',
                            handler: () => {
                                setShowAlert(false)
                            },
                        },
                        {
                            text: 'Yes',
                            role: 'confirm',
                            handler: () => {
                                logOutMe();
                            },
                        },
                    ]
                }
            />
            <div className={"left_side_bar_logo_section"}>
                <div className={"logo_main_div"}>
                    <img src={siteLogo}/>
                    <br/>
                    STEM City
                </div>
            </div>
            {(!isTeacherLeftSideBar) ?
                <div className={"left_side_content_menu_section"}>
                    <div className={"menu_loop_section"}>
                        <NavLink to={`${path}/home`} activeClassName={"active"}
                                 className={"menu_loop_section_inner_section"}>
                            <div className={"row"}>
                                <div className={"col-3 text-right"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.771 31.771">
                                        <path
                                            d="M31.771 20.319c0-.474-.279-.87-.676-1.066V11.9c.09-.034.146-.119.145-.214s-.062-.179-.149-.21L15.92 6.125a.9.9 0 0 0-.601 0L.15 11.477c-.089.031-.149.115-.15.21s.056.18.144.214l15.148 5.896c.211.081.444.081.655 0l14.102-5.492v6.947a1.19 1.19 0 0 0-.675 1.065 1.2 1.2 0 0 0 .729 1.102c-.429.847-.729 2.585-.729 3.081a1.2 1.2 0 0 0 1.198 1.197 1.2 1.2 0 0 0 1.197-1.197c0-.496-.301-2.234-.729-3.081.43-.181.731-.608.731-1.1zM4.888 14.87l.002 4.009c0 3.158 4.753 5.729 10.73 5.89 5.976-.161 10.729-2.729 10.729-5.89l.002-4.009-10.406 4.051c-.211.082-.444.082-.655 0L4.888 14.87z"/>
                                    </svg>
                                </div>
                                <div className={"col-9 text-left"}>
                                    My classes
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    <div className={"menu_loop_section"}>
                        <NavLink to={`${path}/student-progress-page`} activeClassName={"active"}
                                 className={"menu_loop_section_inner_section"}>
                            <div className={"row"}>
                                <div className={"col-3 text-right"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.14 30.14">
                                        <path
                                            d="M0 24.881h30.14v5.256H0zM3.095 4.327h4.324v19.007H3.095zm6.643 4.947h4.329v14.061H9.738zm6.491-3.556h4.327v17.615h-4.327zm6.7-5.716h4.324v23.331h-4.324z"/>
                                    </svg>
                                </div>
                                <div className={"col-9 text-left"}>
                                    Progress
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    <div className={"menu_loop_section"}>
                        <NavLink to={`${path}/student-search-topic-page`} activeClassName={"active"}
                                 className={"menu_loop_section_inner_section"}>
                            <div className={"row"}>
                                <div className={"col-3 text-right"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 487.95 487.95">
                                        <path
                                            d="M481.8 453l-140-140.1c27.6-33.1 44.2-75.4 44.2-121.6C386 85.9 299.5.2 193.1.2S0 86 0 191.4s86.5 191.1 192.9 191.1c45.2 0 86.8-15.5 119.8-41.4l140.5 140.5c8.2 8.2 20.4 8.2 28.6 0s8.2-20.4 0-28.6zM41 191.4c0-82.8 68.2-150.1 151.9-150.1s151.9 67.3 151.9 150.1-68.2 150.1-151.9 150.1S41 274.1 41 191.4z"></path>
                                    </svg>
                                </div>
                                <div className={"col-9 text-left"}>
                                    Search topics
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    <div className={"menu_loop_section"}>
                        <NavLink to={`${path}/student-profile-page`} activeClassName={"active"}
                                 className={"menu_loop_section_inner_section"}>
                            <div className={"row"}>
                                <div className={"col-3 text-right"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                        <path
                                            d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 0 0 9.3-35.2l-.9-2.6a443.74 443.74 0 0 0-79.7-137.9l-1.8-2.1a32.12 32.12 0 0 0-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 0 0-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 0 0-25.8 25.7l-15.8 85.4a351.86 351.86 0 0 0-99 57.4l-81.9-29.1a32 32 0 0 0-35.1 9.5l-1.8 2.1a446.02 446.02 0 0 0-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 0 0-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0 0 35.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0 0 25.8 25.7l2.7.5a449.4 449.4 0 0 0 159 0l2.7-.5a32.05 32.05 0 0 0 25.8-25.7l15.7-85a350 350 0 0 0 99.7-57.6l81.3 28.9a32 32 0 0 0 35.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9a283 283 0 0 1 0 92.2l-6.6 40.1 74.7 63.9a370.03 370.03 0 0 1-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 0 1-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 0 1 512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 0 1 400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390s58 11.6 79.2 32.8A111.6 111.6 0 0 1 624 502c0 29.9-11.7 58-32.8 79.2z"/>
                                    </svg>
                                </div>
                                <div className={"col-9 text-left"}>
                                    Settings
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    {/*<div className={"menu_loop_section"}>*/}
                    {/*    <div className={"menu_loop_section_inner_section"}>*/}
                    {/*        <div className={"row"}>*/}
                    {/*            <div className={"col-3 text-right"}>*/}
                    {/*                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 1 0 0 16zm4.953-4.613A5.97 5.97 0 0 0 14 8 6 6 0 1 0 2 8a5.97 5.97 0 0 0 1.047 3.387c.207-1.346 1.085-2.471 2.281-3.022C5.118 7.956 5 7.492 5 7a3 3 0 1 1 6 0 2.99 2.99 0 0 1-.328 1.365c1.196.551 2.074 1.676 2.281 3.022zM11 13.197V12a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v1.197c.883.511 1.907.803 3 .803s2.117-.292 3-.803zM8 8a1 1 0 1 0 0-2 1 1 0 1 0 0 2z"/></svg>*/}
                    {/*            </div>*/}
                    {/*            <div className={"col-9 text-left"}>*/}
                    {/*                Profile*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className={"menu_loop_section"}>
                        <NavLink to={`${path}/student-history-topic-page`} activeClassName={"active"}
                                 className={"menu_loop_section_inner_section"}>
                            <div className={"row"}>
                                <div className={"col-3 text-right"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M11.998 2.5A9.503 9.503 0 0 0 3.378 8H5.75a.75.75 0 0 1 0 1.5H2a1 1 0 0 1-1-1V4.75a.75.75 0 0 1 1.5 0v1.697A10.997 10.997 0 0 1 11.998 1C18.074 1 23 5.925 23 12s-4.926 11-11.002 11C6.014 23 1.146 18.223 1 12.275a.75.75 0 0 1 1.5-.037 9.5 9.5 0 0 0 9.498 9.262c5.248 0 9.502-4.253 9.502-9.5s-4.254-9.5-9.502-9.5zm.502 4.75a.75.75 0 0 0-1.5 0v5.5c0 .27.144.518.378.651l3.5 2a.75.75 0 0 0 .744-1.302L12.5 12.315V7.25z"/>
                                    </svg>
                                </div>
                                <div className={"col-9 text-left"}>
                                    History
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    <div className={"menu_loop_section"}>
                        <div className={"menu_loop_section_inner_section"}>
                            <div onClick={() => setShowAlert(true)} className={"row"}>
                                <div className={"col-3 text-right"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489.9 489.9">
                                        <path
                                            d="M468.3 255.8l.2-.2c.3-.4.6-.7.8-1.1.1-.1.1-.2.2-.3.2-.4.5-.8.7-1.2 0-.1.1-.2.1-.2l.6-1.3c0-.1 0-.1.1-.2.2-.4.3-.9.5-1.4 0-.1 0-.2.1-.2.1-.5.3-.9.3-1.4 0-.2 0-.3.1-.5.1-.4.1-.8.2-1.2.1-.6.1-1.1.1-1.7s0-1.1-.1-1.7c0-.4-.1-.8-.2-1.2 0-.2 0-.3-.1-.5l-.3-1.4c0-.1 0-.2-.1-.2-.1-.5-.3-.9-.5-1.4 0-.1 0-.1-.1-.2l-.6-1.3c0-.1-.1-.2-.1-.2-.2-.4-.4-.8-.7-1.2-.1-.1-.1-.2-.2-.3-.3-.4-.5-.8-.8-1.1l-.2-.2c-.4-.4-.7-.9-1.2-1.3l-98.9-98.8c-6.7-6.7-17.6-6.7-24.3 0s-6.7 17.6 0 24.3l69.6 69.6H136.8c-9.5 0-17.2 7.7-17.2 17.1 0 9.5 7.7 17.2 17.2 17.2h276.8l-69.1 69.1c-6.7 6.7-6.7 17.6 0 24.3 3.3 3.3 7.7 5 12.1 5s8.8-1.7 12.1-5l98.3-98.3c.5-.6.9-1 1.3-1.4zM110.7 34.3h128c9.5 0 17.2-7.7 17.2-17.1 0-9.5-7.7-17.2-17.2-17.2h-128C59.4 0 17.6 41.8 17.6 93.1v303.7c0 51.3 41.8 93.1 93.1 93.1h125.9c9.5 0 17.2-7.7 17.2-17.1 0-9.5-7.7-17.2-17.2-17.2H110.7c-32.4 0-58.8-26.4-58.8-58.8V93.1c.1-32.5 26.4-58.8 58.8-58.8z"/>
                                    </svg>
                                </div>
                                <div className={"col-9 text-left"}>
                                    Logout
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className={"left_side_content_menu_section"}>
                    <div className={"menu_loop_section"}>
                        <NavLink to={`${path}/home`} activeClassName={"active"}
                                 className={"menu_loop_section_inner_section"}>
                            <div className={"row"}>
                                <div className={"col-3 text-right"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.771 31.771">
                                        <path
                                            d="M31.771 20.319c0-.474-.279-.87-.676-1.066V11.9c.09-.034.146-.119.145-.214s-.062-.179-.149-.21L15.92 6.125a.9.9 0 0 0-.601 0L.15 11.477c-.089.031-.149.115-.15.21s.056.18.144.214l15.148 5.896c.211.081.444.081.655 0l14.102-5.492v6.947a1.19 1.19 0 0 0-.675 1.065 1.2 1.2 0 0 0 .729 1.102c-.429.847-.729 2.585-.729 3.081a1.2 1.2 0 0 0 1.198 1.197 1.2 1.2 0 0 0 1.197-1.197c0-.496-.301-2.234-.729-3.081.43-.181.731-.608.731-1.1zM4.888 14.87l.002 4.009c0 3.158 4.753 5.729 10.73 5.89 5.976-.161 10.729-2.729 10.729-5.89l.002-4.009-10.406 4.051c-.211.082-.444.082-.655 0L4.888 14.87z"/>
                                    </svg>
                                </div>
                                <div className={"col-9 text-left"}>
                                    All classes
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    <div className={"menu_loop_section"}>
                        <NavLink to={`${path}/all-student-progress-page`} activeClassName={"active"}
                                 className={"menu_loop_section_inner_section"}>
                            <div className={"row"}>
                                <div className={"col-3 text-right"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.14 30.14">
                                        <path
                                            d="M0 24.881h30.14v5.256H0zM3.095 4.327h4.324v19.007H3.095zm6.643 4.947h4.329v14.061H9.738zm6.491-3.556h4.327v17.615h-4.327zm6.7-5.716h4.324v23.331h-4.324z"/>
                                    </svg>
                                </div>
                                <div className={"col-9 text-left"}>
                                   Student Progress
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    <div className={"menu_loop_section"}>
                        <NavLink to={`${path}/student-search-topic-page`} activeClassName={"active"}
                                 className={"menu_loop_section_inner_section"}>
                            <div className={"row"}>
                                <div className={"col-3 text-right"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 487.95 487.95">
                                        <path
                                            d="M481.8 453l-140-140.1c27.6-33.1 44.2-75.4 44.2-121.6C386 85.9 299.5.2 193.1.2S0 86 0 191.4s86.5 191.1 192.9 191.1c45.2 0 86.8-15.5 119.8-41.4l140.5 140.5c8.2 8.2 20.4 8.2 28.6 0s8.2-20.4 0-28.6zM41 191.4c0-82.8 68.2-150.1 151.9-150.1s151.9 67.3 151.9 150.1-68.2 150.1-151.9 150.1S41 274.1 41 191.4z"></path>
                                    </svg>
                                </div>
                                <div className={"col-9 text-left"}>
                                    Search topics
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    <div className={"menu_loop_section"}>
                        <NavLink to={`${path}/student-profile-page`} activeClassName={"active"}
                                 className={"menu_loop_section_inner_section"}>
                            <div className={"row"}>
                                <div className={"col-3 text-right"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                        <path
                                            d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 0 0 9.3-35.2l-.9-2.6a443.74 443.74 0 0 0-79.7-137.9l-1.8-2.1a32.12 32.12 0 0 0-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 0 0-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 0 0-25.8 25.7l-15.8 85.4a351.86 351.86 0 0 0-99 57.4l-81.9-29.1a32 32 0 0 0-35.1 9.5l-1.8 2.1a446.02 446.02 0 0 0-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 0 0-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0 0 35.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0 0 25.8 25.7l2.7.5a449.4 449.4 0 0 0 159 0l2.7-.5a32.05 32.05 0 0 0 25.8-25.7l15.7-85a350 350 0 0 0 99.7-57.6l81.3 28.9a32 32 0 0 0 35.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9a283 283 0 0 1 0 92.2l-6.6 40.1 74.7 63.9a370.03 370.03 0 0 1-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 0 1-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 0 1 512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 0 1 400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390s58 11.6 79.2 32.8A111.6 111.6 0 0 1 624 502c0 29.9-11.7 58-32.8 79.2z"/>
                                    </svg>
                                </div>
                                <div className={"col-9 text-left"}>
                                    Settings
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    {/*<div className={"menu_loop_section"}>*/}
                    {/*    <div className={"menu_loop_section_inner_section"}>*/}
                    {/*        <div className={"row"}>*/}
                    {/*            <div className={"col-3 text-right"}>*/}
                    {/*                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 1 0 0 16zm4.953-4.613A5.97 5.97 0 0 0 14 8 6 6 0 1 0 2 8a5.97 5.97 0 0 0 1.047 3.387c.207-1.346 1.085-2.471 2.281-3.022C5.118 7.956 5 7.492 5 7a3 3 0 1 1 6 0 2.99 2.99 0 0 1-.328 1.365c1.196.551 2.074 1.676 2.281 3.022zM11 13.197V12a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v1.197c.883.511 1.907.803 3 .803s2.117-.292 3-.803zM8 8a1 1 0 1 0 0-2 1 1 0 1 0 0 2z"/></svg>*/}
                    {/*            </div>*/}
                    {/*            <div className={"col-9 text-left"}>*/}
                    {/*                Profile*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className={"menu_loop_section"}>
                        <NavLink to={`${path}/student-history-topic-page`} activeClassName={"active"}
                                 className={"menu_loop_section_inner_section"}>
                            <div className={"row"}>
                                <div className={"col-3 text-right"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M11.998 2.5A9.503 9.503 0 0 0 3.378 8H5.75a.75.75 0 0 1 0 1.5H2a1 1 0 0 1-1-1V4.75a.75.75 0 0 1 1.5 0v1.697A10.997 10.997 0 0 1 11.998 1C18.074 1 23 5.925 23 12s-4.926 11-11.002 11C6.014 23 1.146 18.223 1 12.275a.75.75 0 0 1 1.5-.037 9.5 9.5 0 0 0 9.498 9.262c5.248 0 9.502-4.253 9.502-9.5s-4.254-9.5-9.502-9.5zm.502 4.75a.75.75 0 0 0-1.5 0v5.5c0 .27.144.518.378.651l3.5 2a.75.75 0 0 0 .744-1.302L12.5 12.315V7.25z"/>
                                    </svg>
                                </div>
                                <div className={"col-9 text-left"}>
                                    History
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    <div className={"menu_loop_section"}>
                        <div className={"menu_loop_section_inner_section"}>
                            <div onClick={() => setShowAlert(true)} className={"row"}>
                                <div className={"col-3 text-right"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489.9 489.9">
                                        <path
                                            d="M468.3 255.8l.2-.2c.3-.4.6-.7.8-1.1.1-.1.1-.2.2-.3.2-.4.5-.8.7-1.2 0-.1.1-.2.1-.2l.6-1.3c0-.1 0-.1.1-.2.2-.4.3-.9.5-1.4 0-.1 0-.2.1-.2.1-.5.3-.9.3-1.4 0-.2 0-.3.1-.5.1-.4.1-.8.2-1.2.1-.6.1-1.1.1-1.7s0-1.1-.1-1.7c0-.4-.1-.8-.2-1.2 0-.2 0-.3-.1-.5l-.3-1.4c0-.1 0-.2-.1-.2-.1-.5-.3-.9-.5-1.4 0-.1 0-.1-.1-.2l-.6-1.3c0-.1-.1-.2-.1-.2-.2-.4-.4-.8-.7-1.2-.1-.1-.1-.2-.2-.3-.3-.4-.5-.8-.8-1.1l-.2-.2c-.4-.4-.7-.9-1.2-1.3l-98.9-98.8c-6.7-6.7-17.6-6.7-24.3 0s-6.7 17.6 0 24.3l69.6 69.6H136.8c-9.5 0-17.2 7.7-17.2 17.1 0 9.5 7.7 17.2 17.2 17.2h276.8l-69.1 69.1c-6.7 6.7-6.7 17.6 0 24.3 3.3 3.3 7.7 5 12.1 5s8.8-1.7 12.1-5l98.3-98.3c.5-.6.9-1 1.3-1.4zM110.7 34.3h128c9.5 0 17.2-7.7 17.2-17.1 0-9.5-7.7-17.2-17.2-17.2h-128C59.4 0 17.6 41.8 17.6 93.1v303.7c0 51.3 41.8 93.1 93.1 93.1h125.9c9.5 0 17.2-7.7 17.2-17.1 0-9.5-7.7-17.2-17.2-17.2H110.7c-32.4 0-58.8-26.4-58.8-58.8V93.1c.1-32.5 26.4-58.8 58.8-58.8z"/>
                                    </svg>
                                </div>
                                <div className={"col-9 text-left"}>
                                    Logout
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {/*<div className={"left_side_footer_section_main_div"}>*/}
            {/*    <div className={"left_side_footer_section_inner_section"}>*/}
            {/*         <div>Download Our <br/> Mobile app</div>*/}
            {/*        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476.213 476.213"><path d="M476.213 238.105L400 161.893v61.213H0v30h400v61.214z"/></svg>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}
export const LeftSideBarComponent = React.memo(LeftSideBarComponentFunction);
