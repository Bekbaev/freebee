import React, {useEffect, useState} from 'react';
import Api from "../../api/api";
import normalizeDate from "../../normalizeDate";
import Transaction from "../Transaction/Transaction";
import {Link, useHistory} from "react-router-dom";
import getRole from "../../getRole";
import {Modal, Button, Form} from "react-bootstrap";
import ConfirmationModal from "../Modals/ConfirmationModal";

const ClientsView = ({match}) => {
    const isGod = getRole() === 'god';
    const canDelete = (getRole() === 'god' || getRole() === 'company');
    const id = match.params.id
    const [info, setInfo] = useState(false)
    const [userId, setUserId] = useState(null);
    const [transaction, setTransaction] = useState(null)
    const [showModal, setShowModal] = useState(false);
    let history = useHistory();

    const handleConfirm = async () => {
        const formData = new FormData()
        formData.append('id', id)
        await Api.clientsDelete(id)
        history.push(`/clients/`)
    }

    const getClient = async () => {
        let {data} = await Api.clientsReadOne(id)
        setInfo(data)
    }

    const getTransaction = async () => {
        const {data} = await Api.transactionRead()
        const transactionArray = data.filter(el => el.client_id == id)
        setTransaction(transactionArray)
    }


    const deleteManager = async () => {
        setShowModal(true);
        //const formData = new FormData()
        //formData.append('id', id)
        //await Api.clientsDelete(id)
        //history.push(`/clients/`)
    }
    useEffect(() => {
        getClient()
        getTransaction()
    }, [])

    if (!info) {
        return (
            <p>Загрузка...</p>
        )
    }

    return (
        <>
            <ConfirmationModal
                show={showModal}
                message="Вы действительно хотите удалить выбранного пользователя?"
                onCancel={() => setShowModal(false)}
                onConfirm={handleConfirm}
            />
            <div className="mb-20">
                {isGod && <Link to={`/clientUpdate/${id}`}>
                    <div className="btn btn-primary">Изменить</div>
                </Link>}
                {canDelete &&
                <span onClick={deleteManager} className='ml-1'>
                        <div className="btn btn-danger">Удалить</div>
                    </span>}
            </div>
            <table className="table table-striped table-bordered">
                <tbody>

                <tr>
                    <th>Имя</th>
                    <td>{info.name}</td>
                </tr>
                <tr>
                    <th>Фамилия</th>
                    <td>{info.surname}</td>
                </tr>
                {isGod && <tr>
                    <th>Номер</th>
                    <td>{info.login}</td>
                </tr>}


              {/*  <tr>
                    <th>Email</th>
                    <td>{info.email}</td>
                </tr>*/}
                {isGod &&  <tr>
                    <th>Баланс (fb)</th>
                    <td>{info.balance}</td>
                </tr>
                }

                {isGod && <tr>
                    <th>Баланс (тг)</th>
                    <td>{info.balance / 2.5}</td>
                </tr>}
                {isGod && <tr>
                    <th>Логин Олимп</th>
                    <td>{info.olimp_login}</td>
                </tr>}

                {/*<tr>*/}
                {/*    <th>Дата регистрации</th>*/}
                {/*    <td>{info.created_by && info.created_by}</td>*/}
                {/*</tr>*/}
                </tbody>
            </table>
            <p><b>Таблица транзакций</b></p>
            <table className="table table-striped">
                {transaction && <Transaction transaction={transaction}/>}
            </table>
        </>
    );
};

export default ClientsView;
