import React, { useEffect, useState } from 'react'
import Api from '../../api/api'
import { useHistory } from 'react-router-dom'
import InputMask from 'react-input-mask'
import getRole from "../../getRole";

const isGod = getRole() === 'god';

const ManagerUpdate = ({ match }) => {
    const id = match.params.id

    const [company, setCompany] = useState(false)
    const [managers, setManagers] = useState(false)

    let history = useHistory()


    const getManager = async () => {
        let {data} = await Api.clientsReadOne(id)
        setManagers(data)
    }

    const managerCreate = async e => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        formData.append('id', id)
        await Api.clientsUpdate(formData)
        setTimeout(() => {
            history.push(`/clients/`)
        }, 300)
    }

    useEffect(() => {
        getManager()
    }, [])

    return (
        managers && (
            <>
                <div className="col-lg-4">
                    <form id="registration-form" onSubmit={e => managerCreate(e)}>
                        <div className="form-group field-generateform-value required">
                            <label className="control-label" htmlFor="generateform-value">
                                Номер
                            </label>
                            <InputMask mask="+7 (999) 999 99 99" defaultValue={managers.login}>
                                {() => (
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="login"
                                        placeholder="+7 (___) ___ __ __"
                                        defaultValue={managers.login}
                                        required
                                    />
                                )}
                            </InputMask>
                        </div>
                        <div className="form-group field-generateform-value required">
                            <label className="control-label" htmlFor="generateform-value">
                                Новый пароль
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                minLength={5}
                                name="password"
                                placeholder="Пароль"
                            />
                        </div>
                        <div className="form-group field-generateform-value required">
                            <label className="control-label" htmlFor="generateform-value">
                                Имя
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={managers.name}
                                name="name"
                                placeholder="Имя"
                                required
                            />
                        </div>
                        <div className="form-group field-generateform-value required">
                            <label className="control-label" htmlFor="generateform-value">
                                Фамилия
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={managers.surname}
                                name="surname"
                                placeholder="Фамилия"
                                required
                            />
                        </div>
                        <div className="form-group field-generateform-value required">
                            <label className="control-label" htmlFor="generateform-value">
                                email
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={managers.email}
                                name="email"
                                placeholder="email"
                                required
                            />
                        </div>
                        {  isGod &&  <div className="form-group field-generateform-value required">
                            <label className="control-label" htmlFor="generateform-value">
                                Логин Олимп
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={managers.olimp_login}
                                name="olimp_login"
                                placeholder="Логин Олимп"
                            />
                        </div>}

                        <input className="btn btn-primary" value="Сохранить" type="submit" />
                    </form>
                </div>
            </>
        )
    )
}

export default ManagerUpdate
