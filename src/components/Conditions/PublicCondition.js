import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Api from '../../api/api'

const PublicCondition = () => {
    const [text, setText] = useState('')
    const [succes, setSucces] = useState(false)
    const [title, setTitle] = useState(false)
    const [showTitle, setShowTitle] = useState(false)

    const changeText = e => {
        setText(e)
    }
    const getText = async () => {
        const { data } = await Api.getCondition(1)
        setShowTitle(true)
        setText(data.text)
        setTitle(data.title)
    }

    const sendText = async () => {
        const formData = new FormData()
        formData.append('text', text)
        formData.append('id', 1)
        formData.append('title', title)
        await Api.sendCondition(formData)
        getText()
        setSucces(true)
        setSucces(true)
    }

    useEffect(() => {
        const formData = new FormData()
        formData.append('id', 1)
        getText()
    }, [])

    return (
        <div>
            <div className="form-group field-generateform-value required mt-15">
            {showTitle ?
                <>
                    <label className="control-label" htmlFor="generateform-value">
                        Оглавление
                    </label>
                    <input
                        type="text"
                        id="generateform-value"
                        className="form-control"
                        name="title"
                        required
                        aria-required="true"
                        value={title}
                        onChange={e => setTitle(e.currentTarget.value)}
                    />
                </>
                : <p>Загрузка...</p>
            }
            </div>
            <CKEditor
                editor={ClassicEditor}
                data={text}
                onReady={editor => {}}
                onChange={(event, editor) => {
                    const data = editor.getData()
                    changeText(data)
                }}
            />
            <Button className="mt-15" onClick={sendText}>
                Изменить
            </Button>
            {succes && (
                <div className="alert alert-success mt-15" role="alert">
                    Текст успешно изменен!
                </div>
            )}
        </div>
    )
}

export default PublicCondition
