import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import DataTable from 'react-data-table-component';
import siteLog from "../../theme/image/siteLog.png";
import {FacebookLoader} from "../Loader/FacebookLoader";
import {useHistory} from "react-router-dom";
import Modal from 'react-modal';
import {IonAlert, IonContent} from "@ionic/react";
import {actionToUpdateSubjectInDb} from "../../actions/CommonAction";

export const AllSubjectListComponent = ()=> {

    const {loading,subjectData} = useSelector((state) => state.allSubjectDataList);
    const dispatch = useDispatch();
    const [userEditPopup, setUserEditPopup] = React.useState(null);
    const [name, setName] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [savingMode, setSavingMode] = useState(false);
    const history = useHistory();
    const modalPopupRef = useRef();

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    function closeModal() {
        setUserEditPopup(null);
    }

    const goBack = () => {
        history.goBack();
    }
    function openEditUserPopupModal(data) {
        setUserEditPopup(data);
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
            name: 'Created At',
            selector: row => row.created_at,
        },
        {
            name: 'Edit',
            selector: row =>(
                <button onClick={()=>openEditUserPopupModal(row)} className={"datatable_edit_button"}>Edit</button>
            ),
        },
    ];

    const validateForm = () => {
        if (!name?.trim()?.length) {
            return false;
        }
        return true;
    }
    const callFunctionToSubmit = async (e)=>{
        if(validateForm()){
            setSavingMode(true);
            let payload = {
                id:userEditPopup?.id,
                name:name,
                created_at:userEditPopup?.created_at
            }
            await dispatch(actionToUpdateSubjectInDb(payload));
            setTimeout(function(){
                resetForm();
            },1000)
        }
        e.preventDefault();
        return false;
    }

    const resetForm = ()=>{
        setSavingMode(false);
        setShowSuccessAlert(true);
        setUserEditPopup(null);
        setName('');
    }

    useEffect(()=>{
        if(userEditPopup !== null){
            setName(userEditPopup?.name);
        }
    },[userEditPopup])

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
                        :(subjectData?.length) ?
                            <DataTable
                                title="All Subjects"
                                defaultSortFieldID={1}
                                pagination
                                columns={columns}
                                data={subjectData}/>
                            :''
                    }
                </div>
            </div>
            <Modal
                isOpen={userEditPopup ? true : false}
                onRequestClose={closeModal}
                style={customStyles}
                ref={modalPopupRef}
                id={"editPopupId"}
                contentLabel="Edit user Popup">
                <h2>Edit Subject Data</h2>
                <div onClick={closeModal} className={"close_modal_form_button"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330"><path d="M165 0C120.926 0 79.492 17.163 48.328 48.327c-64.334 64.333-64.334 169.011-.002 233.345C79.49 312.837 120.926 330 165 330s85.508-17.163 116.672-48.328c64.334-64.334 64.334-169.012 0-233.345C250.508 17.163 209.072 0 165 0zm74.246 239.245c-2.93 2.929-6.768 4.394-10.607 4.394s-7.678-1.465-10.605-4.394L165 186.213l-53.033 53.033c-2.93 2.929-6.768 4.394-10.607 4.394s-7.678-1.465-10.605-4.394a15 15 0 0 1 0-21.213L143.787 165l-53.033-53.033a15 15 0 0 1 0-21.213c5.857-5.857 15.355-5.857 21.213 0L165 143.787l53.031-53.033c5.857-5.857 15.355-5.857 21.213 0a15 15 0 0 1 0 21.213L186.213 165l53.033 53.032c5.858 5.858 5.858 15.356 0 21.213z"/></svg>
                </div>
                <br/>
                <form onSubmit={callFunctionToSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input
                            onChange={(e)=>setName(e.target.value)}
                            value={name}
                            type="name" className="form-control" aria-describedby="emailHelp" placeholder="School name" required/>
                        <small className="form-text text-muted">
                            Icon and avatar will auto picked up according to subject name.
                        </small>
                    </div>
                    <button type="submit" className="btn btn-primary"
                            disabled={!validateForm()}>
                        {savingMode ? 'Updating...' : 'Update'}
                    </button>
                </form>
            </Modal>
        </div>
        </IonContent>
    )
}