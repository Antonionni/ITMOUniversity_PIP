import React from 'react';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header">
                <div className="fio">Беллавин А.П.</div>
                <div className="group">группа: Р3201</div>
            </div>
        )
    }
}