import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import useAsyncEffect from 'use-async-effect'
import Api from '../../api/api'
import normalizeDate from '../../normalizeDate'
import CreateMainDraw from './CreateMainDraw'
import {useHistory} from "react-router-dom";

const WeeklyDraw = ({ isCompany }) => {
    const [update, setUpdate] = useState('')
    const [weeklyDraws, setWeeklyDraws] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    let history = useHistory()

    useAsyncEffect(async () => {
        try {
            setLoading(true)

            const { data } = await Api.drawRead(1)
            setWeeklyDraws(data)
        } catch ({ response }) {
            if (response) {
                setError(response.message)
            }
        } finally {
            setLoading(false)
        }
    }, [update])

    const cancelPrank = async id => {
        const formData = new FormData()
        formData.append('id', id)

        try {
            await Api.drawDelete(formData)
            setUpdate(true)
            window.location.reload()
        } catch (e) {
            console.log(e)
        }
    }

    const getWinners = async id => {
        history.push(`/drumDraw/${id}/1`)
    }
    const getWinnersStep = async id => {

        history.push(`/DrawTable/${id}/1`)
    }

    if (loading) {
        return <p>Загрузка...</p>
    } else {
        if (error) {
            return <p>{error}</p>
        }

        if (!weeklyDraws?.length && isCompany) {
            return <CreateMainDraw update={setUpdate} />
        }

        if (!weeklyDraws?.length && !isCompany) {
            return <p>Главные розыгрыши отсутствуют</p>
        }

        return (
            <>
                <ul className="breadcrumb">
                    <li>
                        <a>Главный розыгрыш</a>
                    </li>
                </ul>
                <div className="listContainerWrapper">
                    {weeklyDraws.map(weeklyDraw => (
                        <div style={styles.listContainer} key={weeklyDraw.id}>
                            <div style={styles.banner}>
                                <img
                                    width={64}
                                    className="mr-3"
                                    src={weeklyDraw.banner}
                                    alt={weeklyDraw.title}
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div style={styles.body}>
                                <h3>{weeklyDraw.title}</h3>
                                <div style={styles.listInfo}>
                                    <b style={{ ...styles.marginRight, color: 'green' }}>
                                        Дата проведения - {normalizeDate(weeklyDraw.start_time)}
                                    </b>
                                    <b style={{ ...styles.marginRight, color: 'blue' }}>
                                        Участников - {weeklyDraw.memberUsers}
                                    </b>
                                    <b style={{ ...styles.marginRight, color: 'navy' }}>
                                        Билетов - {weeklyDraw.memberTickets}
                                    </b>
                                </div>
                                {!isCompany && (
                                    <div style={styles.listInfo}>
                                        <b style={styles.marginRight}>
                                            Дата создания - {normalizeDate(weeklyDraw.created_at)}
                                        </b>
                                        <b style={styles.marginRight}>
                                            Компания - {weeklyDraw.company_name || 'Неизвестно'}
                                        </b>
                                    </div>
                                )}
                                <p style={{ whiteSpace: 'pre-line' }}>{weeklyDraw.description.trim()}</p>
                                <table className="table" style={{ marginBottom: 0 }}>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Название приза</th>
                                        <th>Победитель</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {weeklyDraw.prizes.map(({ id, prize_name, winner_name }, index) => (
                                        <tr key={id}>
                                            <td>{index + 1}</td>
                                            <td>{prize_name}</td>
                                            <td>{winner_name || <i>Не определен</i>}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                {isCompany && (
                                    <div style={{ ...styles.flex, marginTop: '1rem' }}>
                                        {
                                            !weeklyDraw.prizes[0].winner_id &&
                                                <>
                                                    {
                                                        weeklyDraw.memberUsers >= weeklyDraw.prizes.length
                                                            ?
                                                            <>
                                                                <Button className="btn btn-success mt-4 w100"
                                                                        style={styles.marginRight}
                                                                        onClick={() => getWinners(weeklyDraw.id)}
                                                                >
                                                                    Список Победителей
                                                                </Button>
                                                                <Button className="btn btn-success mt-4 w100"
                                                                        style={styles.marginRight}
                                                                        onClick={() => getWinnersStep(weeklyDraw.id)}
                                                                >
                                                                    Выбрать победителей
                                                                </Button>
                                                            </>
                                                            :
                                                            <div className="warn block mt-4 w100" style={styles.marginRight}>
                                                                Недостаточно участников
                                                            </div>
                                                    }
                                                </>
                                        }
                                        {/* <Link
                                        to={{
                                            pathname: `/draw/week/${weeklyDraw.id}`,
                                            state: weeklyDraw,
                                        }}
                                    >
                                        <Button style={styles.marginRight}>Редактировать розыгрыш</Button>
                                    </Link> */}
                                        <Button
                                            variant="danger"
                                            style={styles.marginRight}
                                            onClick={() => cancelPrank(weeklyDraw.id)}
                                        >
                                            Отменить розыгрыш
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

            </>
        )
    }
}

const styles = {
    listContainer: {
        marginBottom: '1rem',
        border: '1px solid lightgray',
        overflow: 'hidden',
    },
    flex: {
        display: 'flex',
    },
    banner: {
        position: 'relative',
        width: '100%',
        zIndex: -1,
    },
    body: {
        padding: '2rem',
        zIndex: 1,
    },
    marginRight: {
        marginRight: '1rem',
    },
    listInfo: {
        marginBottom: '1rem',
    },
}

export default WeeklyDraw
