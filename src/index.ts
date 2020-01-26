const es7Func = async () => {
  console.log('- Async Supported')
}
es7Func()

const obj = { x: '- Spread Operator Supported' }
const { x } = obj
console.log(x)

const number = '1.20'
console.log('- String pad Supported: ', number.padStart(5, '0'))

// import React from 'react';
// import reactDOM from 'react-dom';
// import App from './App';

// reactDOM.render(<App />, document.getElementById('root'));
