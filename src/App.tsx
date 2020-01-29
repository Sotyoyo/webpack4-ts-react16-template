import React from 'react';
import { Button, Table, Input } from 'antd';

const App: React.FC = (props: {}) => {
    console.log(props);
    return (
        <h1>
            <Button type="danger">Hello, Webpack4, Typescript & Ant-design</Button>
            <Table />
            <Input />
        </h1>
    );
};

export default App;
