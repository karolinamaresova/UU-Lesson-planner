import { useContext, useState } from "react";
import { ClassroomListContext } from "./Context/ClassroomListContext.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

export default function ClassroomForm({ setShowClassroomForm }) {
  const { state, handlerMap } = useContext(ClassroomListContext);
  const [showAlert, setShowAlert] = useState(null);
  const isPending = state === "pending";

  return (
    <Modal show={true} onHide={() => setShowClassroomForm(false)}>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          var formData = Object.fromEntries(new FormData(e.target));
          // formData.date = new Date(formData.date).toISOString();
          try {
           await handlerMap.handleCreate(formData);
        
        setShowClassroomForm(false);
          } catch (e) {
            console.error(e);
            setShowAlert(e.message);
          }
        }}
      >
        <Modal.Header>
          <Modal.Title>Create</Modal.Title>
          <CloseButton onClick={() => setShowClassroomForm(false)} />
        </Modal.Header>
        <Modal.Body style={{ position: "relative" }}>
          <Alert
            show={!!showAlert}
            variant="danger"
            dismissible
            onClose={() => setShowAlert(null)}
          >
            <Alert.Heading>Failed to create classroom.</Alert.Heading>
            <pre>{showAlert}</pre>
          </Alert>

          {isPending ? (
            <div style={pendingStyle()}>
              <Icon path={mdiLoading} size={2} spin />
            </div>
          ) : null}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Label</Form.Label>
            <Form.Control
              type="text"
              name="label"
              required

            />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowFormClassroom(false)}
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





