// Directory.js
import React, { useEffect,useState,useRef  } from 'react';
import DocumentCard from "./UI-components/DocumentCard.jsx";
import { Container, Row, Col, Form,Button } from 'react-bootstrap';
import config from '../config.jsx';
import Accordion from 'react-bootstrap/Accordion';

export default function Groups() 

{ const [paper, setPaper] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dataSource = `${config.serverUrl}/data`;
      console.log(dataSource)
      try {
        const response = await fetch(dataSource);
        let data = await response.json();
        const results =data.data.map(p => {
          return {...p, 
            PCA_Comp1:+p.PCA_Comp1,
            PCA_Comp2:+p.PCA_Comp2,
            Kmeans_Cluster:+p.Kmeans_Cluster,
            Groups:p.Groups.slice(1,p.Groups.length-1).split(",")}
        });
        setPaper([...results]);
      } catch (e) {
        console.log(e);
        papersFile.data.forEach(p => (p['Groups'] = ['All']));
        setPaper([...papersFile.data]);
      }
    }
    fetchData()
  },[])

  useEffect(() => {
    let tempVar= Array.from(new Set (paper.map(p => p.Groups).flat()))
    tempVar = tempVar.map(g => typeof g === 'string' ? g.replace(/'/g, "").replace(/"/g, "").trim() : g.toString());
    setGroups(tempVar)
  },[paper])

  useEffect(() => {
    console.log(groups)
  },[groups])
return (
  <>
  <Container fluid="md">
    <Row>
      <Col className='col-6'>
      <Accordion>{
        groups.map((g,i) =>
          <Accordion.Item eventKey="0" key={i}><Accordion.Header>{g}</Accordion.Header><Accordion.Body>
        
        </Accordion.Body></Accordion.Item>)
        }</Accordion></Col>
      <Col>Col 2 Groups</Col>
    </Row>
    
  </Container>
</>
);
}