import React, {useEffect, useState} from 'react';
import Api from "../../api/api";
import Transaction from "../Transaction/Transaction";
import {Link, useHistory, useParams} from "react-router-dom";
import normalizeDate from "../../normalizeDate";
import {load} from "@fingerprintjs/fingerprintjs";
import toastPlugin from "../../utils/toastPlugin";
import ConfirmationModal from "../Modals/ConfirmationModal";

const ManagerView = ({match}) => {
    const { id } = useParams();
    const [managerInfo, setManagerInfo] = useState(null)
    const [transaction, setTransaction] = useState(null)
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [pagination, setPagination] = useState(false);
    let history = useHistory()

    const getTransaction = async () => {
        const {data} = await Api.getManagersTransactions(id);
        setPagination(data);
        setTransaction(data.data)
    }

    const getManager = async () => {
        let {data} = await Api.userReadById(id);
        if (data === null) {
            toastPlugin.error('Информация по пользователю недоступна, возможно он был удален!');
            history.push('/manager/');
            return false;
        }
        setManagerInfo(data)
    }

    const handleConfirm = async () => {
        const formData = new FormData()
        formData.append("id", id)
        await Api.userDelete(formData)
        toastPlugin.success('Менеджер удален!')
        setTimeout(() => {
            history.push(`/manager/`)
        }, 300)
    }

    const deleteManager = () => {
        setShowModal(true);
    }

    useEffect(() => {
        (async () => {
            await getManager();
            await getTransaction();
            setLoading(false);
        })();
    }, [])

    if (loading) {
        return (<p>Загрузка</p>)
    }

    return (
        !managerInfo ? <></>
            : <>
                <ConfirmationModal
                    show={showModal}
                    message="Вы действительно хотите удалить выбранного менеджера?"
                    onCancel={() => setShowModal(false)}
                    onConfirm={handleConfirm}
                />
                <div className="mb-20">
                    <span>
                        <Link to={`/managerUpdate/${id}`} className="btn btn-primary">Изменить</Link>
                    </span>
                    <span onClick={deleteManager}>
                        <div className="btn btn-danger ml-1">Удалить</div>
                    </span>
                </div>
                <table className="table table-striped table-bordered">
                    <tbody>
                    <tr>
                        <th>Дата регистрации</th>
                        <td>{normalizeDate(managerInfo.updated_at)}</td>
                    </tr>
                    <tr>
                        <th>Имя</th>
                        <td>{managerInfo.name}</td>
                    </tr>
                    <tr>
                        <th>Телефон</th>
                        <td>{managerInfo.login}</td>
                    </tr>
                    <tr>
                        <th>Город</th>
                        <td>{managerInfo.city}</td>
                    </tr>
                    <tr>
                        <th>Компания</th>
                        <td>{managerInfo.company_name}</td>
                    </tr>
                    <tr>
                        <th>Должность</th>
                        <td>{managerInfo.label}</td>
                    </tr>
                    <tr>
                        <th>Пополнение</th>
                        <td>{managerInfo.accrual == 1
                            ? "без возможности начисления"
                            : "С возможностью начисления"
                        }</td>
                    </tr>
                    <tr>
                        <th>Списание</th>
                        <td>{managerInfo.write_off_wallet == "all"
                            ? 'Тенге и FreeBee'
                            : managerInfo.write_off_wallet
                        }</td>
                    </tr>
                    </tbody>
                </table>
                <p><b>Таблица транзакций</b></p>
                {transaction && <Transaction transaction={transaction} pagination={pagination}/>}
            </>
    );
};

export default ManagerView;
