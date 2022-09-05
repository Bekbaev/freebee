import React, {useEffect, useMemo, useState} from 'react'
import { Button, Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import { Link, useHistory } from 'react-router-dom'
import Api from '../../api/api'
import Transaction from '../Transaction/Transaction'
import moment from "moment";
import TRANSACTION_TYPES from "../../common/enums/types/transaction_types";
import CURRENCY_TYPES from "../../common/enums/types/currency_types";

const CompanyFullInfo = ({ match }) => {
    const id = match.params.id
    const history = useHistory()
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [info, setInfo] = useState(null)
    const [transaction, setTransaction] = useState([])
    const [transactionType, setTransactionType] = useState(0);
    const [deleteModalStatus, setDeleteModalStatus] = useState(false)
    const [totalSum, setTotalSum] = useState(0)
    const [commission, setCommission] = useState(0);
    const [currency, setCurrency] = useState('тенге');
    const [pagination, setPagination] = useState(false);


    const filteredTransactions = useMemo(() => {
        return transaction;
        let transactions = [...transaction];
        if (startDate && endDate) {
            const _startDate = moment(startDate);
            const _endDate = moment(endDate);
            transactions = transactions.filter(t => {
                const date = moment(t.created_at);
                return date.isSameOrAfter(_startDate) && date.isSameOrBefore(_endDate);
            })
        }
        transactions = transactions.filter(t => t.type === transactionType);
        /* if (currency !== 'Все') {
             transactions = transactions.filter(t => t.currency === currency);
         }*/
        const totalSum = transactions.reduce((a, c) => {
            const current = currency === 'freebee' ? c.sum : c.tenge_sum;
            return a + current;
        }, 0);
        const totalCommission = transactions.reduce((a, c) => {
            const current = currency === 'freebee' ? c.sum : c.tenge_sum;
            return a + current * c.company_commission / 100;
        }, 0);
        setCommission(totalCommission);
        setTotalSum(totalSum);
        return transactions;
    }, [startDate, endDate, transactionType, currency, transaction]);

    const deleteCompany = async () => {
        const formData = new FormData()
        formData.append('id', id)
        await Api.companyDelete(formData)
        closeDeleteModal()
        history.push(`/`)
    }

    const openDeleteModal = () => {
        setDeleteModalStatus(true)
    }

    const closeDeleteModal = () => {
        setDeleteModalStatus(false)
    }

    const getCurrentInfo = async () => {
        const { data } = await Api.getCompany(id)
        setInfo(data)
    }
    const getTransaction = async (page = 1) => {
        setTransaction([]);
        const { data } = await Api.transactionRead(id, page)
        setTransaction(data.data);
        setPagination(data);
        setStartDate(undefined);
    }
    useEffect(() => {
        if (id) {
            (async () => {
                await getCurrentInfo()
                await getTransaction()
            })();
        }
    }, [])

    if (!info) {
        return null
    }
    return (
        <>
            <Modal show={deleteModalStatus} onHide={closeDeleteModal} animation={false} centered>
                <Modal.Body>Вы действительно хотите удалить {info.name}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDeleteModal}>
                        отмена
                    </Button>
                    <Button variant="primary" onClick={deleteCompany}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="mb-20">
                <Link to={`/companyEdit/${info.id}`}>
                    <div className="btn btn-primary">Изменить</div>
                </Link>
                <span onClick={openDeleteModal}>
                    <div className="btn btn-danger ml-4">Удалить</div>
                </span>
            </div>
            <table className="table table-striped table-bordered">
                <tbody>
                    <tr>
                        <th>Город</th>
                        <td>{info.city}</td>
                    </tr>
                    <tr>
                        <th>Название компании</th>
                        <td>{info.name}</td>
                    </tr>
                    <tr>
                        <th>ФИО директора</th>
                        <td>{info.director_name}</td>
                    </tr>
                    <tr>
                        <th>Телефон директора</th>
                        <td>{info.director_phone}</td>
                    </tr>
                    <tr>
                        <th>Телефон администратора</th>
                        <td>{info.admin_phone}</td>
                    </tr>
                    <tr>
                        <th>Телефон бухгалтера</th>
                        <td>{info.accountant_phone}</td>
                    </tr>
                    <tr>
                        <th>E-mail</th>
                        <td>{info.email}</td>
                    </tr>
                    <tr>
                        <th>Комиссия</th>
                        <td>{info.commission}%</td>
                    </tr>
                    <tr>
                        <th>Процент кэшбека</th>
                        <td>{info.cashback_percent}%</td>
                    </tr>
                    <tr>
                        <th>Тип компании</th>
                        <td>{info.type_text}</td>
                    </tr>
                    <tr>
                        <th>Кошелек</th>
                        <td>
                            <p>{(info.wallet).toFixed(2)} Frebee</p>
                            <p>{(info.wallet / 2.5).toFixed(2)} тенге</p>
                        </td>
                    </tr>
                    {info.type == 1 &&<tr>
                        <th>Участвует в реф.системе</th>
                        <td>
                            { info.has_ref_system && <p className='text-success'>Да</p> }
                            { !info.has_ref_system && <p className='text-danger'>Нет</p> }
                        </td>
                    </tr>}
                   {/* <tr>
                        <th>Кошелек «FreeBee»</th>
                        <td>{(info.total_freebee).toFixed(2)} freebee</td>
                    </tr>
                    <tr>
                        <th>Кошелек «Тенге»</th>
                        <td>{(info.total_tenge).toFixed(2)} тенге</td>
                    </tr>*/}
                    <tr>
                        <th>Ссылка на 2GIS</th>
                        <td>
                            <a href={info['2gis_url']}>{info['2gis_url']}</a>
                        </td>
                    </tr>
                    <tr>
                        <th>Лого</th>
                        <td>
                            <img src={info.logo} alt={`Логотип компании ${info.name}`} width="150" height="150"/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h4>
                Таблица транзакций:
            </h4>
            {pagination && <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item" onClick={() => getTransaction(pagination.current_page - 1)}>
                        <span className="page-link" href="#">Назад</span>
                    </li>
                    {
                        Array(pagination.last_page).fill({}).map((_, key) => {
                            return (<li className={(key + 1) === pagination.current_page ? 'page-item active' : 'page-item'} onClick={() => getTransaction(key + 1)}><span className="page-link" href="#">{key + 1}</span></li>);
                        })
                    }
                    <li className="page-item" onClick={() => getTransaction(pagination.current_page + 1)}>
                        <span className="page-link" href="#">Вперед</span>
                    </li>
                </ul>
            </nav>}
            {filteredTransactions && <Transaction transaction={filteredTransactions}  />}
        </>
    )
}

export default CompanyFullInfo
