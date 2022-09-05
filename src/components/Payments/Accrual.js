import React, { useState } from 'react'
import jwtDecode from 'jwt-decode'
import Api from '../../api/api'
import InputMask from 'react-input-mask'

const Accrual = () => {
    const [buttonStatus, setButtonStatus] = useState(false)
    const [userPhone, setUserPhone] = useState('')
    const [sum, setSum] = useState('')
    const [error, setError] = useState(null)

    const getRole = () => {
        if (localStorage.access_token) {
            const tokenData = jwtDecode(localStorage.access_token)
            return tokenData.id
        }

        return null
    }

    const id = getRole()

    const accrual = async e => {
        e.preventDefault()
        const newSum = (sum / 100) * 5
        const formData = new FormData(e.currentTarget)
        formData.append('user_id', id)
        formData.append('sum', newSum)
        try {
            await Api.accrual(formData)
            setUserPhone('')
            setSum('')
            setError(null)
            setButtonStatus(true)
        } catch ({ response }) {
            response.status === 404 && setError('Пользователь не найден')
        }
    }

    return (
        <>
            <h3>Начисление</h3>
            <form id="registration-form" onSubmit={accrual}>
                <div className="form-group field-generateform-value required">
                    <label className="control-label" htmlFor="generateform-value">
                        Номер пользователя
                    </label>
                    <InputMask
                        mask="+7 (999) 999 99 99"
                        value={userPhone}
                        onChange={e => setUserPhone(e.currentTarget.value)}
                    >
                        {() => (
                            <input
                                type="text"
                                className="form-control"
                                name="user_phone"
                                placeholder="+7 (___) ___ __ __"
                                required
                            />
                        )}
                    </InputMask>
                </div>
                <div className="form-group field-generateform-value required">
                    <label className="control-label" htmlFor="generateform-value">
                        Сумма пополнения
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        value={sum}
                        onChange={e => setSum(e.currentTarget.value)}
                        placeholder="Сумма начисления"
                        required
                    />
                </div>
                <p className="text-secondary">{sum / 100 * 5} FreeBee.</p>
                <p className="text-secondary">{sum / 100 * 2} Тенге</p>
                <input className="btn btn-primary" value="Начислить" type="submit" />
            </form>
            {buttonStatus && <div className="success">Начисление прошло успешно !</div>}
            {error && <div className="error">{error}</div>}
        </>
    )
}

export default Accrual
