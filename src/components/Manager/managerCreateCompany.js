import React, { useEffect, useState } from 'react';
import Api from "../../api/api";
import { useHistory } from "react-router-dom";
import InputMask from "react-input-mask";
import toastPlugin from "../../utils/toastPlugin";

const ManagerCreateCompany = () => {
    let history = useHistory();
    const [showHandleWriteoff, setShowHandleWriteoff] = useState(false)
    const [writeoffValue, setWriteoffValue] = useState(null)
    const [showCompanyAccrual, setShowCompanyAccrual] = useState(false)
    const [accrualType, setAccrual] = useState(1)

    const getAccrualType = async () => {
        const { data } = await Api.getAccrualType()
        if (data === 3) {
            setShowCompanyAccrual(true)
        }
        else {
            setAccrual(data)
        }
    }

    const managerCreate = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.currentTarget)
            formData.append("role", "employee")
            formData.append("fingerprint", "god")
            formData.append("accrual", accrualType)
            await Api.register(formData)
            setTimeout(() => {
                history.push(`/manager/`)
            }, 300)
        } catch (e) {
            toastPlugin.error(e.data.message)
        }
    }

    const getWriteType = async () => {
        const { data } = await Api.getWriteType()
        if (data == 'all') {
            setShowHandleWriteoff(true)
        } else {
            setWriteoffValue(data)
        }
    }

    useEffect(() => {
        getWriteType()
        getAccrualType()
    }, [])

    return (
        <>
            <div className="col-lg-4">
                <form id="registration-form" onSubmit={(e) => managerCreate(e)}>
                    <div className="form-group field-generateform-value required">
                        <label className="control-label" htmlFor="generateform-value">Номер телефона</label>
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
                        <label className="control-label" htmlFor="generateform-value">Пароль</label>
                        <input type="text" className="form-control" minLength={5}
                            name="password" placeholder="Пароль" required />
                    </div>
                    <div className="form-group field-generateform-value required">
                        <label className="control-label" htmlFor="generateform-value">Имя</label>
                        <input type="text" className="form-control"
                            name="name" placeholder="Имя" required minLength={2}/>
                    </div>
                    <div className="form-group field-generateform-value required">
                        <label className="control-label" htmlFor="generateform-value">Название должности: </label>
                        <input type="text" className="form-control"
                            name="label" placeholder="Название должности" required />
                    </div>
                    {showHandleWriteoff &&
                        <div className="form-group">
                            <label className="control-label">Списание</label>
                            <select className="form-control" name="write_off_wallet" value={writeoffValue} onChange={e => setWriteoffValue(e.currentTarget.value)}>
                                <option value="tenge">Тенге</option>
                                <option value="freebee">FreeBee</option>
                                <option value="all">Тенге и FreeBee</option>
                            </select>
                        </div>
                    }
                    {showCompanyAccrual &&
                        <div className="form-group">
                            <label className="control-label">Пополнение</label>
                            <select className="form-control" name="accrual" value={accrualType} onChange={e => setAccrual(e.currentTarget.value)}>
                                <option value="1">Qr-билеты</option>
                                <option value="3">Qr-билеты с возможностью начисления</option>
                            </select>
                        </div>
                    }


                    <input className="btn btn-primary" value="Создать" type="submit" />
                </form>
            </div>
        </>
    );
};

export default ManagerCreateCompany;
