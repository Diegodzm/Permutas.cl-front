import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from "../store/context"
import "./modal.css"

function DeleteModal(props) {
  const {actions,store}= useContext(Context)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const borrarContact=() =>{

    actions.delOffer(props.index)
    store.tradeinfo.splice(props.index,1)
    console.log(store.tradeinfo)

    handleClose()
  }

  return (
    <>
      <Button variant="btn bg-danger"  onClick={handleShow}>
      <i className="fa fa-close mx-1 text-white"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title >Eliminar oferta</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estas seguro que deseas eliminar esta oferta?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={borrarContact}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;