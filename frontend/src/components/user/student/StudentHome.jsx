import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import axios from '../../common/AxiosInstance';
import { MdSearch, MdVisibility, MdArrowBack } from 'react-icons/md';

const StudentHome = () => {
    const [courses, setCourses] = useState([]);
    const [filter, setFilter] = useState('');
    const [viewingCourse, setViewingCourse] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await axios.get('/courses');
                setCourses(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCourses();
    }, []);

    const filteredCourses = courses.filter(c => 
        c.C_title.toLowerCase().includes(filter.toLowerCase()) || 
        c.C_categories.toLowerCase().includes(filter.toLowerCase())
    );

    if (viewingCourse) {
        return (
            <Container className="mt-5 py-4">
                <Button variant="link" className="text-decoration-none p-0 mb-4" onClick={() => setViewingCourse(null)}>
                    <MdArrowBack /> Back to Course Catalog
                </Button>
                
                <h1 className="fw-bold display-4 mb-2">{viewingCourse.C_title}</h1>
                <p className="text-secondary fs-5 mb-5">{viewingCourse.C_description}</p>

                <h3 className="fw-bold mb-4">Course Sessions</h3>
                <div className="section-grid">
                    {viewingCourse.sections?.map((section, idx) => (
                        <Card key={idx} className="glass-card section-card p-4">
                             <div>
                                <h4 className="fw-bold mb-3">{idx + 1}. {section.title}</h4>
                                <p className="text-secondary small">{section.description}</p>
                             </div>
                             <Button variant="link" className="text-accent p-0 mt-3 align-self-start fw-bold small">
                                 WATCH NOW
                             </Button>
                        </Card>
                    ))}
                    {(!viewingCourse.sections || viewingCourse.sections.length === 0) && (
                        <p className="text-muted italic">No sessions available for this course.</p>
                    )}
                </div>
            </Container>
        )
    }

    return (
        <Container className="mt-5 py-4">
            <h1 className="fw-bold display-5 mb-5">Explore Courses</h1>
            
            <div className="glass-card p-3 mb-5 d-flex align-items-center">
                <MdSearch className="ms-3 text-muted" size={24} />
                <Form.Control 
                    type="text" 
                    placeholder="Search by title or category..." 
                    className="styled-input border-0 bg-transparent flex-grow-1"
                    style={{ background: 'transparent !important', boxShadow: 'none !important' }}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>

            <Row>
                {filteredCourses.map(course => (
                    <Col key={course._id} md={4} className="mb-4">
                        <Card className="glass-card h-100 p-3">
                            <Card.Body className="d-flex flex-column gap-2">
                                <div className="d-flex justify-content-between align-items-start">
                                    <Card.Title className="fw-bold fs-4">{course.C_title}</Card.Title>
                                    <span className="badge rounded-pill bg-light text-primary px-3 py-2 small">{course.C_categories}</span>
                                </div>
                                <Card.Text className="text-secondary small flex-grow-1 mt-2">
                                    {course.C_description.length > 120 ? course.C_description.substring(0, 120) + '...' : course.C_description}
                                </Card.Text>
                                <div className="mt-4 pt-3 border-top d-flex justify-content-between align-items-center">
                                    <div>
                                        <span className="text-muted small d-block">Price</span>
                                        <span className="fw-bold fs-5 text-accent">${course.C_price}</span>
                                    </div>
                                    <Button className="auth-btn rounded-pill px-4" onClick={() => setViewingCourse(course)}>
                                        Details
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default StudentHome;
