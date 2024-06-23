import { useContext, useState } from "react";
import Table from 'react-bootstrap/Table';

import { SubjectListContext } from "./Context/SubjectListContext.js";
import { ClassroomListContext } from "./Context/ClassroomListContext.js";


import Button from "react-bootstrap/esm/Button.js";
import Container from "react-bootstrap/esm/Container.js";
import Icon from "@mdi/react";
import { mdiPlusBoxOutline, mdiPlusBoxMultipleOutline } from "@mdi/js";
import SubjectForm from "./SubjectForm.js";

export default function SubjectList() {
  const { subjectList } = useContext(SubjectListContext);
  const { classroomList } = useContext(ClassroomListContext);
  
  const [showSubjectForm, setShowSubjectForm] = useState(false);

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <Button variant="success" onClick={() => setShowSubjectForm({})}>
          <Icon path={mdiPlusBoxOutline} size={1} color={"white"} /> Add subject
        </Button>
        
      </div>
      {!!showSubjectForm ? (
        <SubjectForm subject={showSubjectForm} setShowSubjectForm={setShowSubjectForm} />
      ) : null}
    
    <Table striped bordered hover responsive>
            <thead>
                <tr>
                    
                    <th>name</th>
                    <th>classroom ID</th>
                    
                </tr>
            </thead>
            <tbody>         
            {subjectList.map((subject) => (
                <tr key={subject.id}>
                    <td>{subject.name}</td>
                    <td>{classroomList.find(x => x.id === subject.classroom_id)?.label}</td>
                    
                </tr>

            ))}
            </tbody>
        </Table>
    </Container>
  ); 
}