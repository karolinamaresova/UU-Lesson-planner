

import { useContext, useState } from "react";
import Table from 'react-bootstrap/Table';

import { LessonListContext } from "./Context/LessonListContext.js";
import { UserListContext } from "./Context/UserListContext.js";
import { StudentListContext } from "./Context/StudentListContext.js";
import { SubjectListContext } from "./Context/SubjectListContext.js";
import { ClassroomListContext } from "./Context/ClassroomListContext.js";


import Button from "react-bootstrap/esm/Button.js";
import Container from "react-bootstrap/esm/Container.js";
import Icon from "@mdi/react";
import { mdiPlusBoxOutline, mdiPlusBoxMultipleOutline } from "@mdi/js";
import LessonForm from "./LessonForm.js";




export default function LessonList() {
  const { lessonList } = useContext(LessonListContext);
  const { userList } = useContext(UserListContext);
  const { studentList } = useContext(StudentListContext);
  const { subjectList } = useContext(SubjectListContext);
  const { classroomList } = useContext(ClassroomListContext);
  
  const [showLessonForm, setShowLessonForm] = useState(false);

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <Button variant="success" onClick={() => setShowLessonForm({})}>
          <Icon path={mdiPlusBoxOutline} size={1} color={"white"} /> Add lesson
        </Button>
        
      </div>
      {!!showLessonForm ? (
        <LessonForm lesson={showLessonForm} setShowLessonForm={setShowLessonForm} />
      ) : null}


<Table striped bordered hover responsive>
          <thead>
                <tr>
                    
                    <th>Teacher </th>
                    <th>Student </th>
                    <th>Subject </th>
                    <th>Classroom </th>
                    <th>Lesson Date</th>
                    <th>Duration</th>
                    <th>Note</th>
                </tr>
            </thead>
            <tbody>         
            {lessonList.map((lesson) => (
                <tr key={lesson.id}>
                    <td>{userList.find(x => x.id === lesson.user_id)?.name} {userList.find(x => x.id === lesson.user_id)?.surname}</td>
                    <td>{studentList.find(x => x.id === lesson.student_id)?.surname}</td>
                    <td>{subjectList.find(x => x.id === lesson.subject_id)?.name}</td>
                    <td>{classroomList.find(x => x.id === lesson.classroom_id)?.label}</td>
                    <td>{lesson.datetime}</td>
                    <td>{lesson.duration}</td>
                    <td>{lesson.note}</td>
                </tr>

            ))}
            </tbody>
        </Table>
    </Container>
  ); 
}