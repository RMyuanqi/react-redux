import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import store from './store';

class Food extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        // 3. 使用store上的数据，使用store上的dispatch方法更改state
        const {food, clicking} = this.props;
        const foodImage = './images/food/' + food + '.jpeg';
        console.log('props:', this.props);
        return <div onClick={clicking}>
            <div>想吃：</div>
            <img src={foodImage} height="300" width="600"/>
        </div>;
    }
}

// 从redux的store中的state，映射到包裹组件的props上
const mapStateToProps = () => state => {
    return {
        food: state.food
    };
};

// 将dispatch和点击事件结合
const mapDispatchToProps = dispatch => {
    return {
        clicking: () => {
            return dispatch({
                type: 'CHANEG_FOOD',
                food: 'huojingshizi'
            });
        }
    };
}

// 包裹组件
// 2. connect，包裹组件
const WrappedFood = connect(
  mapStateToProps,
  mapDispatchToProps
)(Food);

// 根元素
class Root extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <WrappedFood />
        </div>;
    }
}

class SuperRoot extends Component {
    render() {
        // 1. Provider套在需要状态管理的子树根部
        return <Provider store={store}>
            <Root />
        </Provider>;
    }
}

ReactDOM.render(
    <SuperRoot />,
    document.getElementById('root')
);
