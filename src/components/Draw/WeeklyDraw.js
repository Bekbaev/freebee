import React, {useState} from 'react'
import {Button, Col, Row} from 'react-bootstrap'
import useAsyncEffect from 'use-async-effect'
import Api from '../../api/api'
import normalizeDate from '../../normalizeDate'
import CreateWeeklyDraw from './CreateWeeklyDraw'
import {useHistory} from "react-router-dom";

const WeeklyDraw = ({isCompany}) => {
    const [update, setUpdate] = useState('')
    const [weeklyDraws, setWeeklyDraws] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    let history = useHistory()

    useAsyncEffect(async () => {
        try {
            setLoading(true);
            const {data} = await Api.drawRead(0);
            setWeeklyDraws(data.filter(({type}) => type === 0))
        } catch ({response}) {
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
        } catch (e) {
            console.log(e)
        }
    }

    const getWinners = (id) => {
        history.push(`/drumDraw/${id}/0`)
    }
    const getWinnersStep = (id) => {
        history.push(`/DrawTable/${id}/0`)
    }

    if (loading) {
        return <p>Загрузка...</p>
    } else {
        if (error) {
            return <p>{error}</p>
        }

        if (!weeklyDraws?.length && isCompany) {
            return <CreateWeeklyDraw update={setUpdate}/>
        }

        if (!weeklyDraws?.length && !isCompany) {
            return <p>Еженедельные розыгрыши отсутствуют</p>
        }

        return (
            <>
                <ul className="breadcrumb">
                    <li>
                        <a>Еженедельный розыгрыш</a>
                    </li>
                </ul>
                <div className="listContainerWrapper">
                    {weeklyDraws.map(
                        ({
                             banner,
                             company_name,
                             created_at,
                             description,
                             id,
                             start_time,
                             title,
                             prizes,
                             memberUsers,
                             memberTickets,
                         }) => (
                            <div style={styles.listContainer} key={id}>
                                <div style={styles.banner}>
                                    <img width={64} className="mr-3" src={banner} alt={title}
                                         style={{width: '100%', height: 240}}/>
                                </div>
                                <div style={styles.body}>
                                    <h3>{title}</h3>
                                    <div style={styles.listInfo}>
                                        {start_time > 0 && <b style={{...styles.marginRight, color: 'green'}}>
                                            Дата проведения - {normalizeDate(start_time)}
                                        </b>}
                                        <b style={{...styles.marginRight, color: 'blue'}}>
                                            Участников - {memberUsers}
                                        </b>
                                        <b style={{...styles.marginRight, color: 'navy'}}>Билетов
                                            - {memberTickets}</b>
                                    </div>
                                    {!isCompany && (
                                        <div style={styles.listInfo}>
                                            <b style={styles.marginRight}>Дата создания
                                                - {normalizeDate(created_at)}</b>
                                            <b style={styles.marginRight}>Компания
                                                - {company_name || 'Неизвестно'}</b>
                                        </div>
                                    )}
                                    <p style={{whiteSpace: 'pre-line'}}>{description.trim()}</p>
                                    <table className="table" style={{marginBottom: 0}}>
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Название приза</th>
                                            <th>Победитель</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {prizes.map(({id, prize_name, winner_name}, index) => (
                                            <tr key={id}>
                                                <td>{index + 1}</td>
                                                <td>{prize_name}</td>
                                                <td>{winner_name || <i>Не определен</i>}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                    {isCompany && (
                                        <div style={{marginTop: '1rem'}}>
                                            {
                                                !prizes[0].winner_id &&
                                                <>
                                                    {
                                                        memberUsers >= prizes.length
                                                            ?
                                                            <>
                                                                <Button className="btn btn-success mt-4 w100"
                                                                        style={styles.marginRight}
                                                                        onClick={() => getWinners(id)}
                                                                >
                                                                    Список Победителей
                                                                </Button>
                                                                <Button className="btn btn-success mt-4 w100 "
                                                                        style={styles.marginRight}
                                                                        onClick={() => getWinnersStep(id)}
                                                                >
                                                                    Выбрать победителей
                                                                </Button>
                                                            </>
                                                            :
                                                            <div className="warn mt-4 w100" style={styles.marginRight}>
                                                                Недостаточно участников
                                                            </div>
                                                    }
                                                    {/*<Button style={styles.marginRight}>Редактировать розыгрыш</Button>*/}
                                                </>
                                            }
                                            <Button
                                                variant="danger w100"
                                                style={styles.marginRight}
                                                onClick={() => cancelPrank(id)}
                                                className="mt-4 "
                                            >
                                                Отменить розыгрыш
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>

                        )
                    )}
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
