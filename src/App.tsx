import React from 'react';
import { Button, Table, Input } from 'antd';

const App: React.FC = (props: {}) => {
    console.log(props);
    return (
        <div className="container">
            <Button type="danger">Hello, Webpack4, Typescript & Ant-design</Button>
            <Table />
            <Input />
        </div>
    );
};

export default App;
