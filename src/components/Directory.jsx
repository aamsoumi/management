import config from '../config.jsx';
import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import papersFile from "../data/papersFile.json";
import DocumentCard from "../components/UI-components/DocumentCard";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Prompt from './UI-components/Prompt';
import PromptAppend from './UI-components/PropmtAppend';
import Visualization from './Visualization';

export default function Directory() {
  const [groupsAvailable, setGroupsAvailable] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedTerms, setDisplayedTerms] = useState([]);
  const [selectedPapers, setSelectedPapers] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [updateGroups, setUpdateGroups] = useState(false);
  const [paper, setPaper] = useState([]);
  const filteredPapers = useRef([]);

  const buttonTextToggle = useRef(null);
  let previousPaper = useRef(null);

  useEffect(() => {}, [selectedPapers]);

  useEffect(() => {
    const fetchData = async () => {
      const dataSource = `${config.serverUrl}/data`;
      try {
        const response = await fetch(dataSource);
        let data = await response.json();
        const results = data.data.map(p => {
          const grpTemp = p.Groups.slice(1, p.Groups.length - 1).split(",");
          grpTemp.forEach((g, i) => {
            grpTemp[i] = g.replace(/'/g, "").replace(/"/g, "").trim();
          });
          return {
            ...p,
            PCA_Comp1: +p.PCA_Comp1,
            PCA_Comp2: +p.PCA_Comp2,
            Kmeans_Cluster: +p.Kmeans_Cluster,
            Groups: grpTemp
          };
        });
        setPaper([...results]);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {}, [paper]);

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectAll = () => {
    if (selectedPapers.length === displayedTerms.length) {
      buttonTextToggle.current.textContent = "Select All";
      setSelectedPapers([]);
    } else {
      buttonTextToggle.current.textContent = "Deselect All";
      setSelectedPapers(displayedTerms);
    }
  };

  useEffect(() => {
    let tempFilteredPapers = [...paper];

    if (selectedGroup) {
      tempFilteredPapers = tempFilteredPapers.filter(p => p.Groups.includes(selectedGroup));
    }

    if (searchTerm.length > 0) {
      tempFilteredPapers = tempFilteredPapers.filter(paper =>
        paper.ArticleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.Abstract.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filteredPapers.current = tempFilteredPapers;
    setDisplayedTerms(tempFilteredPapers.map(p => p.articleID));
  }, [selectedGroup, searchTerm, paper]);

  useEffect(() => {}, [selectedPapers]);

  useEffect(() => {
    let tempGroups = [];
    if (paper && paper.length > 0) {
      paper.forEach(p => {
        p.Groups.forEach(g => {
          tempGroups.push(g.trim());
        });
      });
      setGroupsAvailable(Array.from(new Set([...groupsAvailable, ...tempGroups])));
    }
  }, [paper]);

  useEffect(() => {}, [newGroupName]);

  useEffect(() => {}, [groupsAvailable]);

  const handleCreateNewGroup = () => {
    if (!groupsAvailable.includes(newGroupName)) {
      setGroupsAvailable([...groupsAvailable, newGroupName]);
    }

    const updatedPaper = paper.map(p => {
      if (selectedPapers.includes(p.articleID)) {
        return { ...p, Groups: [...p.Groups, newGroupName] };
      }
      return p;
    });

    setPaper([...updatedPaper]);
  };

  const appendToGroup = (groupName) => {
    const updatedPaper = paper.map(p => {
      if (selectedPapers.includes(p.articleID)) {
        return { ...p, Groups: [...p.Groups, groupName] };
      }
      return p;
    });
    setPaper([...updatedPaper]);
  };

  useEffect(() => {}, [paper]);

  const handleSaveToDatabase = () => {
    fetch(`${API_URL}/update_paper`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paper),
    });
  };

  const removeGroupFromPaper = (article_id, groupIndex) => {
    const updatedPaper = paper.map(p => {
      if (p.articleID === article_id) {
        return { ...p, Groups: p.Groups.filter((g, i) => i !== groupIndex) };
      }
      return p;
    });
    setPaper([...updatedPaper]);
  };

  return (
    <>
      <Container fluid="md">
        <Row>
          <Col className='col-4'>
            <Form.Group>
              <Form.Label>Select Group:</Form.Label>
              {groupsAvailable && groupsAvailable.length > 0 && (
                <Form.Control as="select" value={selectedGroup} onChange={handleGroupChange}>
                  <option value="">Select a group</option>
                  {groupsAvailable.map(group => (<option key={group} value={group}>{group}</option>))}
                </Form.Control>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Search:</Form.Label>
              <Form.Control type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchTermChange} />
            </Form.Group>
          </Col>
          <Col>
            {paper && paper.length > 0 && (
              <Visualization 
                data={paper}
                selectedPapers={selectedPapers} 
                setSelectedPapers={setSelectedPapers}
                filteredPapers={filteredPapers}
              />
            )}
          </Col>
        </Row>
        <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Col>
            <Button className="me-2" onClick={handleSelectAll} ref={buttonTextToggle}>
              Select All
            </Button>

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
              />
            )}
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
            {filteredPapers.current.map((paper) => (
              <DocumentCard 
                key={paper.articleID} 
                infoProp={paper} 
                isSelected={selectedPapers.includes(paper.articleID)} 
                selectedPapers={selectedPapers}
                setSelectedPapers={setSelectedPapers}
                removeGroupFromPaper={removeGroupFromPaper}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}