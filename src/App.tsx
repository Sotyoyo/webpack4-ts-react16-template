import React from 'react';
import { Button } from 'antd';

const App: React.FC = (props: {}) => {
    console.log(props);
    return (
        <h1>
            <Button type="danger">Hello, Webpack4, Typescript & Ant-design</Button>
        </h1>
    );
};

export default App;
