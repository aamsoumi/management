import React from "react";
import Visualization from "./Visualization";
import "../App.css";
import "../bootstrap.css";
import {Col, Row,Container} from "react-bootstrap";
export default function Layout() {

    return (
        <Container fluid="md">
        <Row>
            <Col className="leftArea" md={3}><b>Documents</b></Col>
            <Col className="rightArea"><Visualization/></Col>
        </Row>
        </Container>
    )
}