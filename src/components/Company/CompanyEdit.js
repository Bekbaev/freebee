import React, {useEffect, useState} from 'react';
import Api from "../../api/api";
import {useHistory} from 'react-router';
import toast from '../../utils/toastPlugin';
import getRole from "../../getRole";

const role = getRole();

const CompanyEdit = ({match}) => {
    const id = match.params.id
    const [info, setInfo] = useState(null)
    const [cities, setCities] = useState(null)
    const [city, setCity] = useState(-1)
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [hasRefSystem, setHasRefSystem] = useState(false);
    const [branch, setBranch] = useState(false)
    const isGod = role === 'god';

    useEffect(() => {
        (async () => {
            setCities(await Api.citiesRead())
        })()
    }, [])

    let history = useHistory();

    const changeCompanyPassword = async e => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            return toast.error('Пароли не совпадают');
        }
        try {
            const formData = new FormData();
            formData.append('phone', info.admin_phone);
            formData.append('action', 'CHANGE_PASSWORD');
            formData.append('new_password', password);
            formData.append('new_password', password);
            const data = await Api.resetPassword(formData);
            toast.success(data.message);
            setTimeout(() => {
                history.push(`/companyStats/${id}`);
            }, 500);
        } catch (e) {
            console.log(e);
            toast.error(e.response.data.message);
        }
    };

    const deleteCompany = async () => {
        const formData = new FormData()
        formData.append('id', id)
        await Api.companyDelete(formData)
        history.push(`/companyStats/${id}`);
    }

    const sendForm = async(e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        formData.append("id", id)
        formData.append('has_ref_system', hasRefSystem ? '1' : '0');
        const response = await Api.companyUpdate(formData)
        history.push(`/companyStats/${id}`);
    }

    const getCurrentInfo = async () =>{
        const {data} = await Api.getCompany(id)
        setInfo(data)
        setHasRefSystem(data.has_ref_system);
        setCity(data.city)
    }

    const setInfoType = value => {
        setInfo({
            ...info,
            type: value
        })
    }

    const setAccrualType = value => {
        setInfo({
            ...info,
            accrual_type: value
        })
    }

    useEffect(() => {
        if(id){
            (async () => {
                await getCurrentInfo()
            })();
        }
    }, [])

    if(!info){
        return null
    }

    return (
        <>
            <div className="col-lg-4">
                {<form id="registration-form" role="form" onSubmit={sendForm}>
                    <div className="form-group">
                        <label className="control-label">Город</label>
                        <select disabled={!isGod} className="form-control" name="city" value={city} onChange={({currentTarget}) => setCity(currentTarget.value)}>
                            {cities?.data.map(({ name, id }) => (
                                <option value={id} key={id}>
                                    {name}
                                </option>
                            )) || <option>Загрузка...</option>}
                        </select>
                        <p className="help-block help-block-error"></p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Название компании</label>
                        <input disabled={!isGod} type="text" defaultValue={info.name}  id="regForm-сompany" name="name" className="form-control"
                               placeholder="Введите название компании"/>
                        <p className="help-block help-block-error"></p>
                    </div>
                    <div className="form-group">
                        <input disabled={!isGod} className="form-check-input" name="has_ref_system" type="checkbox" checked={hasRefSystem} onChange={() => setHasRefSystem(setHasRefSystem => !setHasRefSystem)} value={hasRefSystem} id="refSystemCheckBox" />
                            <label className="form-check-label" htmlFor="refSystemCheckBox">
                                Участвует в реферальной системе
                            </label>
                    </div>
                    <div className="form-group">
                        <label className="control-label">ФИО (директора)</label>
                        <input disabled={!isGod} type="text" defaultValue={info.director_name} className="form-control" name="director_name"
                               placeholder="Введите ФИО директора"/>
                        <p className="help-block help-block-error"></p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Телефон директора</label>
                        <input disabled={!isGod} type="text" defaultValue={info.director_phone} className="form-control" name="director_phone"
                               placeholder="Введите номер телефона директора"/>
                        <p className="help-block help-block-error"></p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Телефон администратора</label>
                        <input disabled={!isGod} type="text" defaultValue={info.admin_phone} className="form-control" name="admin_phone"
                               placeholder="Введите номер телефона администратора"/>
                        <p className="help-block help-block-error"></p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Телефон бухгалтера</label>
                        <input disabled={!isGod} type="text" defaultValue={info.accountant_phone} className="form-control" name="accountant_phone"
                               placeholder="Введите номер телефона бухгалтера"/>
                        <p className="help-block help-block-error"></p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">E-mail</label>
                        <input disabled={!isGod} type="text" defaultValue={info.email} className="form-control" name="email" placeholder="Введите E-mail"/>
                        <p className="help-block help-block-error"></p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Комиссия (%)</label>
                        <input disabled={!isGod} type="text" defaultValue={info.commission} className="form-control" name="commission"
                               placeholder="Введите комиссию"/>
                        <p className="help-block help-block-error"></p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Процент кэшбека (%)</label>
                        <input disabled={!isGod} type="text" defaultValue={info.cashback_percent} className="form-control" name="cashback_percent"
                               placeholder="Введите процент кэшбека"/>
                        <p className="help-block help-block-error"></p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Тип</label>
                        <select className="form-control" name="type" defaultValue={info.type} onChange={e => setInfoType(e.target.value)} disabled={!isGod}>
                            <option value="1">Компания с возможностью начисления (касса)</option>
                            <option value="2">Компания без возможности начисления (компания-партнер)</option>
                        </select>
                        <p className="help-block help-block-error"></p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Филиал</label>
                        <select className="form-control" name="branch" defaultValue={info.branch} onChange={e => setBranch(e.target.value)} disabled={!isGod}>
                            <option value="0">нет</option>
                            <option value="1">да</option>
                        </select>
                        <p className="help-block help-block-error"></p>
                    </div>
                    {info.type == '1' &&
                    <div className="form-group">
                        <label className="control-label">Начисление</label>
                        <select className="form-control" name="accrual_type"
                                disabled={!isGod}
                                defaultValue={info.accrual_type} onChange={e => setAccrualType(e.target.value)}
                        >
                            <option value="1">Без ручного начисления</option>
                            <option value="3">С ручным начислением</option>
                        </select>
                    </div>
                    }
                    <div className="form-group">
                        <label className="control-label">Списание</label>
                        <select disabled={!isGod} className="form-control" name="write_off_wallet" defaultValue={info.write_off_wallet}>
                            <option value="tenge">Тенге</option>
                            <option value="freebee">FreeBee</option>
                            <option value="all">Тенге и FreeBee</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Ссылка на 2gis</label>
                        <input disabled={!isGod} type="text" defaultValue={info["2gis_url"]} className="form-control" name="2gis_url"
                               placeholder="Введите ссылку на 2gis"/>
                        <p className="help-block help-block-error"></p>
                    </div>
                    {isGod &&
                        <>
                            <div className="form-group">
                                <label htmlFor="logo">Логотип</label>
                                <input type="file" className="form-control-file" name="logo" id="logo" />
                            </div>
                            <input type="submit" className="btn btn-success" value="Сохранить" />
                        </>}
                </form>}
                <form id="resetPasswordForm" className='mt-5'>
                    <div className="form-group">
                        <label className="control-label">Новый пароль</label>
                        <input value={password} onChange={e => setPassword(e.currentTarget.value)} type="password" className="form-control" name="2gis_url"
                               placeholder="Введите новый пароль"/>
                        <p className="help-block help-block-error"></p>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Повторите новый пароль</label>
                        <input value={passwordConfirm} onChange={e => setPasswordConfirm(e.currentTarget.value)} type="password" className="form-control" name="2gis_url"
                               placeholder="Повторите новый пароль"/>
                        <p className="help-block help-block-error"></p>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Изменить пароль" onClick={e => changeCompanyPassword(e)} />
                </form>
            </div>
        </>
    );
};

export default CompanyEdit;
