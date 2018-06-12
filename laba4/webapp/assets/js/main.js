import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Index from './components/index.react';
import Register from './components/register.react';
import Points from './components/points.react';

const App = () => {
    return (
            <Switch>
                <Route exact path='/' component={Index} />
                <Route path='/register' component={Register} />
                <Route path='/points' component={Points} />
            </Switch>
    );
}

ReactDOM.render(
    <BrowserRouter basename="/laba4">
        <App />
    </BrowserRouter>,
    document.getElementById('wrapper')
);
