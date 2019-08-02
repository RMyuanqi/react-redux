import {createStore, combineReducers} from 'redux';

const initChangan = {
   food: 'shuipenyangrou'
};

// 整体的reducer
const allReducer = function (state = initPerson, action) {
    if (action.type === 'CHANEG_FOOD') {
        return {
            ...state,
            food: action.food
        };
    }
    return state;
};

const store = createStore(
    // combinedReducer,
    allReducer,
    initChangan
);

export default store;