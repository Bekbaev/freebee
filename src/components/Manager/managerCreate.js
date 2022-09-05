import React, { useEffect, useState } from 'react'
import Api from '../../api/api'
import { useHistory } from 'react-router-dom'
import InputMask from 'react-input-mask'
import toastPlugin from "../../utils/toastPlugin";



const ManagerCreate = () => {
    const [company, setCompany] = useState(false)
    const [cities, setCities] = useState(false)
    const [position, setPosition] = useState('employee')
    const [accrualType, setAccrual] = useState(1)

    let history = useHistory()

    const getCompany = async () => {
        let data = await Api.companyList()
        setCompany(data)
    }

    const managerCreate = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        formData.append('accrual', accrualType);
        formData.append('role', position)
        formData.append('fingerprint', 'god')
        formData.append('city', '0')
        if (formData.get('company_id') === null) {
            formData.append('company_id', `-1`);
        }
        if (position === 'accountant') {
            formData.append('write_off_wallet', 'all');
        }
        try {
            await Api.register(formData)
            history.push('/manager');
        } catch (e) {
            toastPlugin.error(e.data.message);
        }

        /*setTimeout(() => {
            history.push(`/manager/`)
        }, 300)*/
    }

    const getCities = async () => {
        let { data } = await Api.citiesRead()
        setCities(data)
    }
    useEffect(() => {
        (async () => {
            await getCompany()
            await getCities()
        })()
    }, [])

    return (
        <>
            <div className="col-lg-4">
                <form id="registration-form" onSubmit={e => managerCreate(e)}>
                    <div className="form-group field-generateform-value required">
                        <label className="control-label" htmlFor="generateform-value">
                            Номер телефона
                        </label>
                        <InputMask mask="+7 (999) 999 99 99">
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
                            Пароль
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            minLength={5}
                            name="password"
                            placeholder="Пароль"
                            required
                        />
                    </div>
                    {position === 'employee' && <div className="form-group">
                        <label className="control-label">Списание</label>
                        <select className="form-control" name="write_off_wallet">
                            <option value="tenge">Тенге</option>
                            <option value="freebee">FreeBee</option>
                            <option value="all">Тенге и FreeBee</option>
                        </select>
                    </div>}
                    {
                        position == 'employee' &&
                        <>
                            <div className="form-group">
                                <label className="control-label">Пополнение</label>
                                <select className="form-control" name="accrual" value={accrualType} onChange={e => setAccrual(e.currentTarget.value) }>
                                    <option value="1">Qr-билеты</option>
                                    <option value="3">Qr-билеты с возможностью начисления</option>
                                </select>
                            </div>
                        </>
                    }
                    <div className="form-group field-generateform-value required">
                        <label className="control-label" htmlFor="generateform-value">
                            Имя
                        </label>
                        <input type="text" className="form-control" name="name" placeholder="Имя" minLength={2} required />
                    </div>
                    {position === 'employee' && <div className="form-group">
                        <label className="control-label">Компания</label>
                        <select id="generateform-type" className="form-control" name="company_id" aria-required="true">
                            {company &&
                                company.map(el => (
                                    <option key={el.id} value={el.id}>
                                        {el.name}
                                    </option>
                                ))}
                        </select>
                    </div>}
                    <div className="form-group">
                        <label className="control-label">Должность</label>
                        <select
                            className="form-control"
                            aria-required="true"
                            value={position}
                            onChange={e => setPosition(e.currentTarget.value)}
                        >
                            <option value="accountant">Бухгалтер</option>
                            <option value="employee">Сотрудник</option>
                        </select>
                    </div>

                        <div className="form-group field-generateform-value required">
                            <label className="control-label" htmlFor="generateform-value">
                                Название должности
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="label"
                                placeholder="Название должности"
                                required
                            />
                        </div>

                    <input className="btn btn-primary" value="Создать" type="submit" />
                </form>
            </div>
        </>
    )
}

export default ManagerCreate
