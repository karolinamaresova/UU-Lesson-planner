import { useContext, useState } from "react";
import { UserListContext } from "./Context/UserListContext.js";
import { SubjectListContext } from "./Context/SubjectListContext.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

export default function UserForm({ setShowUserForm }) {
  const { state, handlerMap } = useContext(UserListContext);
  const { subjectList } = useContext(SubjectListContext);
  const [showAlert, setShowAlert] = useState(null);
  const isPending = state === "pending";

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    role: "",
    subject_id: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (event) => {
    const subjectId = event.target.value;
    if (event.target.checked) {
      setFormData({
        ...formData,
        subject_id: [...formData.subject_id, subjectId]
      });
    } else {
      setFormData({
        ...formData,
        subject_id: formData.subject_id.filter((id) => id !== subjectId)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handlerMap.handleCreate(formData);
      setShowUserForm(false);
    } catch (error) {
      console.error(error);
      setShowAlert(error.message);
    }
  };

  return (
    <Modal show={true} onHide={() => setShowUserForm(false)}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>Create</Modal.Title>
          <CloseButton onClick={() => setShowUserForm(false)} />
        </Modal.Header>
        <Modal.Body style={{ position: "relative" }}>
          <Alert
            show={!!showAlert}
            variant="danger"
            dismissible
            onClose={() => setShowAlert(null)}
          >
            <Alert.Heading>Failed to create user.</Alert.Heading>
            <pre>{showAlert}</pre>
          </Alert>

          {isPending && (
            <div style={pendingStyle()}>
              <Icon path={mdiLoading} size={2} spin />
            </div>
          )}

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicSurname">
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicSubjectId">
            <Form.Label>Subject ID</Form.Label>
            {subjectList.map((subject) => (
              <Form.Check
                key={subject.id}
                type="checkbox"
                id={`subject-${subject.id}`}
                label={subject.name}
                value={subject.id}
                checked={formData.subject_id.includes(subject.id)}
                onChange={handleCheckboxChange}
              />
            ))}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowUserForm(false)}
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
