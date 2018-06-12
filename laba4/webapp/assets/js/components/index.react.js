import React from 'react';
import { Button, TextInput } from 'belle';
import { Link } from "react-router-dom";
import Header from '../components/header.react';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        console.log("create index");
        this.handleEnterClick = () => {
            debugger;
            console.log("login = ", this.login.value, " password = ", this.password.value);
        };
    }

    render() {
        const { match } = this.props;
        console.log("exampler");
        return (
            <div>
                <Header />
                <div className="main-wrapper">
                    <div className="auth-form">
                        <div className="login">
                            <TextInput placeholder="Логин" ref={node => { this.login = node; }}/>
                        </div>
                        <div className="password">
                            <TextInput placeholder="Пароль" ref={node => { this.password = node; }} />
                        </div>
                        <div className="buttons">

                            <Button primary>Войти</Button>
                            <Link to="/register">
                                <Button primary>Регистрация</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

