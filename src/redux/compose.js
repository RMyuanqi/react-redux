let {compose} = require('redux');

const plus = (a, b) => {
    console.log('plus plus plus :', a, b);
    return a + b
};

const multi = (res) => {
    console.log('multi multi multi :', res);
    return res * 2
};

const composedExp = compose(multi, plus);

const res = composedExp(1, 5);

console.log('resss:', res);