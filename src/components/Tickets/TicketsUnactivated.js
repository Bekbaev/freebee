import React, {useEffect, useState} from 'react';
import Api from "../../api/api";
import {Link} from "react-router-dom";

const TicketsList = () => {
    const [ticketsArray, setTicketsArray] = useState(false)

    const getTickets = async () => {
        let {data} = await Api.ticketsRead()
        data.filter(el => el.status == "Новый")
        setTicketsArray(data)
    }
    useEffect(() => {
        getTickets()
    }, [])

    return (
        <div>
            <ul className="breadcrumb">
                <li><a href="#">Билеты</a></li>
            </ul>
            <div className="ticket-list">
                <div id="w0" className="grid-view">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th><a href="/frontend/web/ticket?sort=id" data-sort="id">Номер</a></th>
                            <th><a href="/frontend/web/ticket?sort=number" data-sort="number">Код</a></th>
                            <th><a href="/frontend/web/ticket?sort=type" data-sort="type">Компания</a>
                            </th>
                            <th><a href="/frontend/web/ticket?sort=value"
                                   data-sort="value">Бонусов</a></th>
                            <th><a href="/frontend/web/ticket?sort=created_at"
                                   data-sort="created_at">Создан</a></th>
                            <th><a href="/frontend/web/ticket?sort=client_id"
                                   data-sort="client_id">Клиент</a></th>
                            <th><a href="/frontend/web/ticket?sort=status"
                                   data-sort="status">Статус</a></th>
                            <th className="action-column">&nbsp;</th>
                        </tr>
                        {/*<tr id="w0-filters" className="filters">*/}
                        {/*    <td><input type="text" className="form-control" name="TicketSearch[id]"/></td>*/}
                        {/*    <td><input type="text" className="form-control" name="TicketSearch[number]"/></td>*/}
                        {/*    <td><select className="form-control" name="TicketSearch[type]">*/}
                        {/*    </select></td>*/}
                        {/*    <td><input type="text" className="form-control" name="TicketSearch[value]"/></td>*/}
                        {/*    <td>&nbsp;</td>*/}
                        {/*    <td>&nbsp;</td>*/}
                        {/*    <td><select className="form-control" name="TicketSearch[status]">*/}
                        {/*        <option value=""></option>*/}
                        {/*        <option value="0">Удален</option>*/}
                        {/*        <option value="1">Блокирован</option>*/}
                        {/*        <option value="2">Новый</option>*/}
                        {/*        <option value="4">Активирован</option>*/}
                        {/*    </select></td>*/}
                        {/*    <td>&nbsp;</td>*/}
                        {/*</tr>*/}
                        </thead>
                        <tbody>
                        {ticketsArray && ticketsArray.map(el => <TableItem getTickets={getTickets} key={el.id} {...el}/>)}
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

    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.code}</td>
            <td><Link>{props.company_name}</Link></td>
            <td>{props.bonus}</td>
            <td>{props.created_at}</td>
            {
                props.client_id
                    ? <td>{props.client_name}</td>
                    : <td><span className="not-set">(не задано)</span></td>
            }
            <td>{props.status}</td>
            <td>
                <Link to={`/ticketsUpdate/${props.id}`} title="Редактировать"
                      aria-label="Редактировать" data-pjax="0"><span
                    className="glyphicon glyphicon-pencil"></span></Link>

                <span onClick={ deleteTicket } title="Удалить" aria-label="Удалить"
                      data-pjax="0" data-confirm="Вы уверены, что хотите удалить этот элемент?"
                      data-method="post"><span className="glyphicon glyphicon-trash"></span></span>
            </td>
        </tr>
    );
};

export default TicketsList;