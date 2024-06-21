import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import StudentList from "./StudentList";
import StudentListProvider from "./Providers/StudentListProvider";
import LessonList from "./LessonList";
import LessonListProvider from "./Providers/LessonListProvider";
import SubjectList from "./SubjectList";
import SubjectListProvider from "./Providers/SubjectListProvider";
import UserList from "./UserList";
import UserListProvider from "./Providers/UserListProvider";
import ClassroomList from "./ClassroomList";
import ClassroomListProvider from "./Providers/ClassroomListProvider";
//import { SubjectListContext } from "./Context/SubjectListContext";






export default function App() {
  return (
<UserListProvider> 
 <ClassroomListProvider> 
   <SubjectListProvider>
     <LessonListProvider>
      <StudentListProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<LessonList />} />
                  <Route path="lesson" element={<LessonList />} />
                  <Route path="classroom" element={<ClassroomList />} />
                  <Route path="subject" element={<SubjectList />} />
                  <Route path="student" element={<StudentList />} />
                  <Route path="user" element={<UserList />} />
                  <Route path="*" element={"not found"} />
  
              </Route>
            </Routes>
          </BrowserRouter>
       </StudentListProvider>
     </LessonListProvider>
   </SubjectListProvider>
 </ClassroomListProvider>
</UserListProvider>

  );
}