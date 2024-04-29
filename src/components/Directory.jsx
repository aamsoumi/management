// Directory.js
import React, { useEffect } from 'react';
import { useState,useRef } from 'react';
import papersFile from "../data/papersFile.json";
import DocumentCard from "../components/UI-components/DocumentCard";
import { Container, Row, Col, Form,Button } from 'react-bootstrap';

import Prompt from './UI-components/Prompt';
import PromptAppend from './UI-components/PropmtAppend';

// I make sure that only 1 group is in all Groups for the papers: only "All"
export default function Directory() 
{
  let paper_=[]

  // States for the application 
  const [groupsAvailable,setGroupsAvailable] = useState( []);
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedTerms, setDisplayedTerms] = useState([]);
  const [selectedPapers, setSelectedPapers] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [updateGroups, setUpdateGroups] = useState(false);
  const [paper , setPaper] = useState([]);

  // References for the UI
  const buttonTextToggle  = useRef(null);
  let previousPaper = useRef(null);




  useEffect(() => {
    papersFile.data.forEach(p=>p['Groups']=['All'])
    setPaper([...papersFile.data])
  },[])

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
    }};
   
// Filter papers based on search terms
let filteredPapers = [];
if (searchTerm.length > 0) {
  filteredPapers = paper.filter(paper =>
      (paper.ArticleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.Abstract.toLowerCase().includes(searchTerm.toLowerCase()))
  );
} else {
  filteredPapers = paper;
}

   

// Filter papers based on selected group
    useEffect(() => {
      setDisplayedTerms(filteredPapers.map(p => p.articleID));
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
      // Step 1: Add the group to the available groups
      if (!groupsAvailable.includes(newGroupName)) {
        setGroupsAvailable([...groupsAvailable, newGroupName]);
      }
    
      // Step 2: Accumulate changes to the paper state
      const updatedPaper = paper.map(p => {
        if (selectedPapers.includes(p.articleID)) {
          return { ...p, Groups: [...p.Groups, newGroupName] };
        }
        return p;
      });
    
      // Step 3: Update the paper state
      setPaper(updatedPaper);
    };

    const appendToGroup = (selectedPapers,groupName) => 
    {
      try{
        // from the selected items, get the articleID and used the articleID to find the paper, and then add the new group
        const paper__ = [...paper];
        if(!paper__.filter(p=>p.articleID===articleID)[0].Groups.includes(groupName)){
          paper__.filter(p=>p.articleID===articleID)[0].Groups.push(groupName)
          setPaper([...paper__])
        }
      }
      catch(e){
        console.log(e)
      }
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
                      appendToGroup={appendToGroup}
                      />
                <PromptAppend  
                
                  title="Append to an Existing Group" 
                  buttonTitle="Append to an Existing Group" 
                  selectedPapers={selectedPapers} 
                  setSelectedPapers={setSelectedPapers}
                  groupsAvailable={groupsAvailable}
                   />
                
      </Col>
    </Row>
    <Row>
      <Col>
        {filteredPapers.map((paper) => (
          <DocumentCard 
                  key={paper.articleID} 
                  infoProp={paper} 
                  isSelected={selectedPapers.includes(paper.articleID)} 
                  setSelectedPapers={setSelectedPapers} />
        ))}
      </Col>
    </Row>
  </Container>
</>



);


}