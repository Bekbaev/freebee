import React, {useEffect, useMemo, useState} from 'react';
import Api from "../../api/api";
import toastPlugin from "../../utils/toastPlugin";
import { useHistory } from 'react-router-dom';

const WalletAdd = () => {

    const [companies, setCompanies] = useState([]);
    const [currency, setCurrency] = useState(1);
    const [amount, setAmount] = useState(0);
    const [companyId, setCompanyId] = useState(null);
    const history = useHistory();

    useEffect(() => {
        (async () => {
            const data = await Api.companyList();
            setCompanies(data);
            setCompanyId(data[0].id);
        })();
    }, []);

    const currentCompany = useMemo(() => {
        return companies.find(c => c.id == companyId);
    }, [companies, companyId]);

    const handleSubmit = async e => {
        e.preventDefault();
        const walletTransaction = {
            amount: currency === 1 ? amount * 2.5 : amount,
            company_id: companyId,
        };

        try {
            await Api.companyWalletAdd(walletTransaction);
            toastPlugin.success('Кошелек успешно пополнен');
            history.push('/wallet/index');
        } catch (e) {
            toastPlugin.error('Произошла ошибка!');
        }
    }

    return (
        <div>
            { companies &&
            <>
            <h3>Пополнение кошелька</h3>
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                <select name="company" className='form-control' onChange={e => setCompanyId(+e.target.value)}>
                { companies.map((company) => {
                    return <option key={company.name} value={company.id}>{company.name}</option>
                }) }
                </select>
                </div>
                <p>Текущий кошелек: <b>{ currentCompany?.wallet } freebee / { currentCompany?.wallet / 2.5 } тенге</b></p>
                <div className="form-group d-flex">
                    <div className="d-flex mr-4">
                        <input className='mr-2' checked={currency === 1} type="radio" name='currency' value='1' id='currency-1' onChange={e => setCurrency(+e.target.value)}/>
                        <label htmlFor="currency-1">Тенге</label>
                    </div>
                    <div className="d-flex">
                        <input className='mr-2' checked={currency === 2} type="radio" name='currency' value='2' id='currency-2'  onChange={e => setCurrency(+e.target.value)}/>
                        <label htmlFor="currency-2">Freebee</label>
                    </div>
                </div>
                <div className="form-group">
                    <label>
                        Сумма пополнения в {currency === 1 ? 'тенге' : 'freebee'}
                    </label>
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder={`Сумма пополнения в ${currency === 1 ? 'тенге' : 'freebee'}`} className="form-control"/>
                </div>
                <div className="form-group">
                    <input type="submit" className='btn btn-success' value='Пополнить'/>
                </div>
                </form>
            </>
            }
        </div>
    );
}

export default WalletAdd;
