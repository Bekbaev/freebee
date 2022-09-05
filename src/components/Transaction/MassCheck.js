import React, {useEffect, useState} from 'react';
import {Form} from "react-bootstrap";
import Api from "../../api/api";
import {useHistory} from "react-router-dom";

const MassCheck = () => {
    const [showButton, setShowButton] = useState(true)
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const [companyId, setCompanyId] = useState(0)
    const [info, setInfo] = useState(false)
    const [infoLoader, setInfoLoader] = useState(false)
    const [company, setCompany] = useState([])
    let history = useHistory()



    const sendForm = async (e) => {
        setShowButton(false)
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        await Api.receiptBind(formData)
        history.push('/transactionCollections')
    }

    const getCompany = async () => {
        let {data} = await Api.companyRead()
        setCompany(data)
    }

    const getInfo = async () => {
        setInfoLoader(true)
        const {data} = await Api.receiptInfo(startTime, endTime, companyId)

        setInfo(data)
    }


    useEffect(() => {
        getCompany()
        if (startTime && endTime && companyId > 0) {
            getInfo()
        }
    }, [startTime, endTime, companyId])

    return (
        <Form onSubmit={(e) => sendForm(e)}>

            <p>От: </p>
            <input type="date" className="form-control" style={{marginBottom: 10}} name="start"
                   value={startTime} onChange={e => setStartTime(e.currentTarget.value)} required
            />
            <p>До: </p>
            <input type="date" className="form-control" style={{marginBottom: 10}} name="end"
                   value={endTime} onChange={e => setEndTime(e.currentTarget.value)} required
            />
            <p>Компания: </p>
            <select className="form-control" style={{marginBottom: 10}} name="company_id"
                    value={companyId} onChange={e => setCompanyId(e.currentTarget.value)} required
            >
                <option value="0"></option>
                {company.map(el => <option value={el.id} key={el.id}>{el.name}</option>)}
            </select>

            {infoLoader &&
            <>
                {info ? <>
                        <p>Общая сумма: {info.total_sum} тг</p>
                        <p>Кэшбэк: {info.cashback} тг</p>
                        <p>Итого:{(info.total_sum - info.cashback)} тг</p>
                    </>
                    : <p>Загрузка....</p>
                }
            </>
            }


            <Form.Group>
                <Form.File id="exampleFormControlFile1" label="Чек" name="receipt" required/>
            </Form.Group>
            {showButton
                ? <button type="submit" className="btn btn-primary">Закрепить чек</button>
                : <p>Загрузка...</p>
            }
        </Form>
    );
};

export default MassCheck;