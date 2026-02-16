import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import axios from './AxiosInstance';
import { useNavigate, Link } from 'react-router-dom';
import registerImg from '../../assets/main.jpg';

import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [type, setType] = useState('student');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/users/register', { name, email, password, type });
            localStorage.setItem('userInfo', JSON.stringify(data));
            localStorage.setItem('token', data.token);

            if (data.type === 'teacher') navigate('/teacher');
            else if (data.type === 'student') navigate('/student');
            else if (data.type === 'admin') navigate('/admin');
            else navigate('/');
            
        } catch (err) {
            setError(err.response?.data || 'An error occurred');
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card glass-card">
                <Row className="g-0 h-100">
                    <Col md={6} className="d-none d-md-block p-0 overflow-hidden">
                        <img 
                            src={registerImg} 
                            alt="Register Illustration" 
                            className="auth-illustration-img"
                        />
                    </Col>
                    <Col md={6} className="d-flex align-items-center justify-content-center p-4 p-lg-5 bg-light-alt">
                        <div className="w-100" style={{ maxWidth: '400px' }}>
                            <div className="text-center mb-4">
                                <h1 className="fw-bold text-primary mb-1">LearnHub</h1>
                                <p className="text-muted">Create your account</p>
                            </div>

                            {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

                            <Form onSubmit={submitHandler}>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label className="small fw-bold text-muted text-uppercase mb-2">Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter name" 
                                        className="styled-input"
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label className="small fw-bold text-muted text-uppercase mb-2">Email ID</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Enter email" 
                                        className="styled-input"
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3 position-relative" controlId="password">
                                    <Form.Label className="small fw-bold text-muted text-uppercase mb-2">Password</Form.Label>
                                    <div className="position-relative">
                                        <Form.Control 
                                            type={showPassword ? "text" : "password"} 
                                            placeholder="**********" 
                                            className="styled-input pe-5"
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)} 
                                        />
                                        <span 
                                            className="password-toggle-icon"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                        </span>
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="type">
                                    <Form.Label className="small fw-bold text-muted text-uppercase mb-2">Register as</Form.Label>
                                    <Form.Select className="styled-select" value={type} onChange={(e) => setType(e.target.value)}>
                                        <option value="student">Student</option>
                                        <option value="teacher">Teacher</option>
                                    </Form.Select>
                                </Form.Group>

                                <div className="d-grid mt-4">
                                    <Button variant="primary" type="submit" className="auth-btn">
                                        Register
                                    </Button>
                                </div>
                                
                                <div className="text-center mt-3">
                                    <p className="small text-muted">Already have an account? <Link to="/login" className="text-decoration-none fw-bold">Login</Link></p>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Register;
