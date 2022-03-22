import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchStaffs= () => (dispatch) => {
    dispatch(staffsLoading(true));

    return fetch(baseUrl + 'staffs')
    .then(response => {
        if(response.ok) {
            return response;
        } else {
            var error=new Error('Error' + response.status + ": " + response.statusText);
            error.response=response;
            throw error;
        }
    }, error => {
        var errmess= new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(staffs => dispatch(addStaffs(staffs)))
    .catch(error => dispatch(staffsFailed(error.message)));
}

export const staffsLoading= () => ({
    type: ActionTypes.STAFFS_LOADING
});

export const staffsFailed= (errmess) => ({
    type: ActionTypes.STAFFS_FAILED,
    payload: errmess
});
export const addStaffs= (staffs) => ({
    type: ActionTypes.ADD_STAFFS,
    payload: staffs
});

export const fetchDepartment= () => (dispatch) => {
    dispatch(departmentLoading(true));

    return fetch(baseUrl + 'department')
    .then(response => {
        if(response.ok) {
            return response;
        } else {
            var error=new Error('Error' + response.status + ": " + response.statusText);
            error.response=response;
            throw error;
        }
    }, error => {
        var errmess= new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(department => dispatch(addDepartment(department)))
    .catch(error => dispatch(departmentFailed(error.message)));
}

export const departmentLoading= () => ({
    type: ActionTypes.DEPARTMENT_LOADING
});

export const departmentFailed= (errmess) => ({
    type: ActionTypes.DEPARTMENT_FAILED,
    payload: errmess
});
export const addDepartment= (department) => ({
    type: ActionTypes.ADD_DEPARTMENT,
    payload: department
});

export const fetchSalary= () => (dispatch) => {
    dispatch(salaryLoading(true));

    return fetch(baseUrl + 'salary')
    .then(response => {
        if(response.ok) {
            return response;
        } else {
            var error=new Error('Error' + response.status + ": " + response.statusText);
            error.response=response;
            throw error;
        }
    }, error => {
        var errmess= new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(salary => dispatch(addSalary(salary)))
    .catch(error => dispatch(salaryFailed(error.message)));
}

export const salaryLoading= () => ({
    type: ActionTypes.SALARY_LOADING
});

export const salaryFailed= (errmess) => ({
    type: ActionTypes.SALARY_FAILED,
    payload: errmess
});
export const addSalary= (salary) => ({
    type: ActionTypes.ADD_SALARY,
    payload: salary
});

export const fetchStaffInDept= () => (dispatch) => {
    dispatch(staffInDeptLoading(true));

    return fetch(baseUrl + 'staffInDept')
    .then(response => {
        if(response.ok) {
            return response;
        } else {
            var error=new Error('Error' + response.status + ": " + response.statusText);
            error.response=response;
            throw error;
        }
    }, error => {
        var errmess= new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(staffInDept => dispatch(addStaffInDept(staffInDept)))
    .catch(error => dispatch(staffInDeptFailed(error.message)));
}

export const staffInDeptLoading= () => ({
    type: ActionTypes.STAFFINDEPT_LOADING
});

export const staffInDeptFailed= (errmess) => ({
    type: ActionTypes.STAFFINDEPT_FAILED,
    payload: errmess
});
export const addStaffInDept= (staffInDept) => ({
    type: ActionTypes.STAFFINDEPT_SALARY,
    payload: staffInDept
});