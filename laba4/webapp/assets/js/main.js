import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Index from './components/index.react';
import Register from './components/register.react';
import Points from './components/points.react';

const App = () => {
    return (
        <main>
            <Switch>
                <Route component={Index} />
                <Route path='/register' component={Register} />
                <Route path='/points' component={Points} />
            </Switch>
        </main>

    );
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('wrapper')
);
