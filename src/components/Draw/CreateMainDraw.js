import moment from 'moment'
import React, {useEffect, useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import Api from '../../api/api'

const CreateWeeklyDraw = ({ update }) => {
    const [success, setSuccess] = useState(false)
    const [members, setMembers] = useState(0)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
    const [hour, setHour] = useState(9)
    const [minute, setMinute] = useState(0)
    const [clientCount, setClientsCount] = useState(0);
    const [ticketCount, setTicketsCount] = useState(0);
    const [drawTypeByTime, setDrawTypeByTime] = useState(0);
    const drawTypesByTime = [
        {
            id: 0,
            name: 'Провести сейчас'
        },
        {
            id: 1,
            name: 'По дате и времени'
        }
    ];

    useEffect(() => {
        (async () => {
            const { client_count, ticket_count } = await Api.getDrawStats(1);
            setClientsCount(client_count);
            setTicketsCount(ticket_count);
        })()
    }, []);

    const handleSetMembers = ({ currentTarget }) => {
        const membersCount = parseInt(currentTarget.value)
        membersCount && setMembers(membersCount)
        !currentTarget.value && setMembers(0)
    }
    const handleSetMinute = ({ currentTarget }) => {
        if (currentTarget.value > 59) currentTarget.value = 60
        setMinute(currentTarget.value)
    }

    const handleSubmit = async event => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        // Главный тип розыгрыша
        formData.append('type', 1)
        formData.append('start_time', moment(`${date} ${hour} ${minute}`, 'YYYY-MM-DD H m').unix())

        try {
            setLoading(true)
            await Api.drawCreate(formData)
            event.target.reset()
            setSuccess(true)
            setMembers(0)
            update('asd')
        } catch ({ response }) {
            response?.status === 500 && setError('Невозможно загрузить изображение')
        } finally {
            setLoading(false)
        }
    }
    const handleSetHour = ({ currentTarget }) => {
        if (currentTarget.value > 23) currentTarget.value = 23
        setHour(currentTarget.value)
    }

    const now = new Date();
    const curr_date = now.getDate() + 1;
    const curr_month = now.getMonth() + 1;
    const curr_year = now.getFullYear();
    const min_date = curr_year + "-0" + curr_month + "-" + (curr_date - 1)

    return (
        <div className="ticket-draw">
            <Form onSubmit={handleSubmit} onFocus={() => setSuccess(false)}>
                <Form.Group controlId="banner">
                    <Form.Label>Баннер</Form.Label>
                    <Form.Control name="banner" type="file" required />
                    <Form.Text className="text-muted">Рекомендуемый размер 1920х1080</Form.Text>
                </Form.Group>

                <Form.Group controlId="title">
                    <Form.Label>Заголовок</Form.Label>
                    <Form.Control name="title" required />
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Описание</Form.Label>
                    <Form.Control as="textarea" style={{ resize: 'vertical' }} name="description" required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Дата начала розыгрыша</Form.Label>
                    <div style={{ display: 'flex' }}>
                        <div style={{ marginRight: '2rem' }}>
                            <Form.Label>Дата</Form.Label>
                            <Form.Control
                                min={min_date}
                                type="date"
                                value={date}
                                onChange={({ currentTarget }) => setDate( currentTarget.value )}
                                required
                                style={{ lineHeight: 'normal', marginRight: '2rem' }}
                            />
                        </div>
                        <div style={{ marginRight: '2rem' }}>
                            <Form.Label>В какой час (24-ой формат)</Form.Label>
                            <Form.Control
                                type="num"
                                value={ hour }
                                onChange={ handleSetHour }
                                onKeyPress={ onlyNumberWithZero }
                                required
                            />
                        </div>
                        <div>
                            <Form.Label>Минуты</Form.Label>
                            <Form.Control
                                type="num"
                                value={minute}
                                onChange={handleSetMinute}
                                onKeyPress={onlyNumberWithZero}
                                required
                            />
                        </div>
                    </div>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Количество победителей</Form.Label>
                    <Form.Control
                        onChange={handleSetMembers}
                        onKeyPress={onlyNumberWithoutZero}
                        type="num"
                        required
                        placeholder="Например: 3"
                    />
                    <Form.Text className="text-muted">Максимальное количество победителей - 100</Form.Text>
                </Form.Group>

                {members > 0 && (
                    <div>
                        <label>Призы</label>
                        {[...Array(members)].map(
                            (_, index) =>
                                index < 100 && (
                                    <Form.Group controlId="winner_count" key={index}>
                                        <Form.Control
                                            name={`prizes[${index}]`}
                                            placeholder={`${prizeEmoji(index + 1) + ' '}Приз за ${index + 1} место`}
                                            required
                                        />
                                    </Form.Group>
                                )
                        )}
                    </div>
                )}

                <Form.Text className='text-muted'>
                    <p>Количество участников - { clientCount }</p>
                    <p>Количество билетов - { ticketCount }</p>
                </Form.Text>

                <Button variant="primary" type="submit" disabled={loading}>
                    Создать розыгрыш
                </Button>
            </Form>
            {success && (
                <div className="alert alert-success" role="alert" style={{ marginTop: '2rem' }}>
                    Розыгрыш создан!
                </div>
            )}
            {error && (
                <div className="alert alert-danger" role="alert" style={{ marginTop: '2rem' }}>
                    {error}
                </div>
            )}
        </div>
    )
}

const prizeEmoji = place => {
    switch (place) {
        case 1:
            return '🥇'
        case 2:
            return '🥈'
        case 3:
            return '🥉'
        default:
            return ''
    }
}

const onlyNumberWithoutZero = event => {
    ;(event.key.match(/\D/) || (!event.currentTarget.value && event.key === '0')) && event.preventDefault()
}

const onlyNumberWithZero = event => {
    event.key.match(/\D/) && event.preventDefault()
}

export default CreateWeeklyDraw
