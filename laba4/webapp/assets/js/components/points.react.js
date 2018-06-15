import React from 'react';
import Header from './header.react';

export default class Points extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="main-wrapper">
                    <h1>Success register</h1>
                </div>
            </React.Fragment>
        );
    }
}