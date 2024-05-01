// Directory.js
import React, { useEffect,useState,useRef  } from 'react';
import DocumentCard from "./UI-components/DocumentCard.jsx";
import { Container, Row, Col, Form,Button } from 'react-bootstrap';
// 
//import { API_URL } from '../../config.js';

// I make sure that only 1 group is in all Groups for the papers: only "All"
export default function Groups() 
{
return (
  <>
  <Container fluid="md">
    <Row>
      <Col className='col-6'>Col 1 Groups</Col>
      <Col>Col 2 Groups</Col>
    </Row>
    
  </Container>
</>



);


}