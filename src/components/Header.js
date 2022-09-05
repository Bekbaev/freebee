import React, {useEffect, useState} from 'react'
import {Dropdown, DropdownButton} from 'react-bootstrap'
import MaterialIcon from 'react-google-material-icons'
import {Link, useHistory} from 'react-router-dom'
import getName from '../getName'
import getRole from '../getRole'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Api from "../api/api";
import getCompanyId from "../getCompanyId";


const role = getRole()
const name = getName()
const companyId = getCompanyId()

const Header = ({match}) => {
    const path = match.params.url
    const [links, setLinks] = useState(null)
    let history = useHistory()
    const [showCompanyAccrual, setShowCompanyAccrual] = useState(false)

    const getAccrualType = async () => {
        const {data} = await Api.getAccrualType()
        if (data === 3) {
            setShowCompanyAccrual(true)
        }
    }
    const getAccrualTypeUser = async () => {
        const {data} = await Api.getAccrualTypeUser()

        if (data === 3) {
            setShowCompanyAccrual(true)
        }
    }

    const logout = () => {
        localStorage.access_token = ''
        window.location.reload()
    }

    const changeUrl = (url) => {
        history.push(`/${url}/`)
    }

    useEffect(() => {
        switch (role) {
            case 'god':
                setLinks(
                    <>
                        {/*<li>*/}
                        {/*    <Link to="/events/">*/}
                        {/*        <span className="glyphicon glyphicon-tasks"></span>&nbsp;&nbsp;События*/}
                        {/*    </Link>*/}
                        {/*</li>*/}
                        <li className="dropdown">
                            <DropdownButton className="header-dropdown" title="Билеты">
                                {/*<Dropdown.Item className="dropdown-item" onClick={() => {*/}
                                {/*    changeUrl('ticketsList')*/}
                                {/*}}>*/}
                                {/*    Список*/}
                                {/*</Dropdown.Item>*/}
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('ticketsCreate')
                                }}>
                                    Сгенерировать новые
                                </Dropdown.Item>
                                {/*<Dropdown.Item className="dropdown-item" onClick={() => {*/}
                                {/*    changeUrl('ticketsUnactivated')*/}
                                {/*}}>*/}
                                {/*    Неактивированные*/}
                                {/*</Dropdown.Item>*/}
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('ticketsStory')
                                }}>
                                    Список
                                </Dropdown.Item>
                            </DropdownButton>
                        </li>
                        <li className="dropdown">
                            <DropdownButton className="header-dropdown" title="Розыгрыши">
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('draw/week')
                                }}>
                                    Еженедельный
                                </Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('draw/main')
                                }}>
                                    Главный
                                </Dropdown.Item>
                                {/* <Dropdown.Item className="dropdown-item"                                     Окно розыгрыша
                                </Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"                                     Призы
                                </Dropdown.Item> */}
                            </DropdownButton>
                        </li>
                        <li className="dropdown">
                            <DropdownButton className="header-dropdown" title="Платежи">
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('writeoff')
                                }}>
                                    Списание
                                </Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('accrual')
                                }}>
                                    Начисление
                                </Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('wallet/index')
                                }}>
                                    Кошелек
                                </Dropdown.Item>
                            </DropdownButton>
                        </li>
                        <li className="dropdown">
                            <DropdownButton className="header-dropdown" title="Правила">
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('competitionRules')
                                }}>
                                    Справка
                                </Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('drawRules')
                                }}>
                                    Розыгрыш
                                </Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('referenceRules')
                                }}>
                                    Конкурс
                                </Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('balanceRules')
                                }}>
                                    Баланс
                                </Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('referralRules')
                                }}>
                                    Приведи друга
                                </Dropdown.Item>
                            </DropdownButton>
                        </li>

                        <li className="dropdown">
                            <DropdownButton className="header-dropdown" title="Сервис">
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('clients')
                                }}>
                                    Пользователи
                                </Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('manager')
                                }}>
                                    Менеджеры
                                </Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('ref/list')
                                }}>
                                    Реф. система
                                </Dropdown.Item>
                            </DropdownButton>
                        </li>
                        <li className="dropdown">
                            <DropdownButton className="header-dropdown" title="Транзакции">
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('transactionAll')
                                }}>
                                    Транзакции
                                </Dropdown.Item>
                                {/*<Dropdown.Item className="dropdown-item" onClick={() => {*/}
                                {/*    changeUrl('transactionHist')*/}
                                {/*}}>*/}
                                {/*    Оплаченные транзакции*/}
                                {/*</Dropdown.Item>*/}
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('transactionCollections')
                                }}>
                                    Прикрепленные чеки
                                </Dropdown.Item>
                            </DropdownButton>
                        </li>
                        <li className="dropdown">
                            <DropdownButton className="header-dropdown" title="Договоры">
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('condition/public')
                                }}>
                                    Публичная оферта
                                </Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('condition/other')
                                }}>
                                    Другое
                                </Dropdown.Item>
                            </DropdownButton>
                        </li>
                        <li className="dropdown">
                            <DropdownButton className="header-dropdown" title="Промокоды">
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('promocode/list')
                                }}>
                                    Список
                                </Dropdown.Item>
                            </DropdownButton>
                        </li>
                    </>
                )
                break
            case 'accountant':
                setLinks(
                    <>
                        <li className="dropdown">
                            <DropdownButton className="header-dropdown" title="Транзакции">
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    //changeUrl('')
                                }}>
                                    <Link to={'/'}>Транзакции</Link>
                                </Dropdown.Item>
                                {/*<Dropdown.Item className="dropdown-item" onClick={() => {*/}
                                {/*    changeUrl('transactionHist')*/}
                                {/*}}>*/}
                                {/*    Оплаченные транзакции*/}
                                {/*</Dropdown.Item>*/}
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('transactionCollections')
                                }}>
                                    Прикрепленные чеки
                                </Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('ref/list')
                                }}>
                                    Реф. система
                                </Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('wallet/index')
                                }}>
                                    Кошелек
                                </Dropdown.Item>
                            </DropdownButton>
                        </li>
                    </>
                )
                break
            case 'company':
                setLinks(
                    <>
                        <li className="dropdown">
                            <DropdownButton className="header-dropdown" title="Розыгрыши">
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('draw/week')
                                }}>
                                    Еженедельный
                                </Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('draw/main')
                                }}>
                                    Главный
                                </Dropdown.Item>
                            </DropdownButton>
                        </li>
                        <li className="dropdown">
                            <DropdownButton className="header-dropdown" title="Билеты">
                                {/*<Dropdown.Item className="dropdown-item" onClick={() => {*/}
                                {/*    changeUrl('ticketsList')*/}
                                {/*}}>*/}
                                {/*    Список*/}
                                {/*</Dropdown.Item>*/}
                                {/*<Dropdown.Item className="dropdown-item" onClick={() => {*/}
                                {/*    changeUrl('ticketsUnactivated')*/}
                                {/*}}>*/}
                                {/*    Неактивированные*/}
                                {/*</Dropdown.Item>*/}
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('ticketsStory')
                                }}>
                                    Список
                                </Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('ticketsCreate')
                                }}>
                                    Сгенерировать
                                </Dropdown.Item>
                            </DropdownButton>
                        </li>
                        <li className="dropdown">
                            <DropdownButton className="header-dropdown" title="Сервис">
                                <Dropdown.Item className="dropdown-item " onClick={() => {
                                    changeUrl('manager')
                                }}>
                                    Менеджеры
                                </Dropdown.Item>
                                <Dropdown.Item className="dropdown-item " onClick={() => {
                                    changeUrl('clients')
                                }}>
                                    Клиенты
                                </Dropdown.Item>
                            </DropdownButton>
                        </li>

                        <li className="dropdown">
                            <DropdownButton className="header-dropdown" title="Платежи">
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('writeoff')
                                }}>
                                    Списание
                                </Dropdown.Item>
                                {showCompanyAccrual &&
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('accrual')
                                }}>
                                    Начисление
                                </Dropdown.Item>
                                }
                            </DropdownButton>
                        </li>
                        <li className="dropdown">
                            <DropdownButton className="header-dropdown" title="Настройки">
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl(`companyEdit/${companyId}`)
                                }}>
                                    Настройки
                                </Dropdown.Item>
                            </DropdownButton>
                        </li>
                        <li className="dropdown">
                            <DropdownButton className="header-dropdown" title="Промокоды">
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('promocode/list')
                                }}>
                                    Список
                                </Dropdown.Item>
                            </DropdownButton>
                        </li>
                    </>
                )
                break
            case 'partner':
                setLinks(
                    <>
                        <li className="dropdown">
                            <DropdownButton className="header-dropdown" title="Сервис">
                                <Dropdown.Item className="dropdown-item " onClick={() => {
                                    changeUrl('writeoff')
                                }}>
                                    Списание
                                </Dropdown.Item>
                                <Dropdown.Item className="dropdown-item " onClick={() => {
                                    changeUrl('manager')
                                }}>
                                    Менеджеры
                                </Dropdown.Item>
                              {/*  <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('transactionAll')
                                }}>
                                    Транзакции
                                </Dropdown.Item>*/}
                            </DropdownButton>
                        </li>
                        <li className="dropdown">
                            <DropdownButton className="header-dropdown" title="Настройки">
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl(`companyEdit/${companyId}`)
                                }}>
                                    Настройки
                                </Dropdown.Item>
                            </DropdownButton>
                        </li>
                    </>
                )
                break
            case 'employee':
                setLinks(
                    <>
                        <li className="dropdown">
                            <DropdownButton className="header-dropdown" title="Сервис">
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('writeoff')
                                }}>
                                    Списание
                                </Dropdown.Item>
                                {showCompanyAccrual &&
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('accrual')
                                }}>
                                    Начисление
                                </Dropdown.Item>
                                }
                                <Dropdown.Item className="dropdown-item" onClick={() => {
                                    changeUrl('transactionAll')
                                }}>
                                    Транзакции
                                </Dropdown.Item>
                                <Dropdown.Item className="dropdown-item " onClick={() => {
                                    changeUrl('clients')
                                }}>
                                    Клиенты
                                </Dropdown.Item>
                            </DropdownButton>
                        </li>

                    </>
                )
                break
            default:
                setLinks(null)
                logout()
        }

        if (role === 'company') {
            getAccrualType()
        }
        if (role === 'employee') {
            getAccrualTypeUser()
        }
    }, [showCompanyAccrual])

    if (path == "ticketsPrint" || path == "drumDraw" || path == "DrawTable" || path == 'drum') {
        return (
            <></>
        )
    }

    return (
        // <nav id="w0" className="navbar-inverse navbar-fixed-top navbar" role="navigation">
        //     <div className="container">
        //         <div className="navbar-header">
        //             <Link to="/" className="navbar-brand">
        //                 FreeBee
        //             </Link>
        //             <ul id="w1" className="navbar-nav navnav navbar-right nav">
        //                 {links}
        //                 <li>
        //                     <a onClick={logout} className="flex">
        //                         <MaterialIcon icon="login " size={18} />
        //                         Выйти ({name})
        //                     </a>
        //                 </li>
        //             </ul>
        //         </div>
        //     </div>
        // </nav>
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/" style={{color: "#ffffff", fontWeight: 600}}>FreeBee</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {links}
                </Nav>
                <div onClick={logout} className="flex logoutHeader">
                    <MaterialIcon icon="login " size={18}/>
                    Выйти ({name})
                </div>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header
