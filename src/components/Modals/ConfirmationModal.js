import React, { useEffect } from 'react';
import {Button, Modal} from "react-bootstrap";


const ConfirmationModal = ({show, onCancel, onConfirm, message = 'Подтвердите действие'}) => {
    return (
        <Modal show={show} onHide={onCancel} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Подтвердите действие</Modal.Title>
            </Modal.Header>
            <Modal.Body>{ message }</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={onConfirm}>
                    Подтвердить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmationModal;
