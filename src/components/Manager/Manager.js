import React, {useEffect, useMemo, useState} from 'react';
import {Link} from "react-router-dom";
import Api from "../../api/api";
import normalizeDate from '../../normalizeDate'
import MaterialIcon from "react-google-material-icons";
import getRole from "../../getRole";
import ConfirmationModal from "../Modals/ConfirmationModal";

const role = getRole();

const Manager = () => {
    const [managers, setManagers] = useState([]);
    const [cities, setCities] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [roles, setRoles] = useState([]);
    const [nameFilter, setNameFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const [companyFilter, setCompanyFilter] = useState('Все');
    const [roleFilter, setRoleFilter] = useState('Все');
    const [labelFilter, setLabelFilter] = useState('');

    const filteredManagers = useMemo(() => {
        return managers.filter(manager => {
            if (nameFilter.trim().length) {
                return manager.name.toLowerCase().includes(nameFilter.toLowerCase());
            }
            return manager;
        }).filter(manager => {
            if (cityFilter === 'Все') {
                return manager;
            }
            return manager.town.name === cityFilter;
        }).filter(manager => {
            if (companyFilter === 'Все') {
                return manager;
            }
            return manager.company_name === companyFilter;
        }).filter(manager => {
            if (roleFilter === 'Все') {
                return manager;
            }
            return manager.role_ru_name === roleFilter;
        }).filter(manager => {
            if (labelFilter.trim().length) {
                return manager.label.toLowerCase().includes(labelFilter.toLowerCase());
            }
            return manager;
        });
    }, [nameFilter, cityFilter, companyFilter, roleFilter, labelFilter]);

    const getManagers = async () => {
        let {data} = await Api.userRead()
        setManagers(data.data)
        setCityFilter('Все');
    }

    const getCities = async () => {
        let { data } = await Api.citiesRead();
        setCities([
            {
                id: -1,
                name: 'Все'
            },
            ...data
        ]);
    }

    const getCompanies = async () => {
        let { data } = await Api.companyRead();
        setCompanies([
            {
                id: -1,
                name: 'Все'
            },
            ...data
        ])
    }

    const getRoles = async () => {
        const data = await Api.getRoles();
        setRoles([
            {
                id: -1,
                ru_name: 'Все'
            },
            ...data
        ])
    }

    useEffect(() => {
        (async () => {
            await getManagers();
            await getCities();
            await getCompanies();
            await getRoles();
        })()
    }, [])

    if(!managers){
        return (
            <p>Загрузка...</p>
        )
    }

    return (
        <>
            <div className='manager-table'>
            <h2>Менеджеры</h2>
            <Link to="/managerCreate/">
                <div className="btn btn-success mt-15">Добавить</div>
            </Link>
            <div className="transaction-index mt-15">
                <div id="p0" data-pjax-container="" data-pjax-push-state data-pjax-timeout="1000">
                    <div id="w2" className="grid-view">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Дата регистрации</th>
                                <th><a href="/admin/transaction/manager?sort=user_id"
                                       data-sort="user_id">Имя</a></th>
                                <th>Город</th>
                                <th>Компания</th>
                                <th>Роль</th>
                                <th>Название должности</th>
                                <th className="action-column">&nbsp;</th>
                            </tr>
                            <tr id="w2-filters" className="filters">
                                <td>{/*<input type="text" className="form-control"/>*/}</td>
                                <td>
                                    <input type="text" id="w0" className="form-control" readOnly="readonly"/>
                                </td>
                                <td>
                                    <input type="text" className='form-control' onChange={e => setNameFilter(e.target.value)}/>
                                </td>
                                <td>
                                    <select className="form-control" name="city" onChange={e => setCityFilter(e.target.value)}>
                                        {cities.length && cities.map((city, key) => {
                                            return (
                                                <option value={city.name} key={`${city.name}-${key}`}>{city.name}</option>
                                            )
                                        })}
                                    </select>
                                </td>
                                <td>
                                    <select
                                        disabled={role !== 'god'}
                                        className="form-control"
                                        name="TransactionSearch[user_id]"
                                        onChange={e => setCompanyFilter(e.target.value)}>
                                        {companies.length && companies.map((company, key) => {
                                            return (
                                                <option value={company.name} key={`${company.name}-${key}`}>{company.name}</option>
                                            );
                                        })}
                                    </select>
                                </td>
                                <td>
                                    <select className="form-control" name="TransactionSearch[user_id]" onChange={e => setRoleFilter(e.target.value)}>
                                        {roles.length && roles.map((role, key) => {
                                            return (
                                                <option value={role.ru_name} key={`${role.ru_name}-${key}`}>{role.ru_name}</option>
                                            );
                                        })}
                                    </select>
                                </td>
                                <td>
                                    <input type="text" className='form-control' onChange={e => setLabelFilter(e.target.value)}/>
                                </td>
                            </tr>
                            </thead>
                            <tfoot>
                            </tfoot>
                            <tbody>
                            {filteredManagers.length && filteredManagers.map(el => <TableItem key={el.id} {...el} />)}
                            </tbody>
                        </table>
                    </div>
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
            <td>{normalizeDate(props.created_at)}</td>
            <td><Link to={`/managerView/${props.id}`}>{props.name}</Link></td>
            <td>{props.town.name}</td>
            <td>{props.company_name}</td>
            <td>{props.role_ru_name}</td>
            <td>{props.label}</td>
            <td>
                <Link to={`/managerView/${props.id}`} title="Просмотр" aria-label="Просмотр"
                   data-pjax="0">
                    <MaterialIcon icon="remove_red_eye" size={18} />
                </Link>
            </td>
        </tr>
    );
};


export default Manager;
