// Directory.js
import React, { useEffect,useState,useRef  } from 'react';
import DocumentCard from "./UI-components/DocumentCard.jsx";
import { Container, Row, Col, Form,Button } from 'react-bootstrap';
import config from '../config.jsx';
import Accordion from 'react-bootstrap/Accordion';
import PaperCard from "./UI-components/Groups/PaperCard.jsx";
import LogicGroupOperation from "./UI-components/Groups/LogicGroupOperation.jsx";
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Prompt from './UI-components/Prompt.jsx';
import * as LSOP from "./UI-components/Groups/LogicSetOperations.jsx";


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

          const grpTemp = p.Groups.slice(1,p.Groups.length-1).split(",")
          grpTemp.forEach((g,i) => {
            return grpTemp[i] = g.replace(/'/g, "").replace(/"/g, "").trim()
          })

          return {...p, 
            PCA_Comp1:+p.PCA_Comp1,
            PCA_Comp2:+p.PCA_Comp2,
            Kmeans_Cluster:+p.Kmeans_Cluster,
            Groups:grpTemp}
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
    setGroups(tempVar)
  },[paper])

  useEffect(() => {
    
  },[groups])



  const [selectedGroups, setSelectedGroups] = useState([]);

  const handleCheckboxChange = (e, group) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedGroups([...selectedGroups, group]);
    } else {
      setSelectedGroups(selectedGroups.filter((g) => g !== group));
    }
   
  };

  useEffect(() => {
    
  },[selectedGroups])


  const applyLogicOperation = (newGroupName,operation) => {
    
      const Sets = []
      let results = []
      selectedGroups.forEach((g,i) => {
        const inGroupPapers= new Set (paper.filter(p => p.Groups.includes(g)).map(d=>{
          return d.articleID
        }))
        Sets.push(inGroupPapers)
      
      })
      
      if(operation === 'intersection'){
        results = LSOP.intersectionArrayOfSets(Sets,newGroupName)
      }
      else if(operation === 'union'){
        results = LSOP.unionArrayOfSets(Sets,newGroupName)
      }
      else if(operation === 'difference'){
        results = LSOP.differenceArrayOfSets(Sets,newGroupName)
      }
      else if(operation === 'symmetricDifference'){
        results = LSOP.symmetricDifferenceArrayOfSets(Sets,newGroupName)
      }
      
      if(newGroupName===""){
        newGroupName = operation + "_" + selectedGroups.join("__")
        newGroupName = newGroupName.replace(/[ ,/]/g,'_')
      }
      // a copy of paper is made.
      const paperCopy = [...paper]
      // use the articleID in the results, to find the papers in the paper array and update the Groups property of that paper and add the newGroupName to it.
      
      results.forEach(id => {
        const index = paperCopy.findIndex(p => p.articleID === id);
        paperCopy[index].Groups.push(newGroupName);
      });

      setPaper(paperCopy)


  }



  
  const handleSaveToDatabase = () => {
    // Update the database with the current paper state
    fetch(`${config.serverUrl}/update_paper`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paper),
    })
  }

  useEffect(() => {
    // save the paper back to the server
    
    
    handleSaveToDatabase()

  },[paper])


return (
  <>
    <Container fluid="md">
    <Row>
      <Col>
        <h2 className='text-center'>Groups</h2>
      </Col>
    </Row>
    <Row>
      <Col className='col-6'>
      <Row>
      <Col><LogicGroupOperation applyLogicOperation={applyLogicOperation}/></Col>
      </Row>

      <Row>
      <Col><ButtonToolbar aria-label="Logic Operations on Groups" style={{backgroundColor: "#090a11cc"}} ><hr/></ButtonToolbar></Col>
      </Row>
      <Row>
      <Col>
      <Accordion>{
        groups.map((g,i) =>
          <Accordion.Item eventKey={i.toString()} key={i}>
          
          <Accordion.Header>
          

          <input className='form-check-input m-3'
                    type="checkbox"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleCheckboxChange(e, g)}
                    checked={selectedGroups.includes(g)}
                    
                  />
          
          {g}
          
          
          </Accordion.Header>

          <Accordion.Body>
          {paper.filter(p => p.Groups.includes(g)).map((p,i) =>
          {
            
            return <PaperCard key={i} 
            ArticleTitle={p.ArticleTitle}
            Authors={p.Authors}
            Year= {p.Year}
            />
            
            } )}
            </Accordion.Body></Accordion.Item>)
        }</Accordion>
        </Col>
</Row>
      </Col></Row></Container></>

)
}