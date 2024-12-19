export const storeDataIntoLocalstorage = (type,data)=>{
    switch (type){
        case 'subject':
            localStorage.setItem('ALL_SUBJECT_STUDENT_SCHOOL',JSON.stringify(data));
            break;
        case 'classes':
            localStorage.setItem('TEACHER_ALL_CLASSES_DATA',JSON.stringify(data));
            break;
    }
}