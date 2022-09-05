import React, {useEffect, useState} from 'react';
import Api from "../../api/api";
import {useHistory} from "react-router-dom";


const TicketsUpdate = ({match}) => {
    const id = match.params.id

    const [ticketsArray, setTicketsArray] = useState(false)
    const [status, setStatus] = useState('1')
    const [qr, setQr] = useState('')
    const [company, setCompany] = useState(false)
    const [currentCompany, setCurrentCompany] = useState(false)
    let history = useHistory();

    const getCompany = async () => {
        let {data} = await Api.companyRead()
        setCompany(data)
    }

    const getTickets = async () => {
        let {data} = await Api.ticketsRead()
        const currentData = data.filter(el => el.id == id )
        let status_id = 1;
        switch(currentData[0].status){
            case 'Новый':
                status_id = 1;
                break;
            case 'Активирован':
                status_id = 2;
                break;
            case 'Блокирован':
                status_id = 3;
                break;
            case 'Удален':
                status_id = 4;
                break;
        }
        setStatus(status_id)
        setCurrentCompany(currentData[0].company_id)
        setTicketsArray(currentData[0])

        const formData = new FormData()
        formData.append("code", currentData[0].code)
        const {qr} = await Api.getQr(formData)

        setQr(qr)
    }

    const handleChangeStatus = (e) =>{
        setStatus(e.currentTarget.value)
    }
    const handleChangeCompany = (e) =>{
        setCurrentCompany(e.currentTarget.value)
    }
    const sendForm = async (e) =>{
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        formData.append("id", id)
        await Api.ticketsUpdate(formData)
        setTimeout(() =>{
            history.push(`/ticketsList/`);
        }, 400)
    }


    useEffect(() => {
        getTickets()
        getCompany()
    }, [])

    return (
        <div className="ticket-form">

            <form onSubmit={e => sendForm(e)} >
                    <div className="form-group field-ticket-number">
                        <label className="control-label" htmlFor="ticket-number">Код</label>
                        <input type="text" id="ticket-number" className="form-control" name="code"
                               value={ticketsArray.code} />

                        <div className="help-block"></div>
                    </div>
                    <div className="form-group field-ticket-type">
                        <label className="control-label" htmlFor="ticket-type">Компания</label>
                        <select id="generateform-type" className="form-control" name="company_id"
                                aria-required="true" value={currentCompany}
                                onChange={(e) => handleChangeCompany(e)}>
                            {
                                company && company.map(el => <option key={el.id} value={el.id}>{el.name}</option>)
                            }
                        </select>
                        <div className="help-block"></div>

                    </div>
                    <div className="form-group field-ticket-value">
                        <label className="control-label" htmlFor="ticket-value">Бонусов</label>
                        <input type="text" id="ticket-value" className="form-control" name="bonus"
                               defaultValue={ ticketsArray.bonus } />

                        <div className="help-block"></div>
                    </div>
                    <div className="form-group field-ticket-status">
                        <label className="control-label" htmlFor="ticket-status">Статус</label>
                        <select id="ticket-status" className="form-control"
                                name="status" value={ status }
                                onChange={(e) => handleChangeStatus(e)}
                        >
                            <option value="1">Новый</option>
                            <option value="2">Активирован</option>
                            <option value="3">Блокирован</option>
                            <option value="4">Удален</option>
                        </select>

                        <div className="help-block"></div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Изменить</button>
                        <a className="btn btn-secondary ml-15"  download="qr.jpg" href={qr}>Скачать</a>
                    </div>
            </form>
        </div>
);
};

export default TicketsUpdate;