import React from 'react'
import { Link } from 'react-router-dom'
import CompanyAllTableSort from './CompanyAllTableSort'
import MaterialIcon from "react-google-material-icons";
import formatPrice from "../../utils/formatPrice";

const CompanyAllTable = ({ companyArray, setCompanyFilteredArray, companyFilteredArray }) => {
    return (
        <>
            <table className="table table-striped mt-15">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Город</th>
                        <th>Название (компании)</th>
                        <th>Сумма транзакций</th>
                        <th>Комиссия</th>
                        <th>Тип компании</th>
                        <th>Кошелек</th>
                        <th>&nbsp;</th>
                    </tr>
                    <tr>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                        <th>
                            <div className="d-flex">
                                <div className="w-50pr">FreeBee</div>
                                <div className="w-50pr">Тенге</div>
                            </div>
                        </th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                    </tr>

                    <CompanyAllTableSort
                        companyArray={companyArray}
                        setCompanyFilteredArray={setCompanyFilteredArray}
                    />
                </thead>
                <tbody>
                    {companyFilteredArray.length > 0
                        ? companyFilteredArray.map(el => <CompanyStatsTableItem key={el.id} {...el} />)
                        : companyArray && companyArray.map(el => <CompanyStatsTableItem key={el.id} {...el} />)}
                </tbody>
            </table>
        </>
    )
}

const CompanyStatsTableItem = props => (
    <tr>
        <td>{props.id}</td>
        <td>{props.city}</td>
        <td>{props.name}</td>
        <td>
            <div className="d-flex">
                <div className="w-50pr">{formatPrice(props.total_freebee)}</div>
                <div className="w-50pr">{formatPrice(props.total_freebee / 2.5)}</div>
            </div>
        </td>
        <td>{formatPrice(props.commission_sum)}</td>
        <td>{props.type_text}</td>
        <td>
            <b>{ props.wallet }</b> frebee / <b>{ props.wallet / 2.5 }</b> тенге
        </td>
        <td>
            <Link to={`/companyStats/${props.id}`} title="Просмотр" aria-label="Просмотр" data-pjax="0">
                <MaterialIcon icon="remove_red_eye" size={18} />
            </Link>
        </td>
    </tr>
)

export default CompanyAllTable
