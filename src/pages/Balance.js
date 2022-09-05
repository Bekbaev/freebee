import React from 'react';
import Header from "../components/Header";

const Balance = () => {
    return (
        <>
            <ul className="breadcrumb">
                <li><a href="/frontend/web/">Главная</a></li>
                <li className="active">Баланс</li>
            </ul>
            <div className="user-default-balance">
                <p>Ваше имя FreeBee</p>
                <p>Баланс 1</p>
                <p>
                    <b>История транзакций</b>
                </p>
            </div>
        </>
    );
};

export default Balance;