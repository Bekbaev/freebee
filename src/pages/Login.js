import FingerprintJS from '@fingerprintjs/fingerprintjs'
import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Api from '../api/api'
import InputMask from 'react-input-mask'

const Login = () => {
    // const [login, setLogin] = useState('god')
    // const [password, setPassword] = useState('test123')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const authorization = async () => {
        const fp = await FingerprintJS.load()
        const result = await fp.get()
        const visitorId = result.visitorId

        const formData = new FormData()
        formData.append('login', login)
        formData.append('password', password)
        formData.append('fingerprint', visitorId)

        try {
            const { ok, refresh_token, access_token } = await Api.authorization(formData)

            if (ok === true) {
                axios.defaults.headers.Authorization = access_token
                localStorage.access_token = access_token
                localStorage.refresh_token = refresh_token
                window.location.replace('/')
            }
        } catch (e) {
            console.log(e)
            setError(true)
        }
    }

    return (
        <>
            <ul className="breadcrumb" style={{
                marginTop: '80px'
            }}>
                <li>
                    <Link to="/">Главная</Link>
                </li>
                <li className="active">Авторизация</li>
            </ul>
            <div className="user-default-login">
                <div className="row">
                    <div className="col-lg-4 col-lg-offset-2 col-md-5 col-md-offset-1">
                        <h2>Уже зарегистрированы?</h2>
                        <form id="login-form" method="post" role="form">
                            <input
                                type="hidden"
                                name="_csrf-frontend"
                                value="mFLgRAUu1Nyv-j67uzttdsRP7hR8JIxQ5KhoYjyhqVgiV5g9ePnQa22QKoqEew5qRf-CasTUlVA5hdODWvYjoQ=="
                            />
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

                                <p className="help-block help-block-error"></p>
                            </div>
                            <div className="form-group field-loginform-password required">
                                <input
                                    type="password"
                                    id="loginform-password"
                                    className="form-control"
                                    name="LoginForm[password]"
                                    placeholder="Введите Ваш пароль"
                                    aria-required="true"
                                    onChange={e => setPassword(e.currentTarget.value)}
                                    value={password}
                                />

                                <p className="help-block help-block-error"></p>
                            </div>
                            {error && <div className="error">Вы ввели неправильный логин/пароль </div>}
                            <div>
                                Если Вы забыли пароль, то можете его{' '}
                                <Link to="/passwordResetRequest/">восстановить</Link>
                            </div>
                            <div className="form-group">
                                <div onClick={authorization} className="btn btn-success" name="login-button">
                                    Войти
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
