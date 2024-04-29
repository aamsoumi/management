import React from 'react';
import {useState} from 'react';
import { Card, Container, Row, Col , Collapse,Form, Button} from 'react-bootstrap';

const Groups = ['Group A', 'Group B', 'Group C']; // List of groups

const MAX_LENGTH = 100; // Maximum characters to show initially


function PaperDetails({ articleID,title, abstract, authors, journal, year,isSelected,setSelectedPapers,groups}) {



/* I have taken this part off because it is not being used

              <select
                className="form-select"
                value={selectedGroup}
                onChange={onGroupChange}>
                
                {Groups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}

              </select>
*/


    

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };
    const handleCheckboxChange = (event) => {
        if(isSelected){ 
            setSelectedPapers(selectedPapers => selectedPapers.filter(paper => paper !== articleID));
        }
        else{
            setSelectedPapers(selectedPapers => [...selectedPapers, articleID]);
        }
        //onCheckboxChange()
    }


  return (
    <Container>
      <Card>
        <Card.Body>
   
        <Row>
            <Col xs={1}>
                <Form.Check type="checkbox" aria-label="Select paper" checked={isSelected} onChange={handleCheckboxChange}/>
            </Col>
            <Col>
                <Card.Title> {title}</Card.Title>
                <Card.Text><b>{year}</b></Card.Text>
                <Card.Text>
                Abstract: {abstract.length > MAX_LENGTH ? (
                <>
                    {isExpanded ? abstract : `${abstract.slice(0, MAX_LENGTH)}...`}
                    <button className="btn btn-link" onClick={toggleExpand}>
                        {isExpanded ? 'Read less' : 'Read more'}
                    </button>
                    </>) : (abstract )}
                </Card.Text>
                <Card.Text><b>Authors:</b> {authors}</Card.Text>
                <Card.Text><b>Journal:</b> {journal}</Card.Text>
            </Col>
        </Row>
        <Row>
            <Col>
            {groups.map((group,i) => (
                  <Button variant="success" className='m-1' key={i}>{group}</Button>
                ))}

            </Col>
        </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PaperDetails;
