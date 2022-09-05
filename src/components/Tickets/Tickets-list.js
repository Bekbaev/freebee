import React, { useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Api from '../../api/api'
import normalizeDate from '../../normalizeDate'
import MaterialIcon from 'react-google-material-icons'
import getRole from "../../getRole";
const role = getRole()

const TicketsList = ({ isCompany }) => {
    const [ticketsArray, setTicketsArray] = useState(false)
    const [pageCount, setPageCount] = useState(1)
    const [activePage, setActivePage] = useState(1)
    const [company, setCompany] = useState(false)
    const [loading, setLoading] = useState(true)

    const getCompany = async () => {
        let { data } = await Api.companyRead()
        setCompany(data)
    }

    const getTickets = async num => {
        let { page_count, data } = await Api.ticketsRead(num)
        setTicketsArray(data)
        setPageCount(page_count)
        setLoading(false)
    }
    const changePage = num => {
        setActivePage(num)
        getTickets(num)
    }

    const sortTable = async (type, e) => {
        const text = e.currentTarget.value
        const { data } = await Api.ticketsRead()
        const filteredArray = data.filter(el => el[type] == text)
        if (text == '') {
            getTickets(1)
        } else {
            setPageCount(1)
            setTicketsArray(filteredArray)
        }
    }

    useEffect(() => {
        getTickets(1)
        getCompany()
    }, [])

    let active = 2
    let items = []
    for (let number = 1; number <= pageCount; number++) {
        items.push(
            <Pagination.Item key={number} active={number === activePage} onClick={() => changePage(number)}>
                {number}
            </Pagination.Item>
        )
    }
    if (loading) {
        return <p>Загрузка...</p>
    }
    return (
        <div>
            <ul className="breadcrumb">
                <li>
                    <a href="#">Билеты</a>
                </li>
            </ul>
            <div className="ticket-list">
                <div id="w0" className="grid-view">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>
                                    <a data-sort="id">Номер</a>
                                </th>
                                {/* <th>
                                    <a data-sort="number">Код</a>
                                </th> */}

                                {role != 'company' &&
                                    <th>
                                        <a data-sort="type">Компания</a>
                                    </th>
                                }

                                <th>
                                    <a data-sort="value">Бонусов</a>
                                </th>
                                <th>
                                    <a data-sort="created_at">Создан</a>
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
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={e => {
                                            sortTable('id', e)
                                        }}
                                        name="TicketSearch[id]"
                                    />
                                </td>
                                {/* <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={e => {
                                            sortTable('code', e)
                                        }}
                                        name="TicketSearch[number]"
                                    />
                                </td> */}
                                <td>
                                    <select
                                        className="form-control"
                                        name="company"
                                        onChange={e => {
                                            sortTable('company_name', e)
                                        }}
                                    >
                                        <option value=""></option>
                                        {company &&
                                            company.map(el => (
                                                <option key={el.id} value={el.name}>
                                                    {el.name}
                                                </option>
                                            ))}
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        onChange={e => {
                                            sortTable('bonus', e)
                                        }}
                                        className="form-control"
                                        name="TicketSearch[value]"
                                    />
                                </td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>
                                    <select
                                        className="form-control"
                                        name="TicketSearch[status]"
                                        onChange={e => {
                                            sortTable('status', e)
                                        }}
                                    >
                                        <option value=""></option>
                                        <option value="Новый">Новый</option>
                                        <option value="Активирован">Активирован</option>
                                        <option value="Участвует в еженедельном">Участвует в еженедельном</option>
                                        <option value="Участвует в главном">Участвует в главном</option>
                                        <option value="Удален">Удален</option>
                                    </select>
                                </td>
                                <td>&nbsp;</td>
                            </tr>
                        </thead>
                        <tbody>
                            {ticketsArray &&
                                ticketsArray.map(el => (
                                    <TableItem getTickets={getTickets} isCompany={isCompany} key={el.id} {...el} />
                                ))}
                        </tbody>
                    </table>
                </div>
                <Pagination size="lg">{items}</Pagination>
            </div>
        </div>
    )
}

const TableItem = props => {
    const deleteTicket = async () => {
        const formData = new FormData()
        formData.append('id', props.id)
        await Api.ticketsDelete(formData)
        props.getTickets()
    }

    const downloadQr = async () => {
        const formData = new FormData()
        formData.append('code', props.code)
        const { qr } = await Api.getQr(formData)
        const link = document.createElement('a')
        link.href = qr
        link.setAttribute('download', `${props.id}qr.jpg`)
        link.click()
    }

    return (
        <tr>
            <td>{props.id}</td>
            {/* <td>{props.code}</td> */}
            {role != 'company' &&
                <td>
                    <Link to={`/companyStats/${props.company_id}`}>{props.company_name}</Link>
                </td>
            }
            <td>{props.bonus}</td>
            <td>{normalizeDate(props.created_at)}</td>
            {props.client_id ? (
                <td>{props.client_name}</td>
            ) : (
                <td>
                    <span className="not-set">(не задано)</span>
                </td>
            )}
            <td>{props.status}</td>
            <td style={{ cursor: 'pointer' }} onClick={downloadQr}>
                {<MaterialIcon icon="get_app" size={18} />}
            </td>
            {/*<td>*/}
            {/*    <div>*/}
            {/*        <Link to={`/ticketsUpdate/${props.id}`} title="Редактировать" aria-label="Редактировать" data-pjax="0">*/}
            {/*            <MaterialIcon icon="settings" size={18} />*/}
            {/*        </Link>*/}
            {/*    </div>*/}
            {/*</td>*/}
            {/*Удаление билета*/}
            {/*<td>*/}
            {/*    {!props.isCompany && (*/}
            {/*        <span*/}
            {/*            onClick={deleteTicket}*/}
            {/*            title="Удалить"*/}
            {/*            aria-label="Удалить"*/}
            {/*            data-pjax="0"*/}
            {/*            data-confirm="Вы уверены, что хотите удалить этот элемент?"*/}
            {/*            data-method="post"*/}
            {/*        >*/}
            {/*        <MaterialIcon icon="clear" size={18} />*/}
            {/*        </span>*/}
            {/*    )}*/}
            {/*</td>*/}
        </tr>
    )
}

export default TicketsList
