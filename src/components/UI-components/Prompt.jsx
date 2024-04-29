import { useState,useRef,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Prompt(Props) {

                    /*
                      title=""
                      inputPlaceholder=""
                      buttonTitle=""
                      inputValue={newGroupName}
                      setInputValue={setNewGroupName}
                      handleCreateNewGroup={handleCreateNewGroup}
                      groupsAvailable={groupsAvailable}
                      setGroupsAvailable={setGroupsAvailable}
                      */


  const [show, setShow] = useState(false);
  const saveButton = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = (event) => 
  {  
    const inputElement = document.getElementById('exampleForm.ControlInput1'); 
    console.log(Props.groupsAvailable.includes(inputElement.value))
    // check if the group is not empty and if already exists
    if (inputElement.value === '') {
      alert('Please enter a group name');
    }
    else // if  not empty check if the group already exists
    {
      if (Props.groupsAvailable.includes(inputElement.value)) 
      {
        alert('Group already exists');
      }
      else{ // if not already exists add the group and close the modal
        Props.setNewGroupName(inputElement.value);
      }
    }
  };

  // The reason I have this useEffet: I want to make sure the state is updated, then close the modal.
  useEffect(() => {
    if(Props.newGroupName !== '')
      {
        Props.handleCreateNewGroup();
        handleClose();
    }
  },[Props.newGroupName]);





  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // Trigger save action if Enter key is pressed
      saveButton.current.focus()
    }
  };



  return (
    <>
      <Button className="me-2" variant="primary" onClick={handleShow} ref={saveButton}>
       {Props.buttonTitle}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{Props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>{Props.inputPlaceholder}</Form.Label>
              <Form.Control
                type="text"
                placeholder={Props.inputPlaceholder}
                autoFocus
                onKeyDown={handleKeyDown}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>More info about the group</Form.Label>
              <Form.Control as="textarea" rows={3} onKeyDown={handleKeyDown} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Prompt;