import React, { useState, useEffect } from 'react';
import { Container, Button, Card, Form, Modal, Row, Col } from 'react-bootstrap';
import axios from '../../common/AxiosInstance';
import { MdAdd, MdDelete, MdVisibility, MdArrowBack } from 'react-icons/md';

const TeacherHome = () => {
    const [courses, setCourses] = useState([]);
    const [viewingCourse, setViewingCourse] = useState(null);
    const [showAddCourse, setShowAddCourse] = useState(false);
    const [showAddSection, setShowAddSection] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [currentVideo, setCurrentVideo] = useState('');

    // Form states
    const [cTitle, setCTitle] = useState('');
    const [cDesc, setCDesc] = useState('');
    const [cCats, setCCats] = useState('');
    const [cPrice, setCPrice] = useState('');
    
    // Section Form
    const [sTitle, setSTitle] = useState('');
    const [sDesc, setSDesc] = useState('');
    const [sVideo, setSVideo] = useState(null);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const handleWatch = (videoUrl) => {
        const baseUrl = axios.defaults.baseURL.replace('/api', '');
        setCurrentVideo(`${baseUrl}/uploads/${videoUrl}`);
        setShowVideo(true);
    };

    const fetchCourses = async () => {
        try {
            const { data } = await axios.get('/courses');
            const myCourses = data.filter(c => c.userId === userInfo._id);
            setCourses(myCourses);
            if(viewingCourse) {
                const updated = myCourses.find(c => c._id === viewingCourse._id);
                setViewingCourse(updated);
            }
        } catch (error) {
            console.error(error);
        }
    };
    // ... skipping fetchCourses useEffect for brevity ...
    useEffect(() => {
        fetchCourses();
    }, []);

    // ... skipping other handlers ...

    if (viewingCourse) {
        return (
            <Container className="mt-5 py-4">
                <Button variant="link" className="text-decoration-none p-0 mb-4" onClick={() => setViewingCourse(null)}>
                    <MdArrowBack /> Back to Dashboard
                </Button>
                
                <div className="d-flex justify-content-between align-items-end mb-5">
                    <div>
                        <h1 className="display-4 fw-bold">{viewingCourse.C_title}</h1>
                        <p className="text-muted fs-5">{viewingCourse.C_description}</p>
                    </div>
                    <Button onClick={() => setShowAddSection(true)} className="auth-btn rounded-pill px-4">
                        <MdAdd /> Add Session
                    </Button>
                </div>

                <div className="section-grid">
                    {viewingCourse.sections?.map((section, idx) => (
                        <Card key={idx} className="glass-card section-card p-4">
                             <div>
                                <h4 className="fw-bold mb-3">Session {idx + 1}: {section.title}</h4>
                                <p className="text-secondary small">{section.description}</p>
                             </div>
                             {section.videoUrl && (
                                <Button 
                                    variant="link" 
                                    className="text-accent p-0 mt-3 align-self-start fw-bold small"
                                    onClick={() => handleWatch(section.videoUrl)}
                                >
                                    WATCH PREVIEW
                                </Button>
                             )}
                        </Card>
                    ))}
                    {(!viewingCourse.sections || viewingCourse.sections.length === 0) && (
                        <p className="text-muted italic">No sessions added yet.</p>
                    )}
                </div>

                {/* Video Player Modal */}
                <Modal show={showVideo} onHide={() => setShowVideo(false)} size="lg" centered className="glass-modal">
                    <Modal.Header closeButton className="border-0 pb-0">
                        <Modal.Title className="fw-bold">Session Preview</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-4">
                        <div className="ratio ratio-16x9 rounded-4 overflow-hidden shadow-lg bg-black">
                            {currentVideo ? (
                                <video controls autoPlay key={currentVideo}>
                                    <source src={currentVideo} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <div className="d-flex align-items-center justify-content-center h-100 text-white">
                                    No video available
                                </div>
                            )}
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal show={showAddSection} onHide={() => setShowAddSection(false)} centered className="glass-modal">
                    <Modal.Header closeButton className="border-0"><Modal.Title className="fw-bold">Add New Session</Modal.Title></Modal.Header>
                    <Modal.Body className="px-4 pb-4">
                        <Form onSubmit={handleAddSection}>
                            <Form.Group className="mb-3"><Form.Label className="small fw-bold">Session Title</Form.Label><Form.Control className="styled-input" value={sTitle} onChange={e=>setSTitle(e.target.value)} required/></Form.Group>
                            <Form.Group className="mb-3"><Form.Label className="small fw-bold">Description</Form.Label><Form.Control as="textarea" rows={3} className="styled-input" value={sDesc} onChange={e=>setSDesc(e.target.value)} required/></Form.Group>
                            <Form.Group className="mb-4"><Form.Label className="small fw-bold">Video File</Form.Label><Form.Control type="file" className="styled-input" onChange={e=>setSVideo(e.target.files[0])} /></Form.Group>
                            <Button type="submit" className="auth-btn w-100">Create Session</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Container>
        )
    }

    return (
        <Container className="mt-5 py-4">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1 className="fw-bold display-5">Teacher Dashboard</h1>
                <Button onClick={() => setShowAddCourse(true)} className="auth-btn px-4 rounded-pill">
                    <MdAdd className="me-2" /> Create Course
                </Button>
            </div>

            <Row>
                {courses.map(course => (
                    <Col key={course._id} md={4} className="mb-4">
                        <Card className="glass-card h-100 p-3">
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="fw-bold fs-4 mb-2">{course.C_title}</Card.Title>
                                <Card.Subtitle className="text-accent mb-3">{course.C_categories}</Card.Subtitle>
                                <Card.Text className="text-secondary small flex-grow-1">{course.C_description}</Card.Text>
                                <div className="mt-4 pt-3 border-top d-flex justify-content-between align-items-center">
                                    <span className="fw-bold text-success">${course.C_price}</span>
                                    <div className="d-flex gap-2">
                                        <Button variant="link" className="text-primary p-0" title="View Detail" onClick={() => setViewingCourse(course)}><MdVisibility size={24}/></Button>
                                        <Button variant="link" className="text-danger p-0" title="Delete" onClick={() => handleDelete(course._id)}><MdDelete size={24}/></Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
                {courses.length === 0 && <Col><p className="text-muted">No courses created yet. Start by clicking "Create Course".</p></Col>}
            </Row>

            <Modal show={showAddCourse} onHide={() => setShowAddCourse(false)} centered>
                <Modal.Header closeButton className="border-0"><Modal.Title className="fw-bold">New Course</Modal.Title></Modal.Header>
                <Modal.Body className="px-4 pb-4">
                    <Form onSubmit={handleCreateCourse}>
                        <Form.Group className="mb-3"><Form.Label className="small fw-bold">Course Title</Form.Label><Form.Control className="styled-input" value={cTitle} onChange={e=>setCTitle(e.target.value)} required/></Form.Group>
                        <Form.Group className="mb-3"><Form.Label className="small fw-bold">Description</Form.Label><Form.Control as="textarea" rows={2} className="styled-input" value={cDesc} onChange={e=>setCDesc(e.target.value)} required/></Form.Group>
                        <Row>
                            <Col><Form.Group className="mb-3"><Form.Label className="small fw-bold">Category</Form.Label><Form.Control className="styled-input" value={cCats} onChange={e=>setCCats(e.target.value)} required/></Form.Group></Col>
                            <Col><Form.Group className="mb-3"><Form.Label className="small fw-bold">Price ($)</Form.Label><Form.Control type="number" className="styled-input" value={cPrice} onChange={e=>setCPrice(e.target.value)} required/></Form.Group></Col>
                        </Row>
                        <Button type="submit" className="auth-btn w-100 mt-3">Publish Course</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default TeacherHome;
