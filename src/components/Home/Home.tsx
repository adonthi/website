import React from 'react';
import './Home.css';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';

function Home() {
  return (
    <Container fluid className="home-container">
      <Row>
        <Col xs={6} lg={6} className="home-panel left-panel">
          <h1>
            Hi, I&apos;m
            <br />
            Abhay.
          </h1>
        </Col>
        <Col className="home-panel right-panel">
          <h2 className="content">
            This is my website
            <br />
            with cool fancy stuff
            <br />
            that I&apos;ve done.
          </h2>
        </Col>
      </Row>
      <Row className="home-body-content">
        <Col>
          <h3>So here&apos;s the first thing!</h3>
          <Button className="project-button" variant="light" href="/plant">
            <h4>My first thing!</h4>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
