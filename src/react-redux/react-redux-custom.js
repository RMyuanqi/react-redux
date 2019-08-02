import React, {Component, useState, useReducer} from 'react';
import ReactDOM from 'react-dom';
// import {Provider, connect} from 'react-redux';
import store from './store';


// 定义Provider与connect的方法
const {Provider, connect} = (function () {
    // 通用Context，外层存放store，内层获取store
    const ReduxContext = React.createContext(null);

    const ReduxProvider = ReduxContext.Provider;

    class Provider extends Component {
        constructor(props) {
            super(props);
            const {store} = props;
            // 将props中的store存起来，放到context中
            this.state = {store};
        }

        render() {
            return <ReduxProvider value={this.state}>
                    {this.props.children}
                </ReduxProvider>;
        }
    }



    const connect = (mapStateToProps, mapDispatchToProps) => {
        // 订阅store中的subscribe，并在每次发生的时候，去重新生成props与执行刷新
        function subscribe({
            store,
            setState,
            dispatchToUse
        }) {
            store.subscribe((e) => {
                // 再一次获取新的props
                const newStateProps = mapStateToProps(store.getState());
                const newEventProps = mapDispatchToProps(dispatchToUse);
                const newMergedProps = Object.assign({}, newStateProps, newEventProps);
                // 刷新，请注意，这里可以自己实现一下
                // 对比之前的value与心的value，从而决定是否要刷新，这也是react-redux性能优化的一步
                setState(newMergedProps);
            });
        }

        return (ConnetComponent) => {
            return function ConnetedComponent (props) {
                // 获取最外层provider上的store
                const {store} = React.useContext(ReduxContext);
                // 传递给mapDispatchToProps的dispatch方法
                const dispatchToUse = (action) => {
                    store.dispatch(action);
                };

                const stateProps = mapStateToProps(store.getState());
                const eventProps = mapDispatchToProps(dispatchToUse);
                const mergedProps = Object.assign({}, stateProps, eventProps);
                // 拥有了一个刷新方法，和心的state
                const [processedProps, setState] = React.useState(mergedProps);
		        // 订阅刷新
                if (!subscribe.used) {
                    subscribe({
                        store,
                        setState,
                        dispatchToUse
                    });
                    subscribe.used = true;
                }
                console.log('mergedProps:', mergedProps);
                return <ConnetComponent {...processedProps}/>;
            };
        };
    };

    return {
        Provider,
        connect
    };
})();


class Food extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {food, clicking} = this.props;
        const foodImage = './images/food/' + food + '.jpeg';

        return <div onClick={clicking}>
            <div>想吃：</div>
            <img src={foodImage} height="300" width="600"/>
        </div>;
    }
}

// 从redux的store中的state，映射到包裹组件的props上
const mapStateToProps = state => {
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

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('root')
);
