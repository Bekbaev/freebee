import React, { useState, useMemo } from 'react';
import {Link, NavLink} from "react-router-dom";
import InputMask from 'react-input-mask';
import Api from "../api/api";
import toast from "../utils/toastPlugin";

const PasswordResetRequest = () => {

    const STAGES = {
        SEND_SMS: 'SEND_SMS',
        CONFIRM_CODE: 'CONFIRM_CODE',
        CHANGE_PASSWORD: 'CHANGE_PASSWORD'
    };
    const [stage, setStage] = useState(STAGES.SEND_SMS);
    const [login, setLogin] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');

    const buttonText = useMemo(() => {
        let text = 'Восстановить';
        if (stage === STAGES.SEND_SMS) {
            text = 'Восстановить';
        }
        if (stage === STAGES.CONFIRM_CODE) {
            text = 'Отправить';
        }
        if (stage === STAGES.CHANGE_PASSWORD) {
            text = 'Обновить пароль';
        }
        return text;
    }, [stage])

    const submitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('phone', login);
        formData.append('action', stage);

        switch (stage) {
            case STAGES.SEND_SMS:
                await sendSMS(formData);
                break;
            case STAGES.CONFIRM_CODE:
                await confirmCode(formData);
                break;
            case STAGES.CHANGE_PASSWORD:
                await changePassword(formData);
                break;
            default:
                break;
        }
    };

    const sendSMS = async (formData) => {
        try {
            const data = await Api.resetPassword(formData);
            toast.success(data.message);
            setStage(STAGES.CONFIRM_CODE);
        } catch (e) {
            toast.error(e.response.data.message);
        }
    }

    const confirmCode = async (formData) => {
        try {
            formData.append('code', code);
            const data = await Api.resetPassword(formData);
            toast.success(data.message);
            setStage(STAGES.CHANGE_PASSWORD);
        } catch (e) {
            toast.error(e.response.data.message);
        }
    }

    const changePassword = async (formData) => {
        try {
            formData.append('new_password', password);
            const data = await Api.resetPassword(formData);
            toast.success(data.message);
            setTimeout(() => {
                window.location.replace('/login');
            }, 2000);
        } catch (e) {
            console.log(e);
            toast.error(e.response.data.message);
        }
    }

    return (
        <>
            <ul className="breadcrumb" style={{
                marginTop: '80px'
            }}>
                <li><Link to="/">Главная</Link></li>
                <li className="active">Восстановление пароля</li>
            </ul>
            <div className="container">
                <div className="user-default-password-reset-request">
                    <div className="row">
                        <div className="col-lg-5">
                            <form id="request-password-reset-form"
                                  method="post" role="form" onSubmit={(e) => submitForm(e)}>
                                <input type="hidden" name="_csrf-frontend"
                                       value="iUxkaavxlOgUL8cd1NftA5bA50W1xCsbuZFDfzY8E2Z1eCdekstHvvS_eNMU2OtExkstvxbWjOJAZdA8ihpl5g=="/>
                                {stage === STAGES.SEND_SMS && <div className="form-group field-passwordresetrequestform-phone required">
                                    <label className="control-label" htmlFor="passwordresetrequestform-phone">Ваш
                                        номер сотового</label>
                                    <div className="form-group field-loginform-phone required">
                                        <InputMask
                                            mask="+7 (999) 999 99 99"
                                            onChange={e => setLogin(e.currentTarget.value)}
                                            value={login}
                                        >
                                            {() => (
                                                <input
                                                    type="text"
                                                    id="loginform-phone"
                                                    className="form-control"
                                                    name="LoginForm[phone]"
                                                    placeholder="+7 (___) ___ __ __"
                                                    aria-required="true"
                                                />
                                            )}
                                        </InputMask>
                                    </div>
                                </div> }
                                {stage === STAGES.CONFIRM_CODE && <div className="form-group field-passwordresetrequestform-phone required">
                                    <label className="control-label" htmlFor="passwordresetrequestform-phone">Код из смс</label>
                                    <div className="form-group field-loginform-phone required">
                                        <InputMask
                                            mask="999999"
                                            onChange={e => setCode(e.currentTarget.value)}
                                            value={code}
                                        >
                                            {() => (
                                                <input
                                                    type="text"
                                                    id="loginform-phone"
                                                    className="form-control"
                                                    name="LoginForm[phone]"
                                                    placeholder="000000"
                                                    aria-required="true"
                                                />
                                            )}
                                        </InputMask>
                                    </div>
                                </div> }
                                {stage === STAGES.CHANGE_PASSWORD && <div className="form-group field-passwordresetrequestform-phone required">
                                    <label className="control-label" htmlFor="passwordresetrequestform-phone">Новый пароль</label>
                                    <div className="form-group field-loginform-phone required">
                                        <input
                                            type="password"
                                            id="loginform-phone"
                                            className="form-control"
                                            name="LoginForm[phone]"
                                            placeholder="Введите новый пароль"
                                            aria-required="true"
                                            value={password}
                                            onChange={e => setPassword(e.currentTarget.value)}
                                        />
                                    </div>
                                </div> }
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">
                                        { buttonText }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PasswordResetRequest;