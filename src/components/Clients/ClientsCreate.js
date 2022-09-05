import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Api from '../../api/api'
import getUserId from '../../getUserId'
import InputMask from 'react-input-mask'
import toastPlugin from "../../utils/toastPlugin";

const ClientsCreate = ({ redirectToHome }) => {
    let history = useHistory()
    const [phone, setPhone] = useState('')
    const changePhone = e => setPhone(e.currentTarget.value)
    const [error, setError] = useState(false)
    const [hasReg, SetHasReg] = useState(false)
    const [attempsDown, setAttempsDown] = useState(false)

    const managerCreate = async e => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        formData.append('role', 'client')
        formData.append('fingerprint', 'asdasd')
        formData.append('created_by', getUserId())
        formData.append('admin', '1');
        try {
            const { data } = await Api.clientsRegister(formData);
            toastPlugin.success('Пользователь успешно создан');
            setTimeout(() => {
                history.push(redirectToHome ? '/' : `/clients/`)
            }, 300)
        } catch (e) {
            SetHasReg(true)
        }
    }

    const confirmCode = async () => {
        const formData = new FormData()
        formData.append('phone', phone)
        formData.append('code', code)
        formData.append('fingerprint', 'confirm')

        try {
            const { data, ok, status } = await Api.clientConfirm(formData)
            if (ok) {
                setTimeout(() => {
                    history.push(redirectToHome ? '/' : `/clients/`)
                }, 300)
            }
        } catch (e) {
            e.response.status === 400 && setError(true)
            e.response.status === 424 && setAttempsDown(true)
        }
    }

    const [show, setShow] = useState(false)
    const [code, setCode] = useState('')

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const changeCode = ({ currentTarget }) => setCode(currentTarget.value)
    const tryAgain = () => window.location.reload()

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false} backdrop={'static'}>
                <Modal.Header>
                    <Modal.Title>Введите смс</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Код подтверждения" value={code} onChange={changeCode} />
                    </Form.Group>
                    {error && <div className="error">Введенный код неверен </div>}
                    {attempsDown && <div className="error">Превышено количество попыток подтверждения </div>}
                </Modal.Body>
                <Modal.Footer>
                    {attempsDown ? (
                        <Button variant="primary" onClick={tryAgain}>
                            Попробовать снова
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={confirmCode}>
                            Подтвердить
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>

            <div className="col-lg-4">
                <form id="registration-form" onSubmit={managerCreate}>
                    <div className="form-group field-generateform-value required">
                        <label className="control-label" htmlFor="generateform-value">
                            Номер пользователя
                        </label>
                        <InputMask mask="+7 (999) 999 99 99" value={phone} onChange={changePhone}>
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
                            Имя
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            minLength={2}
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
                            minLength={2}
                            name="surname"
                            placeholder="Фамилия"
                            required
                        />
                    </div>
                    <div className="form-group field-generateform-value required">
                        <label className="control-label" htmlFor="generateform-value">
                            Пароль
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            minLength={5}
                            name="password"
                            placeholder="Пароль"
                            required
                        />
                    </div>
                    <div className="form-group field-generateform-value required">
                        <label className="control-label" htmlFor="generateform-value">
                            Логин Олимп
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            minLength={2}
                            name="olimp_login"
                            placeholder="Логин Олимп"
                        />
                    </div>
                    <div className="form-group field-generateform-value required">
                        <label className="control-label" htmlFor="generateform-value">
                            Промокод
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            minLength={2}
                            name="promocode"
                            placeholder="Промокод"
                        />
                    </div>

                    <input className="btn btn-primary" value="Создать" type="submit" />
                    {hasReg && <div className="error">Этот пользователь уже существует</div>}
                </form>
            </div>
        </>
    )
}

export default ClientsCreate
