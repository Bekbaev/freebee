import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";

const WriteOffSuccess = ({show, setShowSuccessModal, data}) => {
    return (
            <Modal show={show}
                   onHide={() => setShowSuccessModal(false)}
                   animation={false}>
                <Modal.Header>
                    <Modal.Title>Списание прошло успешно</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Пользователь: { data.client_name }</p>
                    <p>Сумма: { data.amount }</p>
                    <p>Дата списания: { data.date }</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
                        Ок
                    </Button>
                </Modal.Footer>
            </Modal>
    );
};

export default WriteOffSuccess;
