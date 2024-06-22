import { useEffect, useState } from "react";
import { LessonListContext } from "../Context/LessonListContext";

export default function LessonListProvider({ children }) {
  const [lessonLoadObject, setLessonLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setLessonLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/lesson/list`, {
      method: "GET",
    });
    const responseJson = await response.json();
    console.log(responseJson);
    if (response.status < 400) {
        setLessonLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
        setLessonLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleCreate(dtoIn) {
    setLessonLoadObject((current) => ({ ...current, state: "pending" }));
    console.log(dtoIn);
    const response = await fetch(`http://localhost:8000/student/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();
    console.log(dtoIn);

    if (response.status < 400) {
        setLessonLoadObject((current) => {
        current.data.push(responseJson);
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
        setLessonLoadObject((current) => {
        return { state: "error", data: current.data, error: responseJson };
      });
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }


  const value = {
    state: lessonLoadObject.state,
    lessonList: lessonLoadObject.data || [],
    handlerMap: { handleCreate },
  };

  return (
    <LessonListContext.Provider value={value}>
      {children}
    </LessonListContext.Provider>
  );
}

