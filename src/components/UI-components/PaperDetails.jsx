import React from 'react';
import {useState} from 'react';
import { Card, Container, Row, Col , Collapse,Form, Button} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import CloseButton from './CloseButton.jsx';


// the close button for the badge of the group
import Badge from 'react-bootstrap/Badge';
import "./PaperDetails.css";


const MAX_LENGTH = 100; // Maximum characters to show initially


function PaperDetails({ articleID,title, abstract, authors, journal, year,isSelected,setSelectedPapers,groups,removeGroupFromPaper}) {

if(articleID === undefined || title === undefined || abstract === undefined )
{
  return <Spinner animation="grow" />;
}    

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
            {groups.map((group,i) => 
            (
              <div key={i}>
              <Badge className='m-1 group-badge' variant="primary">
                  {group}
              </Badge>
              <CloseButton onClick={() => removeGroupFromPaper(articleID,i)} />
              </div>
        
            ))}

            </Col>
        </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PaperDetails;
