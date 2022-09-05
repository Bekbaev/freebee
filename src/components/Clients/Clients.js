import React, {useEffect, useMemo, useState} from 'react';
import {Link} from "react-router-dom";
import Api from "../../api/api";
import MaterialIcon from "react-google-material-icons";
import {ExportCSV} from "../Export/ExportTransactions";
import getRole from "../../getRole";

const Clients = ({noCreate}) => {
    const isGod = getRole() === 'god';
    const [managers, setManagers] = useState([])
    const [sortName, setSortName] = useState('')
    const [sortPhone, setSortPhone] = useState('')

    const filteredManagers = useMemo(() => {
        return managers.filter(manager => {
            if (!sortName.trim().length) {
                return manager;
            }
            return manager.fullname.toLowerCase().includes(sortName.trim().toLowerCase());
        }).filter(manager => {
            if (!sortPhone.trim().length) {
                return manager;
            }
            return manager.login.includes(sortPhone.trim())
        });
    }, [managers, sortName, sortPhone]);

    const preparedClients = useMemo(() => {
        return filteredManagers.map((m) => {
            return {
                '#': m.id,
                'Имя': m.fullname,
                'Телефон': m.login,
                'Баланс, freebee': m.balance.toFixed(2),
                'Баланс, тнг': (m.balance / 2.5).toFixed(2)
            };
        })
    }, [filteredManagers]);

    const getManagers = async () => {
        let { data } = await Api.clientsRead()
        setManagers(data.reverse())
    }
    useEffect(() => {
        (async () => {
            await getManagers();
        })();
    }, []);

    return (
        <>
            <h2>Пользователи</h2>
            {!noCreate && <Link to="/clientsCreate/">
                <div className="btn btn-success mt-15">Добавить</div>
            </Link>}
            <div className='mt-2'>
                <ExportCSV  csvData={preparedClients} fileName='Пользователи'/>
            </div>
            <br/>
            <div className="transaction-index mt-15">
                <div id="p0" data-pjax-container="" data-pjax-push-state data-pjax-timeout="1000">
                    <div id="w2" className="grid-view">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Имя</th>
                                {isGod &&<th>Номер</th>}
                                {isGod && <th>Баланс</th>}
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>
                                    <input value={sortName} onChange={e => setSortName(e.currentTarget.value)} type="text" className="form-control" name="TransactionSearch[phone]"/>
                                </td>
                                <td>
                                    <input value={sortPhone} onChange={e => setSortPhone(e.currentTarget.value)} type="text" className="form-control" name="TransactionSearch[phone]"/>
                                </td>
                            </tr>
                            </thead>
                            <tfoot>
                            </tfoot>
                            <tbody>
                            {managers.length ? filteredManagers.map(el => <TableItem key={el.id} isGod={isGod} {...el} />) : <p>Загрузка...</p>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
};

const TableItem = (props) => {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.fullname}</td>
            {props.isGod && <td>{props.login}</td>}
            {props.isGod && <td>{props.balance} fb</td>}
            {props.isGod && <td>{props.balance / 2.5} тг.</td>}
            <td>
                <Link to={`/clientsView/${props.id}`} title="Просмотр" aria-label="Просмотр"
                      data-pjax="0">
                    <MaterialIcon icon="remove_red_eye" size={18} />
                </Link>
            </td>
        </tr>
    );
};


export default Clients;
