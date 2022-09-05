import React, {useEffect, useState, useMemo} from 'react'
import CompanyCreateForm from '../Company/CompanyCreateForm'
import CompanyAllTable from '../Company/CompanyAllTable'
import MainStats from './Main-stats'
import { Col, Form } from 'react-bootstrap'
import Api from '../../api/api'
import getRole from '../../getRole'
import DatePicker from "react-datepicker";
import moment from 'moment';
import TRANSACTION_TYPES from "../../common/enums/types/transaction_types";
import COMPANY_TYPES from "../../common/enums/types/company_types";
import CURRENCY_TYPES from "../../common/enums/types/currency_types";

const role = getRole()

const Main = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalSum, setTotalSum] = useState(0)
    const [commission, setCommission] = useState(0)
    const [companyArray, setCompanyArray] = useState([])
    const [companyFilteredArray, setCompanyFilteredArray] = useState([])
    const [transactionType, setTransactionType] = useState(0);
    const [currentCompanyType, setCurrentCompanyType] = useState(0);
    const [currency, setCurrency] = useState('тенге');

    const filteredCompanies = useMemo(() => {
        const companies = companyArray.filter(company => {
            if (currentCompanyType === -1) {
                return company;
            }
            return company.type === currentCompanyType;
        }).map(company => {
            return company;
        });
        const totalSum = companies.reduce((a, c) => {
            const currentCurrency = (currency === 'freebee') ? c.total_freebee : c.total_freebee / 2.5;
            return a + currentCurrency;
        }, 0);
        const totalCommission = companies.reduce((a, c) => {
            return a + c.commission_sum;
        }, 0);
        setCommission(totalCommission);
        setTotalSum(totalSum);
        return companies;
    }, [currentCompanyType, startDate, endDate, transactionType, currency, companyArray]);

    useEffect(() => {
        (async () => {
            let params = {
                type: transactionType
            };

            if (startDate && endDate) {
                params.start = moment(startDate).format('YYYY-MM-DD');
                params.end = moment(endDate).format('YYYY-MM-DD')
            }
            params = new URLSearchParams(params).toString();
            await getCompany(params);

        })();
    }, [transactionType]);

    useEffect(() => {
        (async () => {
            if (!(startDate && endDate)) {
                return true;
            }
            const params = new URLSearchParams({
                type: transactionType,
                start: moment(startDate).format('YYYY-MM-DD'),
                end: moment(endDate).format('YYYY-MM-DD')
            }).toString();

            await getCompany(params);
        })();
    }, [startDate, endDate])

    const getCompany = async (params) => {
        let { data } = await Api.companyRead(params);
        console.log(data);
        setCompanyArray(data)
        setCurrentCompanyType(-1);
    }

    /*useEffect(async () => {
        let params = {
            type: transactionType
        };
        params = new URLSearchParams(params).toString();
        await getCompany(params);
    }, [])*/

    return (
        <>
            <Col lg={12} sm={12}>
                <div>
                    <b>Статистика</b>
                    <div className="d-flex w-50pr">
                        <div className="w-50pr">От</div>
                        <div>До</div>
                    </div>
                </div>
                <div>
                    <h4>По дате:</h4>
                    <div className="d-flex w-50pr">
                        <div className="w-50pr">
                            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                        </div>
                        <div className="w-50pr">
                            <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
                        </div>
                    </div>
                    <div className="w-50pr">
                        <h4>Списание/начисление:</h4>
                        <div className="w-50pr">
                            <select name="companyTypeFilter" className='form-control' onChange={e => setTransactionType(+e.target.value)}>
                                {TRANSACTION_TYPES.map((item, key) => {
                                    return <option key={`company-type-${key}`} value={item.id}>{item.name}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="w-50pr">
                        <h4>Валюта:</h4>
                        <div className="w-50pr">
                            <select value={currency} name="companyTypeFilter" className='form-control' onChange={e => setCurrency(e.target.value)}>
                                {CURRENCY_TYPES.map((item, key) => {
                                    return <option key={`company-type-${key}`} value={item}>{item}</option>
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <MainStats totalSum={totalSum} commission={commission} currency={currency}/>
                {role === 'god' && <CompanyCreateForm getCompany={ getCompany } />}
                <div className='mt-4 mt-2'>
                    <h4>Фильтр по типам компаний:</h4>
                    <select name="companyTypeFilter" className='form-control' onChange={e => setCurrentCompanyType(+e.target.value)}>
                        {COMPANY_TYPES.map((item, key) => {
                            return <option key={`company-type-${key}`} value={item.value}>{item.name}</option>
                        })}
                    </select>
                </div>
                <CompanyAllTable companyArray={ filteredCompanies } setCompanyFilteredArray={setCompanyFilteredArray}
                                 companyFilteredArray={companyFilteredArray}
                />
            </Col>
        </>
    )
}

export default Main
