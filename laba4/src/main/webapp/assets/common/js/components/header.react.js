import React, { Component } from 'react';
import { Button } from 'primereact/components/button/Button';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.handleEntryClick = () => {
            console.log("Entry");
        };
        this.handleRegistryClick = () => {
            console.log("registry");
        };
    }
    render() {
        return (
            <header className="main-header">
                <div className="logo-header"></div>
                <div className="buttons-header">
                    <Button label="Вход" onClick={this.handleEntryClick} />
                    <Button label="Регистрация" onClick={this.handleRegistryClick} />
                </div>
            </header>
        );
    }
}
