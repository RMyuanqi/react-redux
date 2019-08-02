let {createStore, combineReducers} = require('redux');

const initPerson = {
   name: 'tanqi',
   dress: 'nanzhuang',
   place: ''
};

// 分开的所有的reducer
const changeDress = function (dress = initPerson.dress, action) {
    console.log('changeDress:', action);
    if (action.type === 'CHANEG_DRESS') {
        return action.dress;
    }
    return dress;
};

// 
const changePlace = function (place = initPerson.place, action) {
    if (action.type === 'CHNAGE_PLACE') {
        return action.place;
    }
    return place;
};

const changeName = function (name = initPerson.name, action) {
    return name;
};

// 整体的reducer
const allReducer = function (state = initPerson, action) {

    if (action.type === 'CHANEG_DRESS') {
        return {
            ...state,
            dress: action.dress
        };
    }
    else if (action.type === 'CHNAGE_PLACE') {
        return {
            ...state,
            place: action.place
        };
    }
    return state;
};

let combinedReducer = combineReducers({
    dress: changeDress,
    place: changePlace,
    name: changeName
});

// 1. 创建了一个store
const store = createStore(
    combinedReducer,
    // allReducer,
    initPerson
);

// 业务逻辑
const getImageUrl = ({name, dress, place}) => {
    return `./images/${name}_${dress}_${place}.jpeg`;
};

const personImg = document.getElementById('person');
const changeDressButton = document.getElementById('changeDress');
const changePlaceButton = document.getElementById('changePlace');


personImg.src = getImageUrl(store.getState());


// console.log('redux-init-state:', store.getState());

store.subscribe(() => {
    personImg.src = getImageUrl(store.getState());
});


changeDressButton.onclick = () => {
    // 2. 调用dispatch方法(间接的调用了reducer)
    store.dispatch({
        type: 'CHANEG_DRESS',
        dress: 'nvzhuang'
    });
};

changePlaceButton.onclick = () => {
    store.dispatch({
        type: 'CHNAGE_PLACE',
        place: 'zhangxiaojing'
    });
};