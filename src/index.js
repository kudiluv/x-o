import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import "./assets/index.css"

export default function Index(){
    return (<div>
        <App/>
    </div>);
}
ReactDOM.render(<Index />,
    document.getElementsByClassName("root")[0])
