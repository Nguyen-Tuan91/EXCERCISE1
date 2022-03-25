import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { StaffReducer } from "./staffs";
import { DeptReducer } from "./department";
import { SalaryReducer } from './staffsSalary';

//import cai reducer vô

export const ConfigureStore= () => {
    const store=createStore(
        combineReducers({
            staffs: StaffReducer, 
            departments: DeptReducer,
            staffsSalary: SalaryReducer
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}
    
