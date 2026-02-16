import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/Training-Video.jpg';

const Home = () => {
    return (
        <div className="hero-section">
            <Container>
                <Row className="align-items-center" style={{ minHeight: 'calc(100vh - 80px)' }}>
                    <Col md={7}>
                        <div className="hero-content py-5">
                            <h1 className="display-1 fw-bolder mb-4 tracking-tighter" style={{ fontSize: 'clamp(3.5rem, 9vw, 6.5rem)' }}>
                                ONLINE <br/> 
                                <span className="text-accent">LEARNING.</span>
                            </h1>
                            <p className="fs-3 mb-5 pe-md-5 hero-text">
                                Master your future with LearnHub. Your ultimate center for skill enhancement and professional growth.
                            </p>
                            <div className="d-flex gap-4">
                                <Button as={Link} to="/register" size="lg" className="hero-btn rounded-pill px-5 py-3 shadow-lg">
                                    GET STARTED
                                </Button>
                                <Button as={Link} to="/login" variant="outline-primary" size="lg" className="rounded-pill px-5 py-3 border-2 fw-bold">
                                    LOGIN
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col md={5} className="d-none d-md-block">
                         <div className="hero-image-container ms-lg-5">
                            <img src={heroImg} alt="Online Learning" className="img-fluid floating-img" />
                         </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;
