import React, {useState} from "react";
import {useSelector} from "react-redux";
import DataTable from 'react-data-table-component';
import siteLog from "../../theme/image/siteLog.png";
import {FacebookLoader} from "../Loader/FacebookLoader";
import {IonAlert, IonContent} from "@ionic/react";
import {useHistory} from "react-router-dom";

export const AllTeacherUserListProgressComponent = ()=> {

    const {loading,schoolData} = useSelector((state) => state.allSchoolDataList);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const allSyllabusData = useSelector((state) => state.allSyllabusData);
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }

    const getSyllabusName = (id)=>{
        let foundIndex = null;
        allSyllabusData?.forEach((syllabus,key)=>{
            if(syllabus?.id === id){
                foundIndex = key;
            }
        })
        if(foundIndex !== null){
            return allSyllabusData[foundIndex]?.name
        }
    }
    const openProgressReport = (user)=>{
        history.push(`/user-progress-report/${user.id}`);
    }
    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
        },
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Phone Number',
            selector: row => row.mobile,
        },
        {
            name: 'Created At',
            selector: row => row.created_at,
        },
        {
            name: 'Syllabus type',
            selector: row => (
                <>
                    {getSyllabusName(row.syllabus_type)}
                </>
            ),
        },
        {
            name: 'Is Active',
            selector: row => row.is_active ? 'Yes' : 'No',
        },
        {
            name: 'Progress Report',
            selector: row =>(
                <button onClick={()=>openProgressReport(row)} className={"datatable_edit_button"}>Progress Report</button>
            ),
        },
    ];


    return (
        <IonContent>
          <div className={"admin_dashboard_main_content_container"}>
            <IonAlert
                isOpen={showSuccessAlert}
                onDidDismiss={() => setShowSuccessAlert(false)}
                header={'Success'}
                message={'School Updated successfully.'}
                buttons={['Close']}></IonAlert>
            <div className={"admin_dashboard_main_content_container"}>
                <div className={"admin_back_button_section"}>
                    <svg onClick={goBack} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.97 384.97"><path d="M192.485 0C86.185 0 0 86.185 0 192.485 0 298.797 86.173 384.97 192.485 384.97S384.97 298.797 384.97 192.485C384.97 86.185 298.797 0 192.485 0zm0 361.282c-92.874 0-168.424-75.923-168.424-168.797S99.611 24.061 192.485 24.061s168.424 75.55 168.424 168.424-75.55 168.797-168.424 168.797zm43.393-261.406c-4.704-4.74-12.319-4.74-17.011 0l-83.009 84.2c-4.572 4.62-4.584 12.56 0 17.191l82.997 84.2c4.704 4.74 12.319 4.74 17.011 0 4.704-4.752 4.704-12.439 0-17.191l-74.528-75.61 74.54-75.61c4.692-4.741 4.692-12.428 0-17.18z"/></svg>
                </div>
                <div className={"admin_logo_section"}>
                    <img alt={'siteLog'} src={siteLog}/>
                </div>
                <div className={"admin_hello_section"}>
                    School Data list
                </div>
                <div className={"admin_dashboard_main_content_inner add_school_list_section_container"}>
                    {(loading) ?
                        <div className={"loading_in_chapter_page_desktop"}>
                            <FacebookLoader type={"facebookStyle"} item={6}/>
                        </div>
                        :(schoolData?.length) ?
                            <DataTable
                                title="All Teachers"
                                defaultSortFieldID={1}
                                pagination
                                columns={columns}
                                data={schoolData}/>
                            :''
                    }
                </div>
            </div>
        </div>
        </IonContent>
    )
}