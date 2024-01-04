import {Routing} from "../pages";
import {withProviders} from "./providers";
import './index.scss';
import React from "react";

const App = () => {
    return (
        <div className="app">
            <Routing/>
        </div>
    );
}

export default withProviders(App);
