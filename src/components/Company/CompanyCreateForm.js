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
                ???????????????? ????????????????
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
                    <Modal.Title>???????????????? ????????????????</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={e => sendForm(e)}>
                        <div className="form-group">
                            <label className="control-label">??????????</label>
                            <select className="form-control" name="city">
                                {cities?.data.map(({ name, id }) => (
                                    <option value={id} key={id}>
                                        {name}
                                    </option>
                                )) || <option>????????????????...</option>}
                            </select>
                            <p className="help-block help-block-error"></p>
                        </div>
                        <div className="form-group">
                            <label className="control-label">???????????????? ????????????????</label>
                            <input
                                required
                                type="text"
                                id="regForm-??ompany"
                                name="name"
                                className="form-control"
                                placeholder="?????????????? ???????????????? ????????????????"
                            />
                            <p className="help-block help-block-error"></p>
                        </div>
                        <div className="form-group">
                            <label className="control-label">?????? (??????????????????)</label>
                                    <input
                                    required
                                    type="text"
                                    className="form-control"
                                    name="director_name"
                                    placeholder="?????????????? ?????? ??????????????????"
                                />
                        </div>
                        <div className="form-group">
                            <label className="control-label">?????????????? ??????????????????</label>
                            <InputMask mask="+7(999) 999 99 99" >
                                {() =>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        name="director_phone"
                                        placeholder="?????????????? ?????????? ???????????????? ??????????????????"
                                    />
                                }
                            </InputMask>
                        </div>
                        <div className="form-group">
                            <label className="control-label">?????????????? ????????????????????????????</label>
                            <InputMask mask="+7(999) 999 99 99" >
                                {() =>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        name="admin_phone"
                                        placeholder="?????????????? ?????????? ???????????????? ????????????????????????????"
                                    />
                                }
                            </InputMask>
                        </div>
                        <div className="form-group">
                            <label className="control-label">?????????????? ????????????????</label>
                            <InputMask mask="+7(999) 999 99 99" >
                                {() =>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        name="company_phone"
                                        placeholder="?????????????? ?????????? ???????????????? ????????????????????????????"
                                    />
                                }
                            </InputMask>
                        </div>
                        <div className="form-group">
                            <label className="control-label">?????????????? ????????????????????</label>
                            <InputMask mask="+7(999) 999 99 99" >
                                {() =>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="accountant_phone"
                                        placeholder="?????????????? ?????????? ???????????????? ????????????????????"
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
                                placeholder="?????????????? E-mail"
                            />
                            <p className="help-block help-block-error"></p>
                        </div>
                        <div className="form-group">
                            <label className="control-label">???????????????? (%)</label>
                            <input
                                required
                                type="number"
                                className="form-control"
                                name="commission"
                                placeholder="?????????????? ????????????????"
                                maxLength={2}
                            />
                            <p className="help-block help-block-error"></p>
                        </div>
                        <div className="form-group">
                            <label className="control-label">?????????????? ?????????????? (%)</label>
                            <input
                                required
                                type="number"
                                className="form-control"
                                name="cashback_percent"
                                placeholder="?????????????? ?????????????? ??????????????"
                                maxLength={2}
                            />
                            <p className="help-block help-block-error"></p>
                        </div>

                        <div className="form-group">
                            <label className="control-label">??????</label>
                            <select className="form-control" name="type" value={ companyType } onChange={ e => setCompanyType(e.currentTarget.value) }>
                                <option value="1">???????????????? ?? ???????????????????????? ???????????????????? (??????????)</option>
                                <option value="2">???????????????? ?????? ?????????????????????? ???????????????????? (????????????????-??????????????)</option>
                            </select>
                            <p className="help-block help-block-error"></p>
                        </div>

                        <div className="form-group">
                            <label className="control-label">????????????</label>
                            <select className="form-control" name="branch" value={ branch } onChange={ e => setBranch(e.currentTarget.value) }>
                                <option value="0">??????</option>
                                <option value="1">????</option>
                            </select>
                            <p className="help-block help-block-error"></p>
                        </div>

                        {companyType == '1' &&
                        <div className="form-group">
                            <input className="form-check-input" name="has_ref_system" type="checkbox" checked={hasRefSystem} onChange={() => setHasRefSystem(setHasRefSystem => !setHasRefSystem)} value={hasRefSystem} id="refSystemCheckBox" />
                            <label className="form-check-label" htmlFor="refSystemCheckBox">
                                ?????????????????? ?? ?????????????????????? ??????????????
                            </label>
                        </div>
                        }


                        {companyType == '1' &&
                            <div className="form-group">
                                <label className="control-label">????????????????????</label>
                                <select className="form-control" name="accrual_type"
                                        defaultValue={accrual}
                                        onChange={e => setAccrual(e.currentTarget.value)}
                                >
                                    <option value="1">?????? ?????????????? ????????????????????</option>
                                    <option value="3">?? ???????????? ??????????????????????</option>
                                </select>
                            </div>
                        }

                        <div className="form-group">
                            <label className="control-label">????????????????</label>
                            <select className="form-control" name="write_off_wallet">
                                <option value="tenge">??????????</option>
                                <option value="freebee">FreeBee</option>
                                <option value="all">?????????? ?? FreeBee</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="control-label">???????????? ???? 2gis</label>
                            <input
                                type="text"
                                className="form-control"
                                name="2gis_url"
                                placeholder="?????????????? ???????????? ???? 2gis"
                                required
                            />
                            <p className="help-block help-block-error"></p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="logo">??????????????</label>
                            <input type="file" className="form-control-file" name="logo" id="logo" required />
                        </div>
                        <input type="submit" className="btn btn-primary" value="?????????????? ????????????????" />
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
                <Modal.Title>????????????????</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>?????????? ????????????????????????????: {adminName}</p>
                <p>???????????? ????????????????????????????: {adminPassword}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAdmin} disabled={blocked}>
                    {blocked ? '?????????? 5 ????????????...' : '??????????????'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CompanyCreateForm
