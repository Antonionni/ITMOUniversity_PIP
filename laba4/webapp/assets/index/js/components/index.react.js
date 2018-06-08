import React from 'react';
import { Button, TextInput } from 'belle';

export default class Index extends React.Component {
    constructor(props) {
        super(props);

        this.handleEnterClick = () => {
            debugger;
            console.log("login = ", this.login.value, " password = ", this.password.value);
        };
    }

    render() {
        return (
            <div>
                <div className="header">
                    <div className="fio">Беллавин А.П.</div>
                    <div className="group">группа: Р3201</div>
                </div>
                <div className="main-wrapper">
                    <div className="auth-form">
                        <div className="login">
                            <TextInput placeholder="Логин" ref={node => { this.login = node; }}/>
                        </div>
                        <div className="password">
                            <TextInput placeholder="Пароль" ref={node => { this.password = node; }} />
                        </div>
                        <div className="buttons">
                            <Button primary >Войти</Button>
                            <Button primary>Регистрация</Button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

