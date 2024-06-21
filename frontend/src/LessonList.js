import { useContext, useState } from "react";

import { LessonListContext } from "./Context/LessonListContext.js";

import Button from "react-bootstrap/esm/Button.js";
import Container from "react-bootstrap/esm/Container.js";
import Icon from "@mdi/react";
import { mdiPlusBoxOutline, mdiPlusBoxMultipleOutline } from "@mdi/js";
import LessonForm from "./LessonForm.js";

export default function LessonList() {
  const { lessonList } = useContext(LessonListContext);
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
    
      <table className="table">
            <thead>
                <tr>
                    
                    <th>User ID</th>
                    <th>Student ID</th>
                    <th>Subject ID</th>
                    <th>Classroom ID</th>
                    <th>Lesson Date</th>
                    <th>Duration</th>
                    <th>Note</th>
                </tr>
            </thead>
            <tbody>         
            {lessonList.map((lesson) => (
                <tr key={lesson.id}>
                    <td>{lesson.user_id}</td>
                    <td>{lesson.student_id}</td>
                    <td>{lesson.subject_id}</td>
                    <td>{lesson.classroom_id}</td>
                    <td>{lesson.lesson_date}</td>
                    <td>{lesson.duration}</td>
                    <td>{lesson.note}</td>
                </tr>

            ))}
            </tbody>
        </table>
    </Container>
  ); 
}