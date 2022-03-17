import { createStore, combineReducers } from 'redux';
import { Dishes } from './dishes';
import { Leaders } from './leaders';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { DISHES } from '../shared/dishes';
import { LEADERS } from '../shared/leaders';
import { COMMENTS } from '../shared/comments';

export const ConfigureStore=() => {
    const store=createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            leaders: Leaders,
            promotions: Promotions
        })
       
    );
    return store;
}