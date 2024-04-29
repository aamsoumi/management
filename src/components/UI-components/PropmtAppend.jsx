import { useState,useRef,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function PromptAppend(Props) {
    

  const [show, setShow] = useState(false);
  const saveButton = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = (event) => 
  {  
    const selectElement = document.getElementById('exampleForm.ControlSelect1');
    const selectedOption = selectElement.options[selectElement.selectedIndex].value;

    console.log(selectedOption)
    // console.log(Props.groupsAvailable.includes(inputElement.value))
    // // check if the group is not empty and if already exists
    // if (inputElement.value === '') {
    //   alert('Please enter a group name');
    // }
    // else // if  not empty check if the group already exists
    // {
    //   if (Props.groupsAvailable.includes(inputElement.value)) 
    //   {
    //     alert('Group already exists');
    //   }
    //   else{ // if not already exists add the group and close the modal
    //     Props.setNewGroupName(inputElement.value);
    //   }
    // }
  };

  // The reason I have this useEffet: I want to make sure the state is updated, then close the modal.






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
            <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
              <Form.Label>Select group</Form.Label>
              <Form.Control as="select" defaultValue="" onChange={(event) => {}}>
                <option value="" disabled hidden>Select group</option>
                {
                  Props.groupsAvailable.map((group) => {
                    return <option key={group}>{group}</option>
                  })
                }
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave} >
            Append
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PromptAppend;