import React from 'react';
import { Button, TextInput } from 'belle';
import Header from './header.react';
import { Link } from 'react-router-dom';
import { signUp } from '../ducks/users';

export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password1: "",
            password2: ""
        };

        this.handleUpdateInput = ({ target }) => {
            this.setState({
                [target.name]: target.value
            });
        }
        this.handleRegisterClick = () => {
            const { dispatch } = this.props;
            const { login, password1, password2 } = this.state;
            console.log("login =", login , " password = ", password1);
            dispatch(signUp(login, password1, password2));
        };
    }

    render() {
        return(
            <div>
                <Header />
                <div className="navigation">
                    <Link to="/">Вернуться</Link>
                </div>
                <div className="register form">
                    <div>
                        <TextInput name="login" placeholder="Введите логин" onChange={this.handleUpdateInput} />
                    </div>
                    <div className="password">
                        <TextInput name="password1" placeholder="Введите пароль" onChange={this.handleUpdateInput} />
                    </div>
                    <div className="password">
                        <TextInput name="password2" placeholder="Повторите пароль" onChange={this.handleUpdateInput} />
                    </div>
                    <div className="buttons">
                        <Button primary onClick={this.handleRegisterClick.bind(this)}>Зарегистрироваться</Button>
                    </div>
                </div>
            </div>
        );
    }
}