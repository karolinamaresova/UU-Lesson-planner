import React from "react";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav'
import { IoSchoolOutline } from "react-icons/io5";
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';





export default function NavBar() {
    return (
        <Nav className="navbar" fill variant="pills" defaultActiveKey="/">
            <Nav.Item>
            <h1><IoSchoolOutline /></h1>
 
            </Nav.Item>
            <Nav.Item>
                <Link to="/" className="nav-link">LessonList</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/classroom" className="nav-link">ClassroomList</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/subject" className="nav-link">SubjectList</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/student" className="nav-link">StudentList</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/user" className="nav-link">UserList</Link>
            </Nav.Item>
            
        </Nav>
        
    )
}