import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore= () => {
    const store=createStore(
        combineReducers({
            staffs: Staffs,
            departments: Departments,
            salary: Salary
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}
    
