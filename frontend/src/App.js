import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import StudentList from "./StudentList";
import StudentListProvider from "./Providers/StudentListProvider";


export default function App() {
  return (
    <StudentListProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<StudentList />} />
                <Route path="*" element={"not found"} />
            </Route>
          </Routes>
        </BrowserRouter>
    </StudentListProvider>
  );
}