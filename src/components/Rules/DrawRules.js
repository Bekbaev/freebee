import React, {useEffect, useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Api from "../../api/api";
import {Button} from "react-bootstrap";

const DrawRules = () => {
    const [text, setText] = useState("")
    const [succes, setSucces] = useState(false)

    const changeText = e => {
        setText(e)
    }
    const getText = async () =>{
        const {data} = await Api.getRules(2)
        setText(data)
    }

    const sendText  = async () =>{
        const formData = new FormData()
        formData.append('text', text)
        formData.append('id', '2')
        await Api.sendRules(formData)
        getText()
        setSucces(true)
    }

    useEffect(() => {
        const formData = new FormData()
        formData.append('id', '2')
        getText(formData)
    }, [])

    return (
        <div>
            <CKEditor
                editor={ ClassicEditor }
                data={text}
                onReady={ editor => {
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    changeText(data)
                } }
            />
            <Button className='mt-15' onClick={ sendText }>Изменить</Button>
            {succes &&
            <div className="alert alert-success mt-15" role="alert">
                Текст успешно изменен!
            </div>
            }
        </div>
    );
};

export default DrawRules;