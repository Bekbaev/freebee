import React, {useEffect, useMemo, useState} from 'react';
import {Link} from "react-router-dom";
import normalizeDate from '../../normalizeDate';
import MaterialIcon from "react-google-material-icons";
import Api from "../../api/api";
import getRole from "../../getRole";
import transaction_types from "../../common/enums/types/transaction_types";
import formatPrice from "../../utils/formatPrice";
import {ExportCSV} from "../Export/ExportTransactions";
const role = (getRole() === 'accountant' || getRole() === 'god') ? 'god' : getRole();

const Transaction = ({transaction, close = false, pagination = false, onPaginate = null}) => {
    const transactionTypes = [{id: -1, name: 'Все'}, ...transaction_types];
    const [managers, setManagers] = useState([])
    const [company, setCompany] = useState([])
    const [visible, setVisible] = useState(!close);
    const [transactionType, setTransactionType] = useState(-1);
    const [freebeeSum, setFreebeeSum] = useState('');
    const [tengeSum, setTengeSum] = useState('');
    const [manager, setManager] = useState('Все');
    const [client, setClient] = useState('');
    const [date, setDate] = useState(null);

    /*useEffect(() => {
        setFilteredTransaction(transaction);
    }, [transaction])*/

    const getManagers = async () => {
        let {data} = await Api.userRead()
        setManagers(data.data)
    }

    const getCompany = async () => {
        let data = await Api.companyList()
        setCompany(data)
    }

    const filteredTransactions = useMemo(() => {
        return transaction
            .filter(item => {
                if (+transactionType === -1) {
                    return item;
                }
                return item.type === +transactionType;
            })
            .filter(item => {
                if (manager === 'Все') {
                    return item;
                }
                return item.user_name === manager;
            }).filter(item => {
                if (!client.trim()) {
                    return item;
                }
                return item.client_name.toLowerCase().includes(client.trim().toLowerCase());
            }).filter(item => {
                if (!date) {
                    return item;
                }
                return normalizeDate(item.created_at, 'onlyDay') === normalizeDate(date, 'onlyDay')
            }).filter(item => {
                if (!freebeeSum) {
                    return item;
                }
                return item.sum === freebeeSum;
            }).filter(item => {
                if (!tengeSum) {
                    return item;
                }
                return item.tenge_sum === tengeSum;
            });
    }, [transactionType, freebeeSum, tengeSum, manager, client, date, transaction]);

    const preparedTransactions = useMemo(() => {
        return filteredTransactions.map((t) => {
            const commission = +t.company_commission || 0;
            if (role === 'god') {
                return {
                    'Компания': t.company_name,
                    'Сумма, freebee': t.sum.toFixed(2),
                    'Сумма, тнг': (t.sum / 2.5).toFixed(2),
                    'Тип': t.type === 0 ? 'Списание' : 'Пополнение',
                    'Кэшбек': ((t.sum / 2.5) / 100 * commission).toFixed(1),
                    'Итого': (t.sum / 2.5) - (t.sum / 2.5) / 100 * commission,
                    'Менеджер': t.user_name ? t.user_name : `Билет #${t.ticket_id}`,
                    'Клиент': t.client_name ? t.client_name : `(не задано)`,
                    'Дата': normalizeDate(t.created_at)
                };
            }

            if (role === 'company') {
                return {
                    'Сумма, freebee': t.sum.toFixed(2),
                    'Сумма, тнг': (t.sum / 2.5).toFixed(2),
                    'Тип': t.type === 0 ? 'Списание' : 'Пополнение',
                    'Кэшбек': ((t.sum / 2.5) / 100 * commission).toFixed(1),
                    'Итого': (t.sum / 2.5) - (t.sum / 2.5) / 100 * commission,
                    'Менеджер': t.user_name ? t.user_name : `Билет #${t.ticket_id}`,
                    'Клиент': t.client_name ? t.client_name : `(не задано)`,
                    'Дата': normalizeDate(t.created_at)
                };
            }

            if (role === 'partner') {
                return {
                    'Сумма, freebee': t.sum.toFixed(2),
                    'Сумма, тнг': (t.sum / 2.5).toFixed(2),
                    'Клиент': t.client_name ? t.client_name : `(не задано)`,
                    'Дата': normalizeDate(t.created_at),
                };
            }

            if (role === 'employee') {
                return {
                    'Сумма, freebee': t.sum.toFixed(2),
                    'Сумма, тнг': (t.sum / 2.5).toFixed(2),
                    'Тип': t.type === 0 ? 'Списание' : 'Пополнение',
                    'Клиент': t.client_name ? t.client_name : `(не задано)`,
                    'Дата': normalizeDate(t.created_at)
                }
            }
            return {};

        });
    }, [filteredTransactions]);

    const totalSum = useMemo(() => {
        return filteredTransactions.reduce((a, c ) => {
            return a + c.tenge_sum;
        }, 0);
    }, [filteredTransactions]);

    const totalCashBack = useMemo(() => {
        return filteredTransactions.reduce((a, c ) => {
            return a + c.tenge_sum / 100 * c.company_commission;
        }, 0);
    }, [filteredTransactions]);

    const sortTable = async (type, e, valute) => {
        /*let text = e.currentTarget.value
        if (valute === 'tenge') {
            text = text * 2.5
        }
        let filteredArray = transaction.filter(el => el[type] == text)
        if (type === "created_at") {
            text = normalizeDate(text, 'onlyDay')
            filteredArray = transaction.filter(el => normalizeDate(el[type], 'onlyDay') == text)
        }

        if (text == '') {
            setFilteredTransaction(transaction)
        } else {
            setFilteredTransaction(filteredArray)
        }*/
    }
    let showAddDocument = false

    if (role == 'god' || role == 'accountant') {
        if (close) {
            showAddDocument = true
        }
    }


    useEffect(() => {
        (async () => {
            await getManagers();
            await getCompany();
        })()
    }, [])

    const [show, setShow] = useState(false);

    const tableSort = () => {
        switch (role) {
            case 'god':
                return (
                    <tr id="w2-filters" className="filters">
                        <td>
                            <select className="form-control" name="TransactionSearch[user_id]"
                                    onChange={e => sortTable("company_name", e)} disabled={true}>
                                <option value=""></option>
                                {company.map((el, index) => <option value={el.name} key={`${index}-${el.name}`}>{el.name}</option>)}
                            </select>
                        </td>
                        <td>
                            <div className="d-flex">
                                <div className="w-50pr">
                                    <input type="text" className="form-control w-90pr"
                                           onChange={e => setFreebeeSum(+e.target.value)}/>
                                </div>
                                <div className="w-50pr">
                                    <input type="text" className="form-control w-90pr"
                                           onChange={e => setTengeSum(+e.target.value)}
                                    />
                                </div>
                            </div>
                        </td>
                        <td>
                            <select className="form-control" onChange={e => setTransactionType(e.target.value)}>
                                { transactionTypes.map((item) => {
                                    return (
                                        <option value={item.id} key={`transaction-type-${item.id}`}>{ item.name }</option>
                                    );
                                }) }
                            </select>
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                            <select className="form-control" name="TransactionSearch[user_id]"
                                    onChange={e => setManager(e.target.value)}
                            >
                                {/*<option value=""></option>*/}
                                {[{name: 'Все'}, ...managers].map((el, index) => <option value={el.name} key={`${index}-${el.name}`}>{el.name}</option>)}
                            </select>
                        </td>
                        <td>
                            <input type="text" className="form-control" name="TransactionSearch[phone]"
                                   onChange={e => setClient(e.target.value)}
                            />
                        </td>
                        <td><input type="date" className="form-control" name="TransactionSearch[value]"
                                   onChange={e => setDate(e.target.value)}
                        /></td>
                    </tr>
                );
            case 'company':
                return (
                    <tr id="w2-filters" className="filters">
                        <td>
                            <div className="d-flex">
                                <div className="w-50pr">
                                    <input type="text" className="form-control w-90pr"
                                           onChange={e => setFreebeeSum(+e.target.value)}/>
                                </div>
                                <div className="w-50pr">
                                    <input type="text" className="form-control w-90pr"
                                           onChange={e => setTengeSum(+e.target.value)}
                                    />
                                </div>
                            </div>
                        </td>
                        <td>
                            <select className="form-control" onChange={e => setTransactionType(e.target.value)}>
                                { transactionTypes.map((item) => {
                                    return (
                                        <option value={item.id} key={`transaction-type-${item.id}`}>{ item.name }</option>
                                    );
                                }) }
                            </select>
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                            <select className="form-control" name="TransactionSearch[user_id]"
                                    onChange={e => setManager(e.target.value)}
                            >
                                {/*<option value=""></option>*/}
                                {[{name: 'Все'}, ...managers].map((el, index) => <option value={el.name} key={`${index}-${el.name}`}>{el.name}</option>)}
                            </select>
                        </td>
                        <td>
                            <input type="text" className="form-control" name="TransactionSearch[phone]"
                                   onChange={e => setClient(e.target.value)}
                            />
                        </td>
                        <td><input type="date" className="form-control" name="TransactionSearch[value]"
                                   onChange={e => setDate(e.target.value)}
                        /></td>
                    </tr>
                );
            case 'partner':
                return (
                    <tr id="w2-filters" className="filters">
                        <td>
                            <div className="d-flex">
                                <div className="w-50pr">
                                    <input type="text" className="form-control w-90pr"
                                           onChange={e => setFreebeeSum(+e.target.value)}/>
                                </div>
                                <div className="w-50pr">
                                    <input type="text" className="form-control w-90pr"
                                           onChange={e => setTengeSum(+e.target.value)}
                                    />
                                </div>
                            </div>
                        </td>
                        <td>
                            <input type="text" className="form-control" name="TransactionSearch[phone]"
                                   onChange={e => setClient(e.target.value)}
                            />
                        </td>
                        <td><input type="date" className="form-control" name="TransactionSearch[value]"
                                   onChange={e => setDate(e.target.value)}
                        /></td>
                    </tr>
                );
            case 'employee':
                return (
                    <tr id="w2-filters" className="filters">
                        <td>
                            <select className="form-control" onChange={e => setTransactionType(e.target.value)}>
                                { transactionTypes.map((item) => {
                                    return (
                                        <option value={item.id} key={`transaction-type-${item.id}`}>{ item.name }</option>
                                    );
                                }) }
                            </select>
                        </td>
                        <td>
                            <div className="d-flex">
                                <div className="w-50pr">
                                    <input type="text" className="form-control w-90pr"
                                           onChange={e => setFreebeeSum(+e.target.value)}/>
                                </div>
                                <div className="w-50pr">
                                    <input type="text" className="form-control w-90pr"
                                           onChange={e => setTengeSum(+e.target.value)}
                                    />
                                </div>
                            </div>
                        </td>
                        <td>
                            <input type="text" className="form-control" name="TransactionSearch[phone]"
                                   onChange={e => setClient(e.target.value)}
                            />
                        </td>
                        <td><input type="date" className="form-control" name="TransactionSearch[value]"
                                   onChange={e => setDate(e.target.value)}
                        /></td>
                    </tr>
                );
            default:
                return (<></>);
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    return <>
        {
            showAddDocument &&
            <Link to='/massCheck'>
                <div className="btn btn-success mt-15" onClick={handleShow} animation={false}>Массово закрепить
                    чек
                </div>
            </Link>
        }

        <div className='mt-3'>
            <ExportCSV csvData={preparedTransactions} fileName={'транзакции'}/>
        </div>

        <h4>
            Общая сумма: { formatPrice(totalSum) } тенге
        </h4>
        <h4>
            Комиссия: { formatPrice(totalCashBack) } тенге
        </h4>

        <div id="p0" data-pjax-container="" data-pjax-push-state data-pjax-timeout="1000">
            <div id="w2" className="grid-view">
                <table className="table table-striped mt-15">
                    <thead>
                    <TableHead/>
                    { tableSort() }


                    {/*<SortTableItem
                        sortTable={sortTable}
                        managers={managers}
                        company={company}
                    />*/}

                    </thead>
                    <tbody>
                    {filteredTransactions.map(el => <TableItem key={el.id} {...el} />)}
                    </tbody>
                </table>
            </div>
        </div>
    </>;
};

const TableHead = () => {
    if (role == 'god') {
        return (
            <>
                <tr>
                    <th>Компания</th>
                    <th className="w-200">Сумма</th>
                    <th>Тип</th>
                    <th>Кэшбэк</th>
                    <th>Итого</th>
                    <th>Менеджер</th>
                    <th>Клиент</th>
                    <th>время</th>
                </tr>
                <tr>
                    <th>&nbsp;</th>
                    <th>
                        <div className="d-flex">
                            <div className="w-50pr">FreeBee</div>
                            <div>Тенге</div>
                        </div>
                    </th>
                </tr>
            </>
    )
    } else if (role == 'company') {
        return (
            <>
                <tr>
                    <th className="w-200">Сумма</th>
                    <th>Тип</th>
                    <th>Кэшбэк</th>
                    <th>Итого</th>
                    <th>Менеджер</th>
                    <th>Клиент</th>
                    <th>время</th>
                </tr>
                <tr>
                    <th>
                        <div className="d-flex">
                            <div className="w-50pr">FreeBee</div>
                            <div>Тенге</div>
                        </div>
                    </th>
                </tr>
            </>
        )
    }else if(role == 'partner'){
        return (
            <>
                <tr>
                    <th className="w-200">Сумма</th>
                    <th>Клиент</th>
                    <th>время</th>
                </tr>
                <tr>
                    <th>
                        <div className="d-flex">
                            <div className="w-50pr">FreeBee</div>
                            <div>Тенге</div>
                        </div>
                    </th>
                </tr>
            </>
        )
    }else if(role == 'employee'){
        return (
            <>
                <tr>
                    <th>Тип</th>
                    <th className="w-200">Сумма</th>
                    <th>Клиент</th>
                    <th>время</th>
                </tr>
                <tr>
                    <th></th>
                    <th>
                        <div className="d-flex">
                            <div className="w-50pr">FreeBee</div>
                            <div>Тенге</div>
                        </div>
                    </th>
                </tr>
            </>
        )
    }
}


const TableItem = (props) => {
    const commission = +props.company_commission || false

    if (role == 'god') {
        return (
            <tr>
                <td>{props.company_name}</td>
                <td>
                    <div className="d-flex">
                        <div className="w-50pr">{props.sum}</div>
                        <div>{+props.sum / 2.5}</div>
                    </div>
                </td>
                {!props.type
                    ? <td>Списание</td>
                    : <td>Начисление</td>
                }
                <td>{commission && ((props.sum / 2.5) / 100 * commission).toFixed(1)}</td>
                <td>{commission && (props.sum / 2.5) - (props.sum / 2.5) / 100 * commission}</td>
                {props.user_id !== -1
                    ?
                    <td>
                        {role === 'god' ? <Link to={`/managerView/${props.user_id}`}>{props.user_name}</Link> : <p>{ props.user_name }</p>}
{/*
                        <Link to={`/managerView/${props.user_id}`}>{props.user_name}</Link>
*/}
                    </td>
                    :
                    <td>Билет #{props.ticket_id}</td>
                }
                {props.client_name
                    ? <td>{props.client_name}</td>
                    : <td><span className="not-set">(не задано)</span></td>
                }
                <td>{normalizeDate(props.created_at)}</td>

                {props.receipt &&
                <td>
                    <a target='_blank' href={`${props.receipt}`} title="Посмотреть чек"
                       aria-label="Посмотреть чек" data-pjax="0">
                        <MaterialIcon icon="receipt" size={18}/>
                    </a>
                </td>
                }
            </tr>
        )
    } else if (role == 'company') {
        return (
            <tr>
                <td>
                    <div className="d-flex">
                        <div className="w-50pr">{props.sum}</div>
                        <div>{+props.sum / 2.5}</div>
                    </div>
                </td>
                {!props.type
                    ? <td>Списание</td>
                    : <td>Начисление</td>
                }
                <td>{commission && ((props.sum / 2.5) / 100 * commission).toFixed(1)}</td>
                <td>{commission && (props.sum / 2.5) - (props.sum / 2.5) / 100 * commission}</td>
                {props.user_name
                    ? <td><Link to={`/managerView/${props.user_id}`}>{props.user_name}</Link></td>
                    : <td>Билет #{props.ticket_id}</td>
                }
                {props.client_name
                    ? <td>{props.client_name}</td>
                    : <td><span className="not-set">(не задано)</span></td>
                }
                <td>{normalizeDate(props.created_at)}</td>
                {props.receipt &&
                <td>
                    <a target='_blank' href={`${props.receipt}`} title="Посмотреть чек"
                       aria-label="Посмотреть чек" data-pjax="0">
                        <MaterialIcon icon="receipt" size={18}/>
                    </a>
                </td>
                }
            </tr>
        )
    } else if (role == 'partner') {
        return (
            <tr>
                <td>
                    <div className="d-flex">
                        <div className="w-50pr">{props.sum}</div>
                        <div>{+props.sum / 2.5}</div>
                    </div>
                </td>
                {props.client_name
                    ? <td>{props.client_name}</td>
                    : <td><span className="not-set">(не задано)</span></td>
                }
                <td>{normalizeDate(props.created_at)}</td>
                {props.receipt &&
                <td>
                    <a target='_blank' href={`${props.receipt}`} title="Посмотреть чек"
                       aria-label="Посмотреть чек" data-pjax="0">
                        <MaterialIcon icon="receipt" size={18}/>
                    </a>
                </td>
                }
            </tr>
        )
    }
    else if (role == 'employee') {
        return (
            <tr>
                {!props.type
                    ? <td>Списание</td>
                    : <td>Начисление</td>
                }
                <td>
                    <div className="d-flex">
                        <div className="w-50pr">{props.sum}</div>
                        <div>{+props.sum / 2.5}</div>
                    </div>
                </td>
                {props.client_name
                    ? <td>{props.client_name}</td>
                    : <td><span className="not-set">(не задано)</span></td>
                }
                <td>{normalizeDate(props.created_at)}</td>
                {props.receipt &&
                <td>
                    <a target='_blank' href={`${props.receipt}`} title="Посмотреть чек"
                       aria-label="Посмотреть чек" data-pjax="0">
                        <MaterialIcon icon="receipt" size={18}/>
                    </a>
                </td>
                }
            </tr>
        )
    }

}

export default Transaction;
