import React, {useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import getCompanyId from "../../getCompanyId";
import Api from "../../api/api";
import toastPlugin from "../../utils/toastPlugin";
import { useHistory } from 'react-router-dom';

const CompanyPromocodeCreate = () => {
    const history = useHistory();
    const company = getCompanyId();
    const [companies, setCompanies] = useState([]);
    const [promocode, setPromocode] = useState('');
    const [companyId, setCompanyId] = useState(company);
    const [amount, setAmount] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const freebeeAmount = useMemo(() => {
        return amount * 2.5;
    }, [amount]);

    const onSubmit = async _ => {
        const promocodeObject = {
            amount,
            start_date: startDate,
            end_date: endDate,
            company_id: companyId,
            promocode,
        };

        if (!Object.values(promocodeObject).every(object => !!object)) {
            return toastPlugin.error('Заполните все поля!');
        }

        try {
            const res = await Api.createPromocode(promocodeObject);
            toastPlugin.success('Промокод создан!');
            history.push('/promocode/list');
        } catch (e) {
            return toastPlugin.error(e.response.data.message);
        }
    }

    useEffect(() => {
        (async () => {
            if (company === -1) {
                const data  = await Api.companyList();
                setCompanies(data);
                setCompanyId(data[0].id);
            }
        })();
    }, []);

    return (
        <div>
            <h3>Создание промокода</h3>

            { company === -1  &&
            <div className="form-group">
                <label >Компания</label>
                <select className="form-control" value={companyId} onChange={e => setCompanyId(+e.target.value)}>
                    { companies.map((company) => {
                        return <option key={company.name} value={company.id}>{company.name}</option>;
                    }) }
                </select>
            </div>
            }
            <div className="form-group">
                <label >Промокод</label>
                <input type="text" className='form-control' defaultValue={promocode} placeholder='Введите промокод' onBlur={e => setPromocode(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="">Сумма начисления freebee</label>
                <input type="number" className='form-control' placeholder='Сумма пополнения в тенге' value={amount} onChange={e => setAmount(+e.target.value)}/>
            </div>

            <div className="form-group">
                <label htmlFor="">Дата начала действия</label>
                <input type="date" className='form-control' placeholder='Начало действия' value={startDate} onChange={e => setStartDate(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="">Дата окончания действия</label>
                <input type="date" className='form-control' placeholder='Конец действия' value={endDate} onChange={e => setEndDate(e.target.value)}/>
            </div>

            <button className="btn btn-success" onClick={onSubmit}>
                Создать
            </button>

        </div>
    );
};

export default CompanyPromocodeCreate;
