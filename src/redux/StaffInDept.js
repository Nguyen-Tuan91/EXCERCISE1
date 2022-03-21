import * as ActionTypes from './ActionTypes';

export const StaffInDept= (state = {
    isLoading: true,
    errMess: null,
    staffInDept:[]
    },action) => {
    switch(action.type) {
        case ActionTypes.ADD_STAFFINDEPT:
            return {...state, isLoading: false, errMess: null, staffInDept: action.payload}
        case ActionTypes.STAFFINDEPT_LOADING:
            return {...state, isLoading: true, errMess: null, staffInDept: []}
        case ActionTypes.STAFFINDEPT_FAILED:
            return {...state, isLoading: false, errMess: action.payload, staffInDept: []}
        default:
            return state;
    }
};