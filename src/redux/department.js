import * as ActionTypes from './ActionTypes';

export const Department= (state = {
    isLoading: true,
    errMess: null,
    departments:[]
},action) => {
    switch(action.type) {
        case ActionTypes.ADD_DEPARTMENT:
            return {...state, isLoading: false, errMess: null, departments: action.payload}
        case ActionTypes.DEPARTMENT_LOADING:
            return {...state, isLoading: true, errMess: null, departments: []}
        case ActionTypes.DEPARTMENT_FAILED:
            return {...state, isLoading: false, errMess: action.payload, departments: []}
        default:
            return state;
    }
};