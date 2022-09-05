import React, {useEffect, useState} from 'react';
import Api from "../../api/api";
import {Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";

const TransactionCheck = ({match}) => {
    const id = match.params.id
    const [transaction, setTransaction] = useState(null)
    const [buttonStatus, setButtonStatus] = useState(false)

    const getTransaction = async () =>{
        const {data} = await Api.transactionRead()
        const currentTransaction = data.filter(el => el.id == id)[0]
        setTransaction(currentTransaction)
    }

    const sendForm = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        formData.append('id', id)
        setButtonStatus(true)
        Api.receipt(formData)
        setTimeout(()=>{
            getTransaction()
        }, 400)
    }
    useEffect(() => {
        getTransaction()
    }, [])


    return (
        transaction &&
        <div>
            <form  >
                <div className="form-group field-ticket-number">
                    <label className="control-label" htmlFor="ticket-number">Время</label>
                    <input type="text" className="form-control"
                           value={transaction.created_at} />
                </div>
                <div className="form-group field-ticket-number">
                    <label className="control-label" htmlFor="ticket-number">Сумма</label>
                    <input type="text" className="form-control"
                           value={transaction.sum} />
                </div>
                <div className="form-group field-ticket-number">
                    <label className="control-label" htmlFor="ticket-number">от: </label>
                    <input type="text" className="form-control"
                           value={transaction.user_name} />
                </div>
                <div className="form-group field-ticket-number">
                    <label className="control-label" htmlFor="ticket-number">кому: </label>
                    <input type="text" className="form-control"
                           value={transaction.client_name} />
                </div>
                <div className="form-group field-ticket-number">
                    <label className="control-label" htmlFor="ticket-number">Тип </label>
                    <input type="text" className="form-control"
                           value={ transaction.type ? "Списание" : "Начисление" } />
                </div>
                {transaction.receipt &&
                    <img src={transaction.receipt} className="img-thumbnail" />
                }
            </form>
            {!transaction.receipt &&
                <Form onSubmit={(e) => sendForm(e)} >
                    <Form.Group>
                        <Form.File id="exampleFormControlFile1" label="Чек" name="receipt"/>
                    </Form.Group>
                    <button type="submit" className="btn btn-primary">Закрепить чек</button>
                    {buttonStatus && <div className="success">Чек успешно прикреплен !</div>}
                </Form>
            }

        </div>
    );
};

export default TransactionCheck;