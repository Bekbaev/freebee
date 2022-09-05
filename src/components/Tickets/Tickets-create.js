import React, {useEffect, useMemo, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import Api from '../../api/api'
import CashbackTypes from '../../common/enums/types/cashback_types'
import getUser from "../../getUser";

const TicketsCreate = ({isCompany}) => {
    const [blocked, setBlocked] = useState('')
    const [company, setCompany] = useState([])
    const [count, setCount] = useState(1)
    const [bonus, setBonus] = useState(1)
    const [type, setType] = useState(0)
    const [cashbackPercent, setCashbackPercent] = useState(2)
    const [voidTicket, setVoidTicket] = useState(false)
    const [companyId, setCompanyId] = useState(null);
    const [promocodes, setPromocodes] = useState([]);
    const [promocodeId, setPromocodeId] = useState(null);
    const [user, setUser] = useState(getUser());

    let history = useHistory()


    const currentPromocode = useMemo(() => {
        return promocodes.find(p => p.id == promocodeId);
    }, [promocodeId, promocodes]);

    const hasPromocodes = useMemo(() => {
        return promocodes.length > 0;
    }, [promocodes]);

    useEffect(() => {
        if (type === 3) {
            setBonus(currentPromocode.amount / 2.5)
        }
    }, [promocodeId, type]);


    useEffect(() => {
        if (type === 3) {
            setCompanyId(currentPromocode.company_id);
        }
    }, [type, currentPromocode])


    const chosenCompany = useMemo(() => {
        const id = isCompany ? user.company_id : companyId;
        return company.find(c => c.id == id);
    }, [companyId, company, user, isCompany]);

    const accuralSumFreebee = useMemo(() => {
        return type === 3 ? bonus * 2.5 : bonus / 100 * cashbackPercent * 2.5
    }, [bonus, cashbackPercent]);

    const accuralSumTenge = useMemo(() => {
        return accuralSumFreebee / 2.5;
    }, [accuralSumFreebee]);


    const isEnough = useMemo(() => {
        return parseInt(chosenCompany?.wallet) >= accuralSumFreebee * count;
    }, [accuralSumFreebee, count, chosenCompany]);

    function makeid() {
        var text = ''
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

        for (var i = 0; i < 10; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))

        return text
    }

    const getCompany = async () => {
        let data = await Api.companyList()
        setCompany(data)
        if (!isCompany) {
            setCompanyId(data[0].id);
        } else {
            setCompanyId(user.company_id);
        }
    }

    const getPromocodes = async _ => {
        const data = await Api.activePromocodesList();
        setPromocodes(data.data);
        setPromocodeId(data.data[0]?.id);
    }

    const createTickets = e => {
        e.preventDefault()
        setBlocked('blocked') //Добавляем сабмиту pointer events: none

        const uniq_key = makeid()
        const formData = new FormData(e.currentTarget)
        formData.append('uniq_key', uniq_key)
        formData.append('count', count)
        formData.append('type', type)
        formData.append('cashback_percent', CashbackTypes.find(t => t.value === +cashbackPercent).text);
        formData.append('company_id', companyId);
        const newBonus = ( bonus / 100 ) * cashbackPercent * 2.5;
        if (type !== 3) {
            formData.append('bonus', newBonus)
        } else {
            formData.append('bonus',  bonus);
        }
        if (type === 3) {
            formData.append('company_id', currentPromocode.company_id);
            formData.append('promocode_id', promocodeId);
        }
        Api.ticketsCreate(formData)

        setTimeout(() => {
            history.push(`/ticketsStory/`)
        }, 500)
    }

    useEffect(() => {
        (async () => {
            await getCompany();
            await getPromocodes();
        })();
    }, [])

    return (
        <>
            <ul className="breadcrumb">
                <li>
                    <Link to="/">Главная</Link>
                </li>
                <li>
                    <Link to="/ticketsList">Билеты</Link>
                </li>
                <li className="active">Сгенерировать</li>
            </ul>
            <div className="ticket-generate-form col-lg-4">
                <form id="ticket-generate-form" onSubmit={createTickets}>
                    <div className="form-check ticket-radio">
                        <input className="form-check-input " type="radio" name="flexRadioDefault" defaultChecked
                               onClick={() => {
                                   setVoidTicket(false)
                                   setBonus(0)
                                   setType(0)
                               }
                               }/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Начисление
                        </label>
                    </div>
                    <div className="form-check ticket-radio">
                        <input className="form-check-input " type="radio" name="flexRadioDefault" onClick={() => {
                            setVoidTicket(true)
                            setType(1)
                        }
                        }
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Еженедельный
                        </label>
                    </div>
                    <div className="form-check ticket-radio">
                        <input className="form-check-input " type="radio" name="flexRadioDefault" onClick={() => {
                            setVoidTicket(false)
                            setType(2)
                        }}/>
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Начисление без участия в розыгрыше
                        </label>
                    </div>
                    <div className="form-check ticket-radio">
                        <input className="form-check-input " disabled={!hasPromocodes} type="radio" name="flexRadioDefault" onClick={() => {
                            setVoidTicket(false)
                            setType(3)
                        }}/>
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Промокод {!hasPromocodes && <>(недоступен из-за отсутствия активных промокодов)</>}
                        </label>
                    </div>
                    {(type !== 3 && type !== 1) &&<div className="form-group field-generateform-type required mt-15">
                        <label className="control-label" htmlFor="generateform-type">
                            % кешбека (тенге)
                        </label>
                        <select
                            id="generateform-type"
                            className="form-control"
                            name="cashback_percent"
                            aria-required="true"
                            value={cashbackPercent}
                            onChange={(e) => setCashbackPercent(e.target.value)}
                        >
                            {
                                CashbackTypes.map(el => (
                                    <option key={el.value} value={el.value}>
                                        {el.text}
                                    </option>
                                ))
                            }
                        </select>

                        <div className="help-block"></div>
                    </div> }

                    {
                        (!voidTicket && type !== 3) &&
                        <div className="form-group field-generateform-value required ">
                            <label className="control-label" htmlFor="generateform-value">
                                Сумма пополнения
                            </label>
                            <input
                                type="number"
                                disabled={type === 3}
                                id="generateform-value"
                                className="form-control"
                                name="bonus"
                                value={bonus}
                                onChange={(e) => setBonus(+e.currentTarget.value)}
                                placeholder="Введите размер бонусов"
                                required
                                aria-required="true"
                            />
                        </div>
                    }
                    {(type == 1 || type == 3) ? <></>
                        : <>
                            <p className="text-secondary">{accuralSumFreebee} FreeBee.</p>
                            <p className="text-secondary">{accuralSumTenge} Тенге</p>
                        </>
                    }

                    <div className="form-group field-generateform-count required mt-15">
                        <label className="control-label" htmlFor="generateform-count">
                            Количество билетов
                        </label>
                        <input
                            type="text"
                            id="generateform-count"
                            className="form-control"
                            name="tickets-count"
                            placeholder="Введите количество билетов"
                            aria-required="true"
                            required
                            value={count}
                            onChange={e => setCount(e.currentTarget.value)}
                        />

                        <div className="help-block"></div>
                    </div>
                    <div className="form-group field-generateform-count required mt-15">
                        <label className="control-label" htmlFor="generateform-count">
                            Описание
                        </label>
                        <input
                            type="text"
                            id="generateform-count"
                            className="form-control"
                            name="description"
                        />

                    </div>
                    {!isCompany && type !== 3 && (
                        <div className="form-group field-generateform-type required">
                            <label className="control-label" htmlFor="generateform-type">
                                Компания
                            </label>
                            <select
                                id="generateform-type"
                                className="form-control"
                                name="company_id"
                                aria-required="true"
                                value={companyId}
                                onChange={e => setCompanyId(+e.target.value)}
                            >
                                {company.length > 0 &&
                                company.map(el => (
                                    <option key={el.id} value={el.id}>
                                        {el.name}
                                    </option>
                                ))}
                            </select>

                            <div className="help-block"></div>
                        </div>
                    )}
                    {
                        type === 3 &&
                        <div className='form-group'>
                            <label>Промокод</label>
                            <select className="form-control" value={promocodeId} onChange={e => setPromocodeId(+e.target.value)}>
                                {
                                    promocodes.map(p => {
                                        return <option value={p.id} key={p.promocode}>{ p.promocode } | {p.company.name} | { p.amount } freebee</option>
                                    })
                                }
                            </select>
                        </div>
                    }
                    <p>В кошельке доступно <b className='text-success'>{ chosenCompany?.wallet } freebee / { chosenCompany?.wallet / 2.5 } тенге</b></p>
                    {!voidTicket &&<p>Общее количество бонусов: <b className='text-success'>{ accuralSumFreebee * count } freebee / { accuralSumTenge * count } тенге</b></p>}
                    { !isEnough && !voidTicket &&  <p style={{color: '#f00'}}>В кошельке недостаточно средств для генерации билетов</p> }
                    { isEnough && <div className="form-group">
                        <button type="submit" className={`btn btn-primary ${blocked}`} name="generate-button">
                            Сгенерировать
                        </button>
                    </div> }
                </form>
            </div>
        </>
    )
}

export default TicketsCreate
