import React from 'react';
import { Button } from 'belle'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showButton: false
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="header">
                    <div className="fio">Беллавин А.П.</div>
                    <div className="group">группа: Р3201</div>
                </div>
                <div className="main-wrapper">
                    <div className="auth-form">
                        <div className="login">
                            <label htmlFor="login">Логин:</label>
                            <input type="text" id="login" placeholder="Логин" />
                        </div>
                        <div className="password">
                            <label htmlFor="password">Пароль:</label>
                            <input type="password" id="password" placeholder="Пароль" />
                        </div>
                    </div>
                    <Button>Войти</Button>
                </div>
            </React.Fragment>

        );
    }
}
