import React, {useEffect, useState, useRef} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Api from "../../api/api";
import ConfirmationModal from "../Modals/ConfirmationModal";
import toastPlugin from "../../utils/toastPlugin";
import MaterialIcon from "react-google-material-icons";
import getCompanyId from "../../getCompanyId";
const WalletInfo = () => {
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [transactionId, setTransactionId] = useState(null);
    const inputRef = useRef(null);
    const history = useHistory();

    useEffect(() => {
        (async () => {
            const needleId = getCompanyId() === -1 ? id : getCompanyId();
            const { data } = await Api.companyWalletIndex(needleId);
            setCompany(data);
        })();
    }, []);

    const onDelete = async () => {
        setModalShow(false);
        await Api.deleteWalletTransaction(transactionId);
        setCompany(prev => {
            const transaction = prev.wallet_transactions.find(t => t.id == transactionId);
            return {
                ...prev,
                wallet: prev.wallet - transaction.amount,
                wallet_transactions: prev.wallet_transactions.filter(t => t.id !== transactionId)
            }
        })
        setTransactionId(null);
        toastPlugin.success('Транзакция удалена');
    }

    const onCheckUploaded = async e => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('receipt', file);
        const { data } = await Api.bindWalletReceipt(formData, transactionId);
        setCompany(prev => {
            return {
                ...prev,
                wallet_transactions: prev.wallet_transactions.map(t => {
                    if (t.id == data.id) {
                        t = { ...data };
                    }
                    return t;
                })
            }
        })
        setTransactionId(null);
    }

    return (
        <div>
            <input type="file" ref={inputRef} className='d-none' onChange={onCheckUploaded}/>
            <h3>Информация о кошельке</h3>
            <ConfirmationModal
                message='Вы действительно хотите отменить выбранное пополнение?'
                onConfirm={onDelete}
                show={modalShow}
                onCancel={() => {setModalShow(false); setTransactionId(null)}}
            />
            { company &&
            <>
                <h4>Компания: { company.name }</h4>
                <h4>Текущий кошелек: { company.wallet } frebee / { company.wallet / 2.5 } тенге</h4>
            </>
            }
            <table className="table my-4">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Дата</th>
                    <th>Сумма, freebee</th>
                    <th>Сумма, тенге</th>
                    <th>Статус</th>
                    <th>Действие</th>
                </tr>
                </thead>
                <tbody>
                { company && company.wallet_transactions.map((transaction, idx) => {
                    return (
                        <tr key={transaction.date}>
                            <td>{ idx + 1 }</td>
                            <td>{ transaction.date }</td>
                            <td>{ (transaction.amount).toFixed(2) } freebee</td>
                            <td>{ (transaction.amount / 2.5).toFixed(2) } тенге</td>
                            <td className='d-flex'>
                                <span>{ transaction.receipt ? <p className='text-success'>Оплачено</p> : <p className="text-danger">Не оплачено</p>}</span>
                                { transaction.receipt && <a href={transaction.receipt} target="_blank" className='text-decoration-none ml-2'><MaterialIcon icon="get_app" size={18}  /></a> }
                            </td>
                            <td>

                                {!transaction.receipt &&
                                <div className='d-flex flex-column'>
                                    <button className="btn btn-success" onClick={() => {setTransactionId(transaction.id); inputRef.current.click();}}>
                                        Прикрепить чек
                                    </button>
                                    <button className="btn btn-danger mt-3" onClick={() => {setTransactionId(transaction.id); setModalShow(true)}}>
                                        Отменить пополнение
                                    </button>
                                </div>}
                            </td>
                        </tr>
                    );
                }) }
                </tbody>
            </table>
            { company && company.wallet_transactions.length === 0 && <p>Начисления отсутствуют</p> }
        </div>
    );
}

export default WalletInfo;
