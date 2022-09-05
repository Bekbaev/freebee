import React, {useEffect, useState} from 'react';
import Transaction from "./Transaction";
import Api from "../../api/api";
import getCompanyId from "../../getCompanyId";
import {Link} from "react-router-dom";
import getRole from "../../getRole";

const TransactionAll = ({company}) => {
    const [transaction, setTransaction] = useState(null)
    const [companyId, setCompanyId] = useState(getCompanyId);
    const [companyData, setCompanyData] = useState(null);
    const [pagination, setPagination] = useState(false);

    useState(() => {
        if (companyId !== -1 && getRole() !== 'god') {
            (async () => {
                const { data } = await Api.getCompany(companyId);
                setCompanyData(data);
            })();
        }
    }, [companyId]);

    const getTransaction = async (page = 1) =>{
        const {data} = await Api.transactionRead(null, page);
        setTransaction(data.data);
        setPagination(data);
    }
    useEffect(() => {
        (async () => {
            await getTransaction();
        })();
    }, [])

    return (
        <div>
            <h2>Транзакции</h2>
            { companyData &&
                <div>
                    <h3>Кошелек:</h3>
                    <h4><b>{ companyData.wallet }</b> frebee</h4>
                    <h4><b>{ companyData.wallet / 2.5 }</b> frebee</h4>
                    <Link to={`/wallet/info/`}>
                        <button className='btn btn-success'>
                            История кошелька
                        </button>
                    </Link>
                </div>
            }
            {pagination && <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item" onClick={() => getTransaction(pagination.current_page - 1)}>
                        <a className="page-link" href="#">Назад</a>
                    </li>
                    {
                        Array(pagination.last_page).fill({}).map((_, key) => {
                            return (<li className={(key + 1) === pagination.current_page ? 'page-item active' : 'page-item'} onClick={() => getTransaction(key + 1)}><a className="page-link" href="#">{key + 1}</a></li>);
                        })
                    }
                    <li className="page-item" onClick={() => getTransaction(pagination.current_page + 1)}>
                        <a className="page-link" href="#">Вперед</a>
                    </li>
                </ul>
            </nav>}
            {transaction && <Transaction onPaginate={() => getTransaction} transaction={ transaction } close={true} isCompany={company} pagination={pagination} />}
        </div>
    );
};

export default TransactionAll;
