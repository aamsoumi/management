import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

// Sample paper data
const papers = [
  { id: 1, title: 'Paper 1', abstract: 'Abstract of paper 1' },
  { id: 2, title: 'Paper 2', abstract: 'Abstract of paper 2' },
  { id: 3, title: 'Paper 3', abstract: 'Abstract of paper 3' },
];

function PaperSelector() {
  const [selectedPapers, setSelectedPapers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle checkbox change
  const handleCheckboxChange = (paperId) => {
    if (selectedPapers.includes(paperId)) {
      setSelectedPapers(selectedPapers.filter(id => id !== paperId));
    } else {
      setSelectedPapers([...selectedPapers, paperId]);
    }
  };

  // Function to handle "Select All" checkbox change
  const handleSelectAllChange = (event) => {
    if (event.target.checked) {
      setSelectedPapers(papers.map(paper => paper.id));
    } else {
      setSelectedPapers([]);
    }
  };

  // Function to handle search term change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter papers based on search term
  const filteredPapers = papers.filter(paper =>
    paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.abstract.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Row>
        <Col>
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </Col>
        <Col xs={3}>
          <Form.Check
            type="checkbox"
            label="Select All"
            checked={selectedPapers.length === papers.length}
            onChange={handleSelectAllChange}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          {filteredPapers.map(paper => (
            <div key={paper.id}>
              <Form.Check
                type="checkbox"
                label={paper.title}
                checked={selectedPapers.includes(paper.id)}
                onChange={() => handleCheckboxChange(paper.id)}
              />
              <p>{paper.abstract}</p>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default PaperSelector;
