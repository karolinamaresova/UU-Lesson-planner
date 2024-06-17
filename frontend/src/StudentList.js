import { useContext, useState } from "react";

import { StudentListContext } from "./Context/StudentListContext.js";

import Button from "react-bootstrap/esm/Button.js";
import Container from "react-bootstrap/esm/Container.js";
import Icon from "@mdi/react";
import { mdiPlusBoxOutline, mdiPlusBoxMultipleOutline } from "@mdi/js";
import StudentForm from "./StudentForm.js";

export default function StudentList() {
  const { studentList } = useContext(StudentListContext);
  const [showStudentForm, setShowStudentForm] = useState(false);

// výpis studentů v tabulce
  /*return (
    <div>
        <h1>Student List</h1>
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Email</th>
                    <th>Date of birth</th>
                </tr>
            </thead>
            <tbody>         
            {studentList.map((student) => (
                <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.surname}</td>
                    <td>{student.email}</td>
                    <td>{student.date_of_birth}</td>
                </tr>

            ))}
            </tbody>
        </table>
    </div>
  );
  */

  // přidání studenta

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <Button variant="success" onClick={() => setShowStudentForm({})}>
          <Icon path={mdiPlusBoxOutline} size={1} color={"white"} /> Add student
        </Button>
        
      </div>
      {!!showStudentForm ? (
        <StudentForm student={showStudentForm} setShowStudentForm={setShowStudentForm} />
      ) : null}
    
      <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Email</th>
                    <th>Date of birth</th>
                </tr>
            </thead>
            <tbody>         
            {studentList.map((student) => (
                <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.surname}</td>
                    <td>{student.email}</td>
                    <td>{student.date_of_birth}</td>
                </tr>

            ))}
            </tbody>
        </table>
    </Container>
  ); 
}