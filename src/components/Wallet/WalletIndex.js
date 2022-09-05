import React, {useEffect, useState} from 'react';
import { Link, Route } from 'react-router-dom'
import Api from "../../api/api";

const WalletIndex = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        (async () => {
            const { data } = await Api.companiesWalletList();
            setCompanies(data);
        })();
    }, []);

    return (
        <div>
            <h3>Транзакции по кошелькам</h3>
            <Link to="/wallet/add" tag='button' className='btn btn-success'>
                Пополнить кошелек
            </Link>
            <table className='table my-5'>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Компания</th>
                    <th>
                        Кошелек (доступно)
                    </th>
                    <th>
                        Начислено
                    </th>
                    <th>
                        Действие
                    </th>
                </tr>
                </thead>
                { companies.length > 0 &&
                <tbody>
                { companies.map((company, idx) => {
                    return (
                        <tr key={company.name}>
                            <td>{idx + 1}</td>
                            <td>{ company.name }</td>
                            <td><b>{ (company.wallet).toFixed(2) } freebee / { (company.wallet / 2.5).toFixed(2) } тенге</b></td>
                            <td>{ (company.wallet_sum).toFixed(2) } freebee / { (company.wallet_sum / 2.5).toFixed(2) } тенге</td>
                            <td>
                                <Link to={`/wallet/info/${company.id}`}>
                                    Подробнее
                                </Link>
                            </td>
                        </tr>
                    );
                }) }
                </tbody>
                }
            </table>
        </div>
    );
}

export default WalletIndex;
