// LOGIN STATUS
export const isSuperAdminLogin = () => {
    if (localStorage.getItem('superAdminAuthentication')) return true;
    return false;
}
export const isSchoolMasterLogin = () => {
    if (localStorage.getItem('schoolMasterAuthentication')) return true;
    return false;
}
export const isTeacherMasterLogin = () => {
    if (localStorage.getItem('teacherMasterAuthentication')) return true;
    return false;
}
export const isStudentLogin = () => {
    if (localStorage.getItem('studentAuthentication')) return true;
    return false;
}