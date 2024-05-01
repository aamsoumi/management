// Directory.js
import React, { useEffect } from 'react';
import { useState,useRef } from 'react';
import papersFile from "../data/papersFile.json";
import DocumentCard from "../components/UI-components/DocumentCard";
import { Container, Row, Col, Form,Button } from 'react-bootstrap';
import Prompt from './UI-components/Prompt';
import PromptAppend from './UI-components/PropmtAppend';
import Visualization from './Visualization';


// 
// import { API_URL } from './../../config.js';

const API_URL = "http://127.0.0.1:5050"

// I make sure that only 1 group is in all Groups for the papers: only "All"
export default function Directory() 
{

  // States for the application 
  const [groupsAvailable,setGroupsAvailable] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedTerms, setDisplayedTerms] = useState([]);
  const [selectedPapers, setSelectedPapers] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [updateGroups, setUpdateGroups] = useState(false);
  const [paper , setPaper] = useState([]);
  const filteredPapers = useRef([]);

  // References for the UI
  const buttonTextToggle  = useRef(null);
  let previousPaper = useRef(null);

  useEffect(() => {
  },[selectedPapers])


  useEffect(() => {
    const fetchData = async () => {
      const dataSource = `${API_URL}/data`;
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
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    //console.log(paper)
  }, [paper]); // Add paper as a dependency
  


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

if (searchTerm.length > 0) {
  filteredPapers.current = 
    [...paper.filter(paper =>
      (paper.ArticleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.Abstract.toLowerCase().includes(searchTerm.toLowerCase()))
  )]
} else {
  
  filteredPapers.current = [...paper];
}


// Filter papers based on selected group
    useEffect(() => {
      setDisplayedTerms(filteredPapers.current.map(p => p.articleID));
    }, [selectedGroup, searchTerm]);

    // Filter papers based on selected papers
    useEffect(() => {
    }, [selectedPapers]);

    // Create new group
    useEffect(() => {
      
      let tempGroups = []
        if(paper&&paper.length>0){
          paper.forEach(p => {
            p.Groups.forEach(g => {
              tempGroups.push(g.trim())
            })
          })
        setGroupsAvailable(Array.from(new Set([...groupsAvailable, ...tempGroups])));}
      
        
       },[paper]);;

    useEffect(() => {
      
    }, [newGroupName]);

    useEffect(() => {
      console.log(groupsAvailable)
    },[groupsAvailable])

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

    const appendToGroup = (groupName) => 
    {
    // Step 2: Accumulate changes to the paper state
    const updatedPaper = paper.map(p => {
      if (selectedPapers.includes(p.articleID)) {
        return { ...p, Groups: [...p.Groups, groupName] };
      }
      return p;
    });
    // Step 3: Update the paper state
    setPaper([...updatedPaper]);
    }

    // Add a useEffect hook to perform actions after the state has been updated
    useEffect(() => {
      try{
        //console.log(paper[0].Groups); // This will log the updated paper state
      }
        catch(e){
          //console.log(e)
        }
      }, [paper]); // Add 'paper' as a dependency


    const handleSaveToDatabase = () => {
      // Update the database with the current paper state
      fetch(`${API_URL}/update_paper`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paper),
      })
    }



console.log(groupsAvailable)
return (
  <>
  
  <Container fluid="md">
    <Row>
      <Col className='col-4'>
      
        <Form.Group>
          <Form.Label>Select Group:</Form.Label>
          {groupsAvailable && groupsAvailable.length > 0 && 
          (
               <Form.Control as="select" value={selectedGroup} onChange={handleGroupChange}>
                  {
                    groupsAvailable.map(group => (
                    <option key={group} value={group}>{group}</option>
                    ))}
                  </Form.Control>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>Search:</Form.Label>
          <Form.Control type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchTermChange} />
          
        </Form.Group>
        </Col>
        <Col>
        {paper && paper.length > 0 && <Visualization 
        data={paper}
        selectedPapers={selectedPapers} 
        setSelectedPapers={setSelectedPapers}
         />}
        </Col>

    
    </Row>
    <Row style={{marginTop:"20px", marginBottom:"20px"}}>
      <Col>
                <Button className="me-2" onClick={handleSelectAll} ref={buttonTextToggle}>Select All</Button>
                {groupsAvailable && groupsAvailable.length > 0 && (
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
                      />)}
                   {groupsAvailable && groupsAvailable.length > 0 && (    
                <PromptAppend  
                  title="Append to an Existing Group" 
                  buttonTitle="Append to an Existing Group" 
                  selectedPapers={selectedPapers} 
                  setSelectedPapers={setSelectedPapers}
                  groupsAvailable={groupsAvailable}
                  appendToGroup={appendToGroup}
                   />
                   )}
                   <Button className="me-2" onClick={handleSaveToDatabase}>Save to Database</Button>
                
      </Col>
    </Row>
    <Row>
      <Col>
        {filteredPapers.current.map((paper) => { 
          
          return <DocumentCard 
                  key={paper.articleID} 
                  infoProp={paper} 
                  isSelected={selectedPapers.includes(paper.articleID)} 
                  selectedPapers={selectedPapers}
                  setSelectedPapers={setSelectedPapers}
                  />
        })}
      </Col>
    </Row>
  </Container>
</>



);


}