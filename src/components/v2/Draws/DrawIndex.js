import React, {useMemo, useEffect, useState} from 'react';
import normalizeDate from "../../../normalizeDate";
import {Button, Col} from "react-bootstrap";
import getRole from "../../../getRole";
import {Link} from "react-router-dom";
import Api from "../../../api/api";
import { useHistory } from 'react-router-dom';
import COMPANY_TYPES from "../../../common/enums/types/company_types";

const DrawIndex = ({type}) => {
    const history = useHistory();
    const isCompany = getRole() !== 'god';
    const [drawList, setDrawList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentFilter, setCurrentFilter] = useState(1);
    const filters = [
        {
            id: 1,
            name: 'Активные'
        },
        {
            id: 2,
            name: 'Прошедшие'
        },
        {
            id: 3,
            name: 'Все'
        },
    ];

    const typeText = useMemo(() => {
        switch (type) {
            case 0:
                return 'Еженедельный розыгрыш';
            case 1:
                return 'Главный розыгрыш';
            default:
                return 'Розыгрыш';
        }
    }, [type]);

    const filteredDrawList = useMemo(() => {
        return drawList.filter(draw => {
            if (currentFilter === 3) {
                return draw;
            }
            if (currentFilter === 2) {
                return !draw.active;
            }
            if (currentFilter === 1) {
                return draw.active;
            }
        })
    }, [drawList, currentFilter]);

    const getWinnersByStep = (id) => {
        window.open(`/draw/step/${id}/${type}`, "NewDraw" + Date.now().toString(), 'popup');
    };

    const getWinnersStep = (id) => {
        window.open(`/draw/drum/${id}/${type}`, "NewDraw" + Date.now().toString(), 'popup');
    };

    const cancelPrank = () => {
    };

    useEffect(() => {
        (async () => {
            const {data} = await Api.drawRead(type);
            setDrawList(data);
            setLoading(false);
        })();
    }, [type]);

    return (
        <>
            {loading && <p>Идет загрузка...</p>}
            {!loading &&
            <>
                <ul className="breadcrumb">
                    <li>
                        <a>{typeText}</a>
                    </li>
                </ul>
                <div className='mt-4 mt-2'>
                    <h4>Фильтр:</h4>
                    <select name="companyTypeFilter" className='form-control' onChange={e => setCurrentFilter(+e.target.value)}>
                        {filters.map((item, key) => {
                            return <option key={`company-type-${key}`} value={item.id}>{item.name}</option>
                        })}
                    </select>
                </div>
                <Link to={`/draw/create/${type}`}>
                    <div className="btn btn-success my-5">Создать розыгрыш</div>
                </Link>
                <div className="listContainerWrapper">
                    {filteredDrawList.length === 0 && <p>Розыгрыши отсутствуют...</p>}
                    {filteredDrawList.length > 0 && filteredDrawList.map(
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
                             active,
                             completed,
                             used_tickets_count,
                             used_clients_count
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
                                            Участников - {active ? memberUsers: used_clients_count}
                                        </b>
                                        <b style={{...styles.marginRight, color: 'navy'}}>Билетов
                                            - {active ? memberTickets : used_tickets_count}</b>
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
                                                !completed &&
                                                <>
                                                    {
                                                        memberUsers >= prizes.length
                                                            ?
                                                            <>
                                                                <Button className="btn btn-success mt-4 w100"
                                                                        style={styles.marginRight}
                                                                        onClick={() => getWinnersByStep(id)}
                                                                >
                                                                    Разыграть поэтапно
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
                                                </>
                                            }
                                            {!!active &&
                                                <>
                                                 {/*   <Button
                                                        variant="primary w100"
                                                        style={styles.marginRight}
                                                        onClick={() => cancelPrank(id)}
                                                        className="mt-4 ">
                                                        Редактировать розыгрыш
                                                    </Button>*/}
                                                    <Button
                                                    variant="danger w100"
                                                    style={styles.marginRight}
                                                    onClick={() => cancelPrank(id)}
                                                    className="mt-4 ">
                                                        Отменить розыгрыш
                                                    </Button>
                                                </>
                                            }

                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    )}
                </div>

            </>}
        </>
    );
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


export default DrawIndex;
