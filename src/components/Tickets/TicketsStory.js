import React, {useEffect, useState} from 'react';
import normalizeDate from "../../normalizeDate";
import Api from "../../api/api";
import {Link} from "react-router-dom";
import MaterialIcon from "react-google-material-icons";
import getRole from "../../getRole";
import ConfirmationModal from "../Modals/ConfirmationModal";
import toastPlugin from "../../utils/toastPlugin";

const isGod = getRole() === 'god';

const TicketsStory = () => {
    const [managers, setManagers] = useState(false)
    const [modalShow, setModalShow] = useState(false);
    const [uniqKey, setUniqKey] = useState(null);

    const getManagers = async () => {
        let {data} = await Api.history()
        data.reverse()
        setManagers(data)
    }

    const onDelete = async () => {
        if (uniqKey) {
            try {
                await Api.ticketDeleteByUniq(uniqKey);
                toastPlugin.success('Билет успешно удален');
                const newTickets = managers.filter(m => m.uniq_key !== uniqKey);
                setManagers(newTickets);
            } catch (e) {
                toastPlugin.error('При удалении билета произошла ошибка');
            } finally {
                setUniqKey(null);
                setModalShow(false);
            }
        }
    }

    useEffect(() => {
        (async () => {
            await getManagers()
        })()
    }, [])

    const handleOnModal = (e, key) => {
        e.preventDefault();
        setUniqKey(key);
        setModalShow(true);
    }

    return (
        <div>
            <ConfirmationModal
                message='Вы действительно хотите удалить выбранный билет?'
                onConfirm={onDelete}
                show={modalShow}
                onCancel={() => {setModalShow(false); setUniqKey(null)}}
            />
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Количество</th>
                    <th>Тип</th>
                    <th>Активированных</th>
                    <th>Сумма одного билета</th>
                    <th>Общая сумма</th>
                    <th>% Кэшбека</th>
                    <th>Компания</th>
                    <th>Время</th>
                    <th>Скачать</th>
                    {isGod && <th>Удалить</th>}
                </tr>
                </thead>
                <tfoot>
                </tfoot>
                <tbody>
                {managers && managers.map(el => <TableItem key={el.id} {...el} onModal={handleOnModal} />)}
                </tbody>
            </table>
        </div>
    );
};

const TableItem = (props) => {
    //const [activedTickets, setActivedTickets] = useState(null)
    //const [allTickets, setAllTickets] = useState([])

    /*const getTickets = async () => {
        let {data} = await Api.ticketsReadUniqKey(props.uniq_key)
        setAllTickets(data)
    }*/


    const downloadQr = async (ticket) => {
        const formData = new FormData()
        formData.append("code", ticket.code)
        const { qr } = await Api.getQr(formData)
        const link = document.createElement('a');
        link.href = qr;
        link.setAttribute(
            'download',
            `${ticket.id}qr.jpg`,
        );
        link.click();
    }


    /*const downloadAll = async () => {
        let {data} = await Api.ticketsReadUniqKey(props.uniq_key)
        data.map(el => {
            downloadQr(el)
        })
    }*/


    useEffect(()=>{
        (async() => {
            // await getTickets();
        })()
    }, [])

    let type = 'Начисление'
    if(props.type == 1){
        type = 'Пустышка'
    }else if (props.type == 2){
        type = 'Начисление без уч.в розыгрыше'
    }

    if (props.type == 3) {
        type = 'Промокод'
    }

    return (
        <>
            <tr>
                <td>{props.count}</td>
                <td>{type}</td>
                <td>{props.active}</td>
                <td>{props.sum > 0 && props.sum}</td>
                <td>{props.totalSum > 0 && props.totalSum}</td>
                <td>{props.cashback_percent}</td>
                <td>{props.company_name}</td>
                <td>{normalizeDate(props.time)}</td>
                <td className="color-blue d-flex align-items-center">
                    <div>
                        <Link to={`/ticketStoryList/${props.uniq_key}`}>Подробнее</Link>
                    </div>
                    <div className='color-blue ml-3'>
                        <Link to={`/ticketsPrint/${props.uniq_key}`}>
                            <MaterialIcon icon="get_app" size={18}  />
                        </Link>
                    </div>
                </td>
                {isGod && <td>
                     <div className='color-red'>
                        <a href="#" onClick={e => props.onModal(e, props.uniq_key)} style={{color: '#ec1c1c'}}>
                            <MaterialIcon icon="delete" size={18} />
                        </a>
                    </div>
                </td>}
            </tr>
        </>
    );
};

export default TicketsStory;
