import { useContext, useState } from "react";

import { ClassroomListContext } from "./Context/ClassroomListContext.js";

import Button from "react-bootstrap/esm/Button.js";
import Container from "react-bootstrap/esm/Container.js";
import Icon from "@mdi/react";
import { mdiPlusBoxOutline, mdiPlusBoxMultipleOutline } from "@mdi/js";
import ClassroomForm from "./ClassroomForm.js";

export default function ClassroomList() {
  const { classroomList } = useContext(ClassroomListContext);
  const [showClassroomForm, setShowClassroomForm] = useState(false);

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <Button variant="success" onClick={() => setShowClassroomForm({})}>
          <Icon path={mdiPlusBoxOutline} size={1} color={"white"} /> Add classroom
        </Button>
        
      </div>
      {!!showClassroomForm ? (
        <ClassroomForm classroom={showClassroomForm} setShowClassroomForm={setShowClassroomForm} />
      ) : null}
    
      <table className="table">
            <thead>
                <tr>
                    <th>Label</th>
                    
                </tr>
            </thead>
            <tbody>         
            {classroomList.map((classroom) => (
                <tr key={classroom.id}>
                    <td>{classroom.label}</td>
                    
                </tr>

            ))}
            </tbody>
        </table>
    </Container>
  ); 
}