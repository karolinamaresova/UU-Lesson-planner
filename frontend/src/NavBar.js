import React from "react";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav'

export default function NavBar() {
    return (
        <Nav fill variant="tabs" defaultActiveKey="/">
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