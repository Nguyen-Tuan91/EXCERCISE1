import * as ActionTypes from "./ActionTypes";

export const Staffs = (
  state = {
    isLoading: false,
    errMess: null,
    staffs: [],
  },action) => {
  switch (action.type) {
    //FETCH
    case ActionTypes.STAFFS_LOADING:
      return { ...state, isLoading: true, errMess:null, staffs: []};
    case ActionTypes.ADD_STAFFS:
      return {...state, isLoading: false, errMess:null, staffs: action.payload};
    case ActionTypes.STAFFS_FAILED:
      return {...state, isLoading: false, errMess: action.payload, staffs: []};

    //ADD STAFF
    case ActionTypes.ADD_STAFF:
      return {...state, isLoading: false, errMess: null, staffs: action.payload};

    //DELETE
    case ActionTypes.DELETE_STAFF_LOADING:
      return { ...state, isLoading: true, errMess: null, staffs: [] };
    case ActionTypes.DELETE_STAFF_SUCCESS:
      const filteredStaffs = state.staffs.filter(
        (staff) => staff.id !== action.payload
      );
      return { ...state, isLoading: false, staffs: filteredStaffs };
    default:
      return state;
  }
};
