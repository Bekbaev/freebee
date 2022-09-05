import moment from 'moment'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router'
import useAsyncEffect from 'use-async-effect'
import Api from '../../api/api'

const EditWeeklyDraw = ({ update }) => {
    const { id } = useParams()
    const history = useHistory()
    const [drawData, setDrawData] = useState(null)
    const [success, setSuccess] = useState(false)
    const [members, setMembers] = useState(0)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState('')
    const [hour, setHour] = useState(9)

    useAsyncEffect(async () => {
        const { data } = await Api.drawRead(0, id)
        setDrawData(data)
        setMembers(data.prizes.length)
    }, [])

    const handleSetMembers = ({ currentTarget }) => {
        const membersCount = parseInt(currentTarget.value)
        membersCount && setMembers(membersCount)
        !currentTarget.value && setMembers(0)
    }

    const handleSubmit = async event => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        formData.append('id', id)
        // Еженедельный тип розыгрыша
        formData.append('type', 0)
        formData.append('start_time', moment(`${date} ${hour}`, 'YYYY-MM-DD H').unix())

        try {
            setLoading(true)
            await Api.drawUpdate(formData)
            window.location.replace('/draw/week')
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

    if (!drawData) {
        return null
    }

    return (
        <div className="ticket-draw">
            <Form onSubmit={handleSubmit} onFocus={() => setSuccess(false)}>
                <Form.Group controlId="banner">
                    <Form.Label>Баннер</Form.Label>
                    <Form.Control name="banner" type="file" />
                    <Form.Text className="text-muted">Рекомендуемый размер 1920х1080</Form.Text>
                </Form.Group>

                <Form.Group controlId="banner_old">
                    <Form.Label>Старый баннер</Form.Label>
                    <div>
                        <img src={drawData.banner} alt="Banner" style={{ height: 100 }} />
                    </div>
                </Form.Group>

                <Form.Group controlId="title">
                    <Form.Label>Заголовок</Form.Label>
                    <Form.Control name="title" defaultValue={drawData.title || ''} required />
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Описание</Form.Label>
                    <Form.Control
                        as="textarea"
                        defaultValue={drawData.description || ''}
                        style={{ resize: 'vertical' }}
                        name="description"
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Дата начала розыгрыша</Form.Label>
                    <div style={{ display: 'flex' }}>
                        <div style={{ marginRight: '2rem' }}>
                            <Form.Label>Дата</Form.Label>
                            <Form.Control
                                type="date"
                                value={date}
                                onChange={({ currentTarget }) => setDate(currentTarget.value)}
                                required
                                style={{ lineHeight: 'normal', marginRight: '2rem' }}
                            />
                        </div>
                        <div>
                            <Form.Label>В какой час (24-ой формат)</Form.Label>
                            <Form.Control
                                type="num"
                                value={hour}
                                onChange={handleSetHour}
                                onKeyPress={onlyNumberWithZero}
                                required
                            />
                        </div>
                    </div>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Количество победителей</Form.Label>
                    <Form.Control
                        defaultValue={drawData.prizes.length || ''}
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
                                            defaultValue={drawData.prizes[index]['prize_name'] || ''}
                                            name={`prizes[${index}]`}
                                            placeholder={`${prizeEmoji(index + 1) + ' '}Приз за ${index + 1} место`}
                                            required
                                        />
                                    </Form.Group>
                                )
                        )}
                    </div>
                )}

                <Button variant="primary" type="submit" disabled={loading}>
                    Создать розыгрыш
                </Button>
            </Form>
            {success && (
                <div className="alert alert-success" role="alert" style={{ marginTop: '2rem' }}>
                    Розыгрыш изменен!
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

export default EditWeeklyDraw
