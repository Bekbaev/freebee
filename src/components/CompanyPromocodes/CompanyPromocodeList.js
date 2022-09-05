import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import getCompanyId from "../../getCompanyId";
import Api from "../../api/api";
import ConfirmationModal from "../Modals/ConfirmationModal";
import toastPlugin from "../../utils/toastPlugin";

const CompanyPromocodeList = () => {
    const companyId = getCompanyId();
    const [promocodes, setPromocodes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [promoId, setPromoId] = useState(null);
    const [msg, setMsg] = useState('');
    const [action, setAction] = useState(null);

    // 1 - завершить
    // 2 - восстанвоить
    // 3 - удалить

    useEffect(() => {
        (async () => {
            const data = await Api.getPromocodes(companyId);
            setPromocodes(data.data);
        })();
    }, []);

    const onSubmit = async () => {
        let data;
        switch (action) {
            case 1:
                data = await Api.closePromocode(promoId);
                setPromocodes(prev => {
                    return prev.map(i => {
                        if (i.id == promoId) {
                            i = data.data;
                        }
                        return i;
                    })
                })
                toastPlugin.success('Промокод завершен');
                break;
            case 2:
                data = await Api.restorePromocode(promoId);
                setPromocodes(prev => {
                    return prev.map(i => {
                        if (i.id == promoId) {
                            i = data.data;
                        }
                        return i;
                    })
                })
                toastPlugin.success('Промокод восстановлен');
                break;
            case 3:
                await Api.deletePromocode(promoId);
                setPromocodes(prev => {
                    return prev.filter(i => i.id != promoId);
                })
                toastPlugin.success('Промокод удален');
                break;
            default:
                break;
        }

        setShowModal(false);
    }

    return (
        <div>
            <h3>Список промокодов</h3>
            <Link to="/promocode/create" tag='button' className='btn btn-success'>
                Создать промокод
            </Link>
            <ConfirmationModal
                message={msg}
                onConfirm={onSubmit}
                show={showModal}
                onCancel={() => {setShowModal(false); setPromoId(null)}}
            />
            <table className="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Промокод</th>
                    <th>Срок действия</th>
                    <th>Сумма, freebee</th>
                    <th>Активировано, шт.</th>
                    <th>Общая сумма, freebee</th>
                    <th>Статус</th>
                    <th>Действие</th>
                </tr>
                </thead>
                <tbody>
                {
                    promocodes.map((p, key) => {
                        return (
                            <tr key={p.id}>
                                <td>
                                    { key + 1 }
                                </td>
                                <td>
                                    { p.promocode }
                                </td>
                                <td>
                                    { p.date_start } / { p.date_end }
                                </td>
                                <td>
                                   <b>{ p.amount }</b> freebee
                                </td>
                                <td>
                                    { p.activated_tickets_count } шт.
                                </td>
                                <td>
                                    <b>{ p.amount * p.activated_tickets_count }</b> freebee
                                </td>
                                <td>
                                    <b className={p.status_id === 1 ? 'text-success' : 'text-danger'}>{ p.status }</b>
                                </td>
                                <td>
                                    <div className='d-flex flex-column flex-grow-1'>
                                        { p.status_id === 1 &&
                                        <>
                                            <button className='btn btn-danger my-2' onClick={() => {
                                                setAction(1);
                                                setMsg('Вы действительно хотите завершить действие промокода?');
                                                setPromoId(p.id);
                                                setShowModal(true);
                                            }}>Завершить</button>
                                        </>}
                                        {p.status_id !== 1 && <button className='btn btn-success my-2' onClick={() => {
                                            setAction(2);
                                            setMsg('Вы действительно хотите восстановить действие промокода?');
                                            setPromoId(p.id);
                                            setShowModal(true);
                                        }}>Восстановить</button>}
                                        <button className='btn btn-danger my-2' onClick={() => {
                                            setAction(3);
                                            setMsg('Вы действительно хотите удалить действие промокод?');
                                            setPromoId(p.id);
                                            setShowModal(true);
                                        }}>Удалить</button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </div>
    );
}

export default CompanyPromocodeList;
