import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const configureStore= () => {
    const store=createStore(
        combineReducers({
            staffs: Staffs,
            department: Departments,
            staffInDept: StaffInDept,
            salary: Salary
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}
    
