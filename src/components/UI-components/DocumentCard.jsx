import React, { useEffect } from "react";
import { Container, Row, Col,Form } from "react-bootstrap";
//import { Dropdown, DropdownButton } from "react-bootstrap";
import { useState } from "react";
import PaperDetails from "./PaperDetails";
export default function DocumentCard({infoProp,isSelected,SelectedPapers, setSelectedPapers,removeGroupFromPaper}) {

   // const [groups, setGroups] = useState([]);
   console.log(infoProp)

    useEffect(() => {
    
    }, [infoProp])

    return (
        <Container fluid="md">
            <Row>
                <Col>
                <PaperDetails
                    articleID={infoProp.articleID}
                    title={infoProp.ArticleTitle}
                    abstract={infoProp.Abstract}
                    authors={infoProp.Authors}
                    journal={infoProp.JournalTitle}
                    year={infoProp.Year}
                    selectedPapers={SelectedPapers}
                    SelectedPapers={SelectedPapers}
                    isSelected={isSelected}
                    removeGroupFromPaper={removeGroupFromPaper}
                    setSelectedPapers={setSelectedPapers}
                    groups={infoProp.Groups} // Pass groups to PaperDetails
                    />
                </Col>
            
            </Row>
        </Container>
    )
}