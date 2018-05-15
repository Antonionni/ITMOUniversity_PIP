import React from 'react';
import Header from '../../../common/js/components/header.react';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="index-wrapper">
                    Hello world!
                </div>
            </React.Fragment>

        );
    }
}
