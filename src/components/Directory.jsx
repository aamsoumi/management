// Directory.js
import React, { useEffect } from 'react';
import { useState,useRef } from 'react';
import papers from "../data/papers.json";
import DocumentCard from "../components/UI-components/DocumentCard";
import { Container, Row, Col, Form,Button } from 'react-bootstrap';

import Prompt from './UI-components/Prompt';

// I make sure that only 1 group is in all Groups for the papers: only "All"
export default function Directory() {
  useEffect(() => {
    papers.data.forEach(paper=>paper['Groups']=['All'])
  },[])

  // States for the application 
  const [groupsAvailable,setGroupsAvailable] = useState( []);
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedTerms, setDisplayedTerms] = useState([]);
  const [selectedPapers, setSelectedPapers] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');


  // References for the UI
  const buttonTextToggle  = useRef(null);


  // Function to handle group change
  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };
// Function to handle search term change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };
// Function to handle select all
  const handleSelectAll = () => {
    if(selectedPapers.length === displayedTerms.length){
      buttonTextToggle.current.textContent = "Select All";
      setSelectedPapers([]);}
    else{
      buttonTextToggle.current.textContent = "Deselect All";
      setSelectedPapers(displayedTerms);
    }
};
    // Filter papers based on search term
    const filteredPapers = papers.data.filter(paper =>
        (paper.ArticleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.Abstract.toLowerCase().includes(searchTerm.toLowerCase()))
    );

// Filter papers based on selected group
    useEffect(() => {
      setDisplayedTerms(filteredPapers.map(paper => paper.articleID));
    }, [selectedGroup, searchTerm]);

    // Filter papers based on selected papers
    useEffect(() => {
    }, [selectedPapers]);

    // Create new group
    useEffect(() => {
      if(groupsAvailable.length === 0)
        groupsAvailable.push('All','Computer Science','Covid19','Physics');
       },[]);;

    useEffect(() => {
      
    }, [newGroupName]);

    const handleCreateNewGroup = () => {
      console.log(selectedPapers,newGroupName)

      // I had 2 choices for this design:
      // - Paper Centered design
      // - Group Centered design

      // I chose Paper Centered design because it is easier to implement
      // So I will add groups to the group "key" in each paper.

      selectedPapers.forEach((articleID) => {
        // from the selected items, get the articleID and used the articleID to find the paper, and then add the new group
        try{
          papers.data.filter(paper=>paper.articleID===articleID)[0].Groups.push(newGroupName)
        }
        catch(e){
          console.log(e)
        }
        
        
      })

      console.log(papers.data)

    }

    const appendToGroup = (selectedPapers) => {
    }



return (
  <>
   
  <Container fluid="md">
    <Row>
      <Col>
        <Form.Group>
          <Form.Label>Select Group:</Form.Label>
          <Form.Control as="select" value={selectedGroup} onChange={handleGroupChange}>
            {groupsAvailable.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Search:</Form.Label>
          <Form.Control type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchTermChange} />
          
        </Form.Group>
        </Col>
    </Row>
    <Row style={{marginTop:"20px", marginBottom:"20px"}}>
      <Col>
                <Button className="me-2" onClick={handleSelectAll} ref={buttonTextToggle}>Select All</Button>
                <Prompt
                      title="Enter new group name:"
                      inputPlaceholder="New Group Name"
                      buttonTitle="Add Documents to a New Group"
                      newGroupName={newGroupName}
                      setNewGroupName={setNewGroupName}
                      handleCreateNewGroup={handleCreateNewGroup}
                      groupsAvailable={groupsAvailable}
                      setGroupsAvailable={setGroupsAvailable}
                      />
                 <Button className="me-2" onClick={()=>appendToGroup(selectedPapers)}>Append to an Existing Group</Button>
      </Col>
    </Row>
    <Row>
      <Col>
        {filteredPapers.map((paper) => (
          <DocumentCard key={paper.articleID} infoProp={paper} isSelected={selectedPapers.includes(paper.articleID)} setSelectedPapers={setSelectedPapers} />
        ))}
      </Col>
    </Row>
  </Container>
</>



);


}