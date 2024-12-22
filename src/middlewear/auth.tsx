// LOGIN STATUS
export const isSuperAdminLogin = () => {
    return !!localStorage.getItem('superAdminAuthentication');

};
export const isSchoolMasterLogin = () => {
    return !!localStorage.getItem('schoolMasterAuthentication');

}
export const isTeacherMasterLogin = () => {
    return !!localStorage.getItem('teacherMasterAuthentication');

}
export const isStudentLogin = () => {
    return !!localStorage.getItem('studentAuthentication');

}