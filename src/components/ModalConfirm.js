import React from 'react'

import { Button, Modal } from 'react-bootstrap'

const ModalConfirm = ({ show, onClose, confirmTitle, confirmText, onAccept }) => {

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{confirmTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{confirmText}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onAccept}>
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalConfirm