import { useState,useRef,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function PromptLogicGroupName({buttonTitle,title,inputPlaceholder,operation,applyLogicOperation}) {



  const [show, setShow] = useState(false);
  const saveButton = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // Trigger save action if Enter key is pressed
      saveButton.current.focus()
    }
  };


  const handleSave = (event) => 
  {  
    const selectElement = document.getElementById('ControlInput');
    const resultingGroup = selectElement.value;
    applyLogicOperation(resultingGroup,operation);
    handleClose();
  };




  return (
    <>
      <Button className="me-2" variant="dark" onClick={handleShow} ref={saveButton}>
       {buttonTitle}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>New Group Name</Form.Label>
              
              <Form.Control
                id="ControlInput"
                type="text"
                placeholder={inputPlaceholder}
                autoFocus
                onKeyDown={handleKeyDown}
              />

            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave} >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PromptLogicGroupName;