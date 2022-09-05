import React, {useEffect, useState} from 'react'
import jwtDecode from 'jwt-decode'
import Api from '../../api/api'
import InputMask from 'react-input-mask'
import {Button, Form, Modal} from 'react-bootstrap'
import getRole from '../../getRole'
import {toast} from "react-toastify";
import toastPlugin from "../../utils/toastPlugin";
import PhoneWriteoff from "./WriteoffComponents/PhoneWriteoff";
import WriteOffSuccess from "./WriteoffComponents/WriteOffSuccess";

const role = getRole()

const Writeoff = () => {
    const [buttonStatus, setButtonStatus] = useState(false)
    const [userPhone, setUserPhone] = useState('')
    const [sum, setSum] = useState('')
    const [error, setError] = useState(null)
    const [show, setShow] = useState(false)
    const [code, setCode] = useState('')
    const [attempsDown, setAttempsDown] = useState(false)
    const [currency, setCurrency] = useState(false)
    const [writeType, setWriteType] = useState(null)
    const [handleValute, setHandleValute] = useState(false)
    const [type, setType] = useState('1')
    const [qrUrl, setQrUrl] = useState('')
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [qrData, setQrData] = useState({});
    const [successQRData, setSuccessQRData] = useState({});

    const getRole = () => {
        if (localStorage.access_token) {
            const tokenData = jwtDecode(localStorage.access_token)
            return tokenData.id
        }

        return null
    }

    const id = getRole()

    const writeoff = async e => {
        setError(null)
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        formData.append('id', id)
        let currentSum = sum
        if (currency == 'тенге') {
            currentSum = currentSum * 2.5
        }
        formData.append('currency', currency);
        formData.append('sum', currentSum)
        try {
            await Api.writeoff(formData)
            if(role == 'god' || role == 'admin' ){
                try {
                    setButtonStatus(true)
                    setUserPhone('')
                    setSum('')
                } catch (e) {
                    e.response.status === 404 && setError('Пользователь не найден')
                    e.response.status === 406 && setError('У пользователя недостаточно средств для списания')
                    e.response.status === 400 && setError(true)
                    e.response.status === 424 && setAttempsDown(true)
                }
            }else {
                handleShow()
            }
        } catch ({response}) {
            toastPlugin.error(response.data.message)
        }
    }

    const confirmCode = async () => {
        const formData = new FormData()
        formData.append('user_phone', userPhone)
        formData.append('code', code)
        if (currency == 'тенге') {
            formData.append('sum', sum * 2.5)
        } else {
            formData.append('sum', sum)
        }
        formData.append('currency', currency);

        try {
            const {data, ok, status} = await Api.writeoffConfirm(formData)
            handleClose()
            setButtonStatus(true)
            setUserPhone('')
            setSum('')
        } catch (e) {
            e.response.status === 404 && setError('Пользователь не найден')
            e.response.status === 406 && setError('У пользователя недостаточно средств для списания')
            e.response.status === 400 && setError(true)
            e.response.status === 424 && setAttempsDown(true)
        }
    }

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const changeCode = ({currentTarget}) => setCode(currentTarget.value)
    const tryAgain = () => window.location.reload()

    const getWriteType = async () => {
        let writeData = null
        if (role == 'company' || role == 'partner') {
            const {data} = await Api.getWriteType()
            writeData = data
        } else if (role == 'employee') {
            const {data} = await Api.getWriteTypeUser()
            writeData = data
        }
        setWriteType(writeData)
        if (writeData == 'tenge') {
            setCurrency('тенге')
        } else if (writeData == 'freebee') {
            setCurrency('freebee')
        } else {
            setHandleValute(true)
        }
    }
    /*if (handleValute) {
        if (role == 'partner') {
            setHandleValute(false)
        }
    }*/
    const checkQrStatus = (id) => {
       let interval = setInterval(async () => {
           const response = await Api.checkWriteOffQRStatus(id);
           if (response.status === true) {
               clearInterval(interval);
               setSuccessQRData(response);
               setShowSuccessModal(true);
           }
       }, 1500);
    }


    const getQr = async (e) => {
        e.preventDefault()
        const req = {
            amount: currency === 'тенге' ? sum * 2.5 : sum,
            currency: currency === 'тенге' ? 1: 0,
        };
        const data = await Api.getWriteOffQr(req);
        setQrUrl(data.qr_code);
        checkQrStatus(data.qr_data.id);
    }

    useEffect(() => {
        getWriteType()
    }, [])

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header>
                    <Modal.Title>Введите смс</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Код подтверждения" value={code} onChange={changeCode}/>
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
            {/*//////  Модалка при списание по qr /////////////*/}
            <WriteOffSuccess show={showSuccessModal} setShowSuccessModal={setShowSuccessModal} data={successQRData}/>

            <h3>Списание</h3>
            <select
                className="form-select"
                aria-label="Default select example"
                value={type}
                onChange={e => setType(e.target.value)}
                style={{display: 'block', marginBottom: 15}}
            >
                <option value="0" selected>Списание по телефону</option><
                option value="1" selected>Списание по QR</option>
            </select>

            <form id="registration-form" onSubmit={e => {type == '0' ? writeoff(e) : getQr(e)}}>
                {
                    type == '0'
                        ? <PhoneWriteoff setUserPhone={setUserPhone} userPhone={userPhone}/>
                        : <img src={qrUrl} width={250} />
                }

                {handleValute && (
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        defaultValue=''
                        onChange={e => setCurrency(e.target.value)}
                        style={{display: 'block', marginBottom: 15}}
                    >
                        <option value="" selected>Не выбрано</option><
                        option value="тенге" selected>
                            Тенге
                        </option>
                        <option value="freebee">Freebee</option>
                    </select>
                )}

                {currency &&
                <div className="form-group field-generateform-value required">
                    <label className="control-label" htmlFor="generateform-value">
                        Сумма списания в {currency}
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={sum}
                        onChange={e => setSum(e.currentTarget.value)}
                        placeholder={`Сумма списания в ${currency}`}
                        required
                    />
                </div>

                }


                <input className="btn btn-primary" value={type === '0' ? "Списать" : "Получить qr"} type="submit"/>
            </form>
            {buttonStatus && <div className="success">Списание прошло успешно !</div>}
            {error && <div className="error">{error}</div>}
        </>
    )
}

export default Writeoff
