import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

//Add new staff
export const addStaff =(staff) => ({
    type: ActionTypes.ADD_STAFF,
    payload: staff
});

export const postStaff=(staff) =>(dispatch) => {
    return fetch(baseUrl + 'staffs', {
        method: 'POST',
        body: JSON.stringify(staff),
        headers: {
            'Content-type' :'application/json'
        },
        credentials:'same-origin'
    })
   .then(response => {
       if(response.ok) {
           return response;
       } else {
           var error=new Error('Error' + response.status+ ': ' + response.statusText);
           error.response=response;
           throw error;
       }
   }, error => {
       var errmess=new Error(error.message);
       throw errmess;
   })
   .then(response => JSON.stringify(response))
   .then(response => dispatch(addStaff(response)))
   .catch(error => {console.log('Post staffs', error.message);alert('Your staff could not be posted\nError:', error.message); });
};

//UPDATE STAFF
export const updateStaff= (staff) => (dispatch) => {
    return fetch(baseUrl + 'staffs', {
        method: 'PATCH',
        body: JSON.stringify(staff),
        headers: {
            'Content-Type': 'application/JSON'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok) {
            return response;
        } else {
            var error=new Error('Error' + response.status + ': ' + response.statusText);
            error.response=response;
            throw error;
        }
    }, error => {
        var errmess=new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(updateStaff(response)))
    .catch(error => {console.log('Update staff', error.message);
                    alert('Your staff could not be updated\nError :' + error.message);
    });
}

//DELETE STAFF
export const deleteStaff=(id) => (dispatch) => {
    return fetch(baseUrl + `staffs/${id}`, {
        method: 'DELETE'
    })
    .then(() => dispatch(deleteStaffSuccess(id)));
};
export const deleteStaffSuccess=(id) => ({
    type: ActionTypes.DELETE_STAFF_SUCCESS,
    payload: id
});
export const deleteStaffLoading=() => ({
    type: ActionTypes.DELETE_STAFF_LOADING
});

//Fetch staff
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

export const fetchDepartments= () => (dispatch) => {
    dispatch(departmentsLoading(true));

    return fetch(baseUrl + 'departments')
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
    .then(departments => dispatch(addDepartments(departments)))
    .catch(error => dispatch(departmentsFailed(error.message)));
}

export const departmentsLoading= () => ({
    type: ActionTypes.DEPARTMENTS_LOADING
});

export const departmentsFailed= (errmess) => ({
    type: ActionTypes.DEPARTMENTS_FAILED,
    payload: errmess
});
export const addDepartments= (departments) => ({
    type: ActionTypes.ADD_DEPARTMENTS,
    payload: departments
});

export const fetchStaffSalary= () => (dispatch) => {
    dispatch(staffSalaryLoading(true));

    return fetch(baseUrl + 'staffSalary')
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
    .then(staffSalary => dispatch(addStaffSalary(staffSalary)))
    .catch(error => dispatch(staffSalaryFailed(error.message)));
}

export const staffSalaryLoading= () => ({
    type: ActionTypes.STAFFSALARY_LOADING
});

export const staffSalaryFailed= (errmess) => ({
    type: ActionTypes.STAFFSALARY_FAILED,
    payload: errmess
});
export const addStaffSalary= (staffSalary) => ({
    type: ActionTypes.ADD_STAFFSALARY,
    payload: staffSalary
});
