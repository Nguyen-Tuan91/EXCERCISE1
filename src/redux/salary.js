import * as ActionTypes from './ActionTypes';

export const SalaryReducer= (state = {
    isLoading: true,
    errMess: null,
    staffSalary:[]
},action) => {
    switch(action.type) {
        case ActionTypes.ADD_STAFFSALARY:
            return {...state, isLoading: false, errMess: null, staffSalary: action.payload}
        case ActionTypes.STAFFSALARY_LOADING:
            return {...state, isLoading: true, errMess: null, staffSalary: []}
        case ActionTypes.STAFFSALARY_FAILED:
            return {...state, isLoading: false, errMess: action.payload, staffSalary: []}
        default:
            return state;
    }
};