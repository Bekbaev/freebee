import React, { useEffect, useState } from 'react'
import Api from '../../api/api'
import { useHistory } from 'react-router-dom'
import InputMask from 'react-input-mask'
import getRole from "../../getRole";

const role = getRole()

const ManagerUpdate = ({ match }) => {
    const id = match.params.id

    const [company, setCompany] = useState(false)
    const [cities, setCities] = useState(false)
    const [managers, setManagers] = useState(false)
    const [accrualType, setAccrual] = useState(1)
    let history = useHistory()

    const getCompany = async () => {
        let { data } = await Api.companyRead()
        setCompany(data)
    }

    const getManager = async () => {
        let { data } = await Api.userReadById(id)
        setManagers(data);
        setAccrual(data.accrual);
    }

    const managerCreate = e => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        formData.append('id', id)
        Api.userUpdate(formData)
        setTimeout(() => {
            history.push(`/manager/`)
        }, 300)
    }

    const getCities = async () => {
        let { data } = await Api.citiesRead()
        setCities(data)
    }
    useEffect(() => {
        getCompany()
        getCities()
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
                        {
                            role == 'god' &&
                                <>
                                    <div className="form-group">
                                        <label className="control-label">Пополнение</label>
                                        <select className="form-control" name="accrual" value={accrualType} onChange={e => setAccrual(e.currentTarget.value) }>
                                            <option value="1">Qr-билеты</option>
                                            <option value="3">Qr-билеты с возможностью начисления</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Списание</label>
                                        <select className="form-control" name="write_off_wallet" defaultValue={managers.write_off_wallet}>
                                            <option value="tenge">Тенге</option>
                                            <option value="freebee">FreeBee</option>
                                            <option value="all">Тенге и FreeBee</option>
                                        </select>
                                    </div>
                                </>
                        }

                        <div className="form-group field-generateform-value required">
                            <label className="control-label" htmlFor="generateform-value">
                                Должность
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={managers.label}
                                name="label"
                                placeholder="Должность"
                                required
                            />
                        </div>
                        <input className="btn btn-primary" value="Сохранить" type="submit" />
                    </form>
                </div>
            </>
        )
    )
}

export default ManagerUpdate
