import React, {useEffect, useMemo, useState} from 'react';
import Api from "../../api/api";
import {ExportCSV} from "../Export/ExportTransactions";

const ReferalList = () => {

    const [referals, setReferals] = useState([]);

    const preparedClients = useMemo(() => {
        return referals.map((m, key) => {
            return {
                '#': key + 1,
                'Дата': m.date,
                'Компания': m.company.name,
                'Кто пригласил': m.inviter.fullname,
                'Промокод': m.promocode,
                'Кого пригласил': m.invited.fullname,
                'Рассчитан': m.activated === 0 ? 'Нет' : 'Да',
            };
        })
    }, [referals]);

    useEffect(() => {
        (async () => {
            const { data } = await Api.getReferalsList();
            setReferals(data);
        })();
    }, []);

    return (
        <div>
            <h3>Реферальная система</h3>
            <div className='mt-2'>
                <ExportCSV  csvData={preparedClients} fileName='РефСистема'/>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Дата и время</th>
                    <th>Название компании</th>
                    <th>Кто пригласил</th>
                    <th>Промокод</th>
                    <th>Кого пригласил</th>
                    <th>Статус бонуса</th>
                </tr>
                </thead>
                <tbody>
                { referals.map((referal, key) => {
                    return (
                        <tr key={`ref-${referal.id}`}>
                            <td>{ key + 1 }</td>
                            <td>{ referal.date }</td>
                            <td>{ referal.company.name }</td>
                            <td>{ referal.inviter.fullname }</td>
                            <td>{ referal.promocode }</td>
                            <td>{ referal.invited.fullname }</td>
                            <td>{referal.activated === 0 ? 'Не начислен' : 'Начислен'}</td>
                        </tr>
                    );
                }) }
                </tbody>
            </table>
        </div>
    );

}

export default ReferalList;
