require('./index.scss');

const content = 'Hello, Webpack';
const oH1 = document.createElement('h1');
oH1.innerText = content;

function render() {
    if (document.querySelector('#root')) {
        (document.querySelector('#root') as HTMLElement).appendChild(oH1);
    }
}

render();
