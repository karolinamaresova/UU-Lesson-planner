import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import StudentList from "./StudentList";
import StudentListProvider from "./Providers/StudentListProvider";
import LessonList from "./LessonList";
import LessonListProvider from "./Providers/LessonListProvider";
import SubjectListProvide from "./Providers/SubjectListProvider";
import { SubjectListContext } from "./Context/SubjectListContext";


export default function App() {
  return (
  <SubjectListProvide>
    <LessonListProvider>
      <StudentListProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<StudentList />} />
                  <Route path="lesson" element={<LessonList />} />
                  <Route path="*" element={"not found"} />
              </Route>
            </Routes>
          </BrowserRouter>
      </StudentListProvider>
    </LessonListProvider>
  </SubjectListProvide>
  );
}