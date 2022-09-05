import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Api from '../../api/api'
import InputMask from 'react-input-mask';
import axios from "axios";

const waitTime = 5000

const CompanyCreateForm = ({ getCompany }) => {
    const [show, setShow] = useState(false)
    const [showAdmin, setShowAdmin] = useState(false)
    const [adminPassword, setAdminPassword] = useState('')
    const [adminName, setAdminName] = useState('')
    const [cities, setCities] = useState(null)
    const [blocked, setBlocked] = useState(true)
    const [accrual, setAccrual] = useState(1)
    const [companyType, setCompanyType] = useState(1)
    const [error, setError] = useState(false)
    const [hasRefSystem, setHasRefSystem] = useState(false)
    const [branch, setBranch] = useState(false)

    useEffect(() => {
        (async () => {
            setCities(await Api.citiesRead())
        })()
    }, [])

    const sendForm = async e => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        formData.append('accrual_type', accrual)
        formData.append('has_ref_system', hasRefSystem ? '1' : '0');
        try {
            const { data, ok } = await Api.companyCreate(formData)
            if (ok === true) {
                setAdminName(data.admin_login)
                setAdminPassword(data.admin_password)
            }
            handleClose()
            handleShowAdmin()
        } catch (e) {
            setError(e.response.data)
        }
        getCompany()
    }

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const handleCloseAdmin = () => {
        if (!blocked) {
            setShowAdmin(false)
            setBlocked(true)
        }
    }
    const handleShowAdmin = () => {
        setBlocked(true)
        setShowAdmin(true)
    }

    useEffect(() => {
        setTimeout(() => {
            setBlocked(false)
        }, waitTime)
    }, [showAdmin])

    return (
        <>
            <div className="btn btn-success mt-15" onClick={handleShow}>
                Добавить компанию
            </div>
            <AdminInfoModal
                handleCloseAdmin={handleCloseAdmin}
                showAdmin={showAdmin}
                adminPassword={adminPassword}
                adminName={adminName}
                blocked={blocked}
            />

            <Modal show={show} onHide={handleClose} animation={false} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Добавить компанию</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={e => sendForm(e)}>
                        <div className="form-group">
                            <label className="control-label">Город</label>
                            <select className="form-control" name="city">
                                {cities?.data.map(({ name, id }) => (
                                    <option value={id} key={id}>
                                        {name}
                                    </option>
                                )) || <option>Загрузка...</option>}
                            </select>
                            <p className="help-block help-block-error"></p>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Название компании</label>
                            <input
                                required
                                type="text"
                                id="regForm-сompany"
                                name="name"
                                className="form-control"
                                placeholder="Введите название компании"
                            />
                            <p className="help-block help-block-error"></p>
                        </div>
                        <div className="form-group">
                            <label className="control-label">ФИО (директора)</label>
                                    <input
                                    required
                                    type="text"
                                    className="form-control"
                                    name="director_name"
                                    placeholder="Введите ФИО директора"
                                />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Телефон директора</label>
                            <InputMask mask="+7(999) 999 99 99" >
                                {() =>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        name="director_phone"
                                        placeholder="Введите номер телефона директора"
                                    />
                                }
                            </InputMask>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Телефон администратора</label>
                            <InputMask mask="+7(999) 999 99 99" >
                                {() =>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        name="admin_phone"
                                        placeholder="Введите номер телефона администратора"
                                    />
                                }
                            </InputMask>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Телефон компании</label>
                            <InputMask mask="+7(999) 999 99 99" >
                                {() =>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        name="company_phone"
                                        placeholder="Введите номер телефона администратора"
                                    />
                                }
                            </InputMask>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Телефон бухгалтера</label>
                            <InputMask mask="+7(999) 999 99 99" >
                                {() =>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="accountant_phone"
                                        placeholder="Введите номер телефона бухгалтера"
                                    />
                                }
                            </InputMask>
                            <p className="help-block help-block-error"></p>
                        </div>
                        <div className="form-group">
                            <label className="control-label">E-mail</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Введите E-mail"
                            />
                            <p className="help-block help-block-error"></p>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Комиссия (%)</label>
                            <input
                                required
                                type="number"
                                className="form-control"
                                name="commission"
                                placeholder="Введите комиссию"
                                maxLength={2}
                            />
                            <p className="help-block help-block-error"></p>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Процент кэшбека (%)</label>
                            <input
                                required
                                type="number"
                                className="form-control"
                                name="cashback_percent"
                                placeholder="Введите процент кэшбека"
                                maxLength={2}
                            />
                            <p className="help-block help-block-error"></p>
                        </div>

                        <div className="form-group">
                            <label className="control-label">Тип</label>
                            <select className="form-control" name="type" value={ companyType } onChange={ e => setCompanyType(e.currentTarget.value) }>
                                <option value="1">Компания с возможностью начисления (касса)</option>
                                <option value="2">Компания без возможности начисления (компания-партнер)</option>
                            </select>
                            <p className="help-block help-block-error"></p>
                        </div>

                        <div className="form-group">
                            <label className="control-label">Филиал</label>
                            <select className="form-control" name="branch" value={ branch } onChange={ e => setBranch(e.currentTarget.value) }>
                                <option value="0">нет</option>
                                <option value="1">да</option>
                            </select>
                            <p className="help-block help-block-error"></p>
                        </div>

                        {companyType == '1' &&
                        <div className="form-group">
                            <input className="form-check-input" name="has_ref_system" type="checkbox" checked={hasRefSystem} onChange={() => setHasRefSystem(setHasRefSystem => !setHasRefSystem)} value={hasRefSystem} id="refSystemCheckBox" />
                            <label className="form-check-label" htmlFor="refSystemCheckBox">
                                Участвует в реферальной системе
                            </label>
                        </div>
                        }


                        {companyType == '1' &&
                            <div className="form-group">
                                <label className="control-label">Начисление</label>
                                <select className="form-control" name="accrual_type"
                                        defaultValue={accrual}
                                        onChange={e => setAccrual(e.currentTarget.value)}
                                >
                                    <option value="1">Без ручного начисления</option>
                                    <option value="3">С ручным начислением</option>
                                </select>
                            </div>
                        }

                        <div className="form-group">
                            <label className="control-label">Списание</label>
                            <select className="form-control" name="write_off_wallet">
                                <option value="tenge">Тенге</option>
                                <option value="freebee">FreeBee</option>
                                <option value="all">Тенге и FreeBee</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="control-label">Ссылка на 2gis</label>
                            <input
                                type="text"
                                className="form-control"
                                name="2gis_url"
                                placeholder="Введите ссылку на 2gis"
                                required
                            />
                            <p className="help-block help-block-error"></p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="logo">Логотип</label>
                            <input type="file" className="form-control-file" name="logo" id="logo" required />
                        </div>
                        <input type="submit" className="btn btn-primary" value="Создать компанию" />
                        {error && <div className="error">{error}</div>}
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

const AdminInfoModal = ({ showAdmin, handleCloseAdmin, adminPassword, adminName, blocked }) => {
    return (
        <Modal show={showAdmin} onHide={handleCloseAdmin} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Внимание</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Логин администратора: {adminName}</p>
                <p>Пароль администратора: {adminPassword}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAdmin} disabled={blocked}>
                    {blocked ? 'Ждите 5 секунд...' : 'Закрыть'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CompanyCreateForm
