import React, {useEffect, useState} from 'react';
import Api from "../../api/api";
import {Link} from "react-router-dom";
import normalizeDate from "../../normalizeDate";
import MaterialIcon from "react-google-material-icons";

const TicketsList = ({match}) => {
    const [ticketsArray, setTicketsArray] = useState(false)
    const [type, setType] = useState(false)
    const key = match.params.key


    const getTickets = async () => {
        let { data } = await Api.ticketsReadUniqKey(key);
        console.log(data);
        let filteredData = data.filter(el => el.uniq_key == key)
        setTicketsArray(filteredData)
        switch (filteredData[0].type){
            case 0:
                setType('Начисление')
                break
            case 1:
                setType('Пустышка')
                break
            case 2:
                setType("Начисление без участия в розыгрыше")
                break
        }


    }

    useEffect(() => {
        getTickets()

    }, [])

    return (
        <div>
            <ul className="breadcrumb">
                <li><a href="#">Билеты</a></li>
            </ul>
            <h3>Тип билетов: {type && type}</h3>
            <div className="ticket-list">
                <div id="w0" className="grid-view">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th><a data-sort="id">Номер</a></th>
                            <th><a data-sort="number">Код</a></th>
                            <th><a data-sort="type">Компания</a>
                            </th>
                            <th>
                                <a data-sort="value">Бонусов</a>
                            </th>
                            <th>
                                <a data-sort="created_at">Создан</a>
                            </th>
                            <th>
                                <a data-sort="updated_at">Активирован</a>
                            </th>
                            <th>
                                <a data-sort="client_id">Клиент</a>
                            </th>
                            <th>
                                <a data-sort="status">Статус</a>
                            </th>
                            <th className="action-column">&nbsp;</th>
                        </tr>
                        <tr id="w0-filters" className="filters">
                            {/*<td><input type="text" className="form-control" name="TicketSearch[id]"/></td>*/}
                            {/*<td><input type="text" className="form-control" name="TicketSearch[number]"/></td>*/}
                            {/*<td>*/}
                            {/*    <select className="form-control" name="company">*/}
                            {/*        {*/}
                            {/*            company && company.map(el => <option  value={el.id}>{el.name}</option>)*/}
                            {/*        }*/}
                            {/*    </select>*/}
                            {/*</td>*/}
                            {/*<td><input type="text" className="form-control" name="TicketSearch[value]"/></td>*/}
                            {/*<td>&nbsp;</td>*/}
                            {/*<td>&nbsp;</td>*/}
                            {/*<td><select className="form-control" name="TicketSearch[status]">*/}
                            {/*    <option value=""></option>*/}
                            {/*    <option value="0">Удален</option>*/}
                            {/*    <option value="1">Блокирован</option>*/}
                            {/*    <option value="2">Новый</option>*/}
                            {/*    <option value="4">Активирован</option>*/}
                            {/*</select></td>*/}
                            {/*<td>&nbsp;</td>*/}
                        </tr>
                        </thead>
                        <tbody>
                        {ticketsArray && ticketsArray.map(el => <TableItem getTickets={getTickets}
                                                                           key={el.id} {...el}/>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


const TableItem = (props) => {
    const deleteTicket = async () => {
        const formData = new FormData()
        formData.append('id', props.id)
        await Api.ticketsDelete(formData)
        props.getTickets()
    }

    const downloadQr = async () => {
        const {qr} = await Api.getQr(props.code)
        const link = document.createElement('a');
        link.href = qr;
        link.setAttribute(
            'download',
            `${props.bonus}frebee_${props.id}qr.jpg`,
        );
        link.click();
    }

    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.code}</td>
            <td>
                <Link to={`/companyStats/${props.company_id}`}>{props.company_name}</Link>
            </td>
            <td>{props.bonus > 0 && props.bonus}</td>
            <td>{normalizeDate(props.created_at)}</td>
            <td>
                { props.client_id ? normalizeDate(props.updated_at) : <span className="not-set">(не активирован)</span> }
            </td>
            <td>
                { props.client_id ? props.client.fullname : <span className="not-set">(не задано)</span>}
            </td>
            <td>{props.status}</td>
            <td style={{cursor: "pointer"}} onClick={downloadQr }>
                <MaterialIcon  icon="get_app" size={18}/>
            </td>

        </tr>
    )
};

export default TicketsList;
