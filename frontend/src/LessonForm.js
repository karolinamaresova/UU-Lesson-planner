import { useContext, useState } from "react";
import { LessonListContext } from "./Context/LessonListContext.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import { StudentListContext } from "./Context/StudentListContext.js";
import { UserListContext } from "./Context/UserListContext.js";
import { SubjectListContext } from "./Context/SubjectListContext.js";
import { ClassroomListContext } from "./Context/ClassroomListContext.js";




export default function LessonForm({ setShowLessonForm }) {
  const { state, handlerMap } = useContext(LessonListContext);
  const { studentList } = useContext(StudentListContext);
  const { subjectList } = useContext(SubjectListContext);
  const { userList } = useContext(UserListContext);
  const { classroomList } = useContext(ClassroomListContext);
  const [showAlert, setShowAlert] = useState(null);
  const isPending = state === "pending";

  return (
    <Modal show={true} onHide={() => setShowLessonForm(false)}>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          var formData = Object.fromEntries(new FormData(e.target));
          formData.duration = (Number(formData.duration));
          try {
           await handlerMap.handleCreate(formData);
        
        setShowLessonForm(false);
          } catch (e) {
            console.error(e);
            setShowAlert(e.message);
          }
        }}
      >
        <Modal.Header>
          <Modal.Title>Create</Modal.Title>
          <CloseButton onClick={() => setShowLessonForm(false)} />
        </Modal.Header>
        <Modal.Body style={{ position: "relative" }}>
          <Alert
            show={!!showAlert}
            variant="danger"
            dismissible
            onClose={() => setShowAlert(null)}
          >
            <Alert.Heading>Failed to create lesson.</Alert.Heading>
            <pre>{showAlert}</pre>
          </Alert>

          {isPending ? (
            <div style={pendingStyle()}>
              <Icon path={mdiLoading} size={2} spin />
            </div>
          ) : null}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>User ID</Form.Label>
            <Form.Select
              type="select"
              name="user_id"
              required

            >
              {userList.map((user) => (
              <option key={user.id} value={user.id}>{user.name} {user.surname}</option>
          ))} 
              
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Student ID</Form.Label>
            <Form.Select
              type="select"
              name="student_id"
              required
            >
                {studentList.map((student) => (
                    <option key={student.id} value={student.id}>{student.name} {student.surname}</option>
                ))} 

            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Subject ID</Form.Label>
            <Form.Select
              type="select"
              name="subject_id"
              required
             
            >
                {subjectList.map((subject) => (
                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Classroom ID</Form.Label>
            <Form.Select
              type="select"
              name="classroom_id"
              required
             
            >
                {classroomList.map((classroom) => (
                    <option key={classroom.id} value={classroom.id}>{classroom.label} </option>
                ))} 
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Lesson Date</Form.Label>
            <Form.Control
              type="datetime-local"
              name="datetime"
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="number"
              name="duration"
              required
              
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Note</Form.Label>
            <Form.Control
              type="text"
              name="note"
              //required
              
            />
          </Form.Group>
          
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowFormLesson(false)}
            disabled={isPending}
          >
            Close
          </Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            Create
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

function pendingStyle() {
  return {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    opacity: "0.5",
  };
}





