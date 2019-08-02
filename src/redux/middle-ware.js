let {createStore, combineReducers, applyMiddleware} = require('redux');
let thunkMiddleware = require('redux-thunk').default;

const initPerson = {
   name: 'tanqi',
   dress: 'nanzhuang',
   place: ''
};

// 分开的所有的reducer
const changeDress = function (dress = initPerson.dress, action) {
    if (action.type === 'CHANEG_DRESS') {
        return action.dress;
    }
    return dress;
};

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


const store = createStore(
    // combinedReducer,
    allReducer,
    initPerson,
    applyMiddleware(thunkMiddleware)
);

// 切换为LOADING态
function loading() {
    return {
        type: 'CHNAGE_PLACE',
        place: 'loading'
    };
}

// 切换为SUCCESS态
function success() {
    return {
        type: 'CHNAGE_PLACE',
        place: 'zhangxiaojing'
    };
}

// 复合型的对于dispatch进行调用
function changePlaceWait() {
    return function (dispatch) {

        // 业务逻辑返回之前
        dispatch(loading());

        // 业务逻辑返回之后(或ajax请求完成数据之后)
        setTimeout(function () {
            dispatch(success());
        }, 2000);
    };
}


// 业务逻辑
const getImageUrl = ({name, dress, place}) => {
    return `./images/${name}_${dress}_${place}.jpeg`;
};

const personImg = document.getElementById('person');
const changeDressButton = document.getElementById('changeDress');
const changePlaceButton = document.getElementById('changePlace');


personImg.src = getImageUrl(store.getState());

store.subscribe(() => {
    personImg.src = getImageUrl(store.getState());
});

changeDressButton.onclick = () => {
    store.dispatch({
        type: 'CHANEG_DRESS',
        dress: 'nvzhuang'
    });
};

changePlaceButton.onclick = () => {
    store.dispatch(changePlaceWait());
};