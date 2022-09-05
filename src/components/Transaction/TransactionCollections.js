import React, {useEffect, useState} from 'react';
import Api from "../../api/api";
import {Link} from "react-router-dom";
import normalizeDate from "../../normalizeDate";

const TransactionCollections = () => {
    const [managers, setManagers] = useState(false)

    const getManagers = async () => {
        let { data } = await Api.receiptCollections();
        if (data.length) {
            setManagers(data.reverse())
        }
    }

    useEffect(() => {
        getManagers()
    }, [])

    return (
        <div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>id</th>
                    <th>Дата создания</th>
                    <th>Компания</th>
                </tr>
                </thead>
                <tfoot>
                </tfoot>
                <tbody>
                {managers && managers.map(el => <TableItem key={el.id} {...el} />)}
                </tbody>
            </table>
        </div>
    );
};

const TableItem = (props) => {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{normalizeDate(props.created_at)}</td>
            <td> {props.company_name}</td>
            <td className="color-blue">
                <Link to={`/collections/${props.id}`}>
                    Подробнее
                </Link>
            </td>
        </tr>
    );
};

export default TransactionCollections;