import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addStaff= (staff) => ({
    type: ActionTypes.ADD_STAFF,
    payload: staff
});
