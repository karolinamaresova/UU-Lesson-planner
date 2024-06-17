import { useEffect, useState } from "react";
import { StudentListContext } from "../Context/StudentListContext";

export default function StudentListProvider({ children }) {
  const [eventLoadObject, setEventLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setEventLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/student/list`, {
      method: "GET",
    });
    const responseJson = await response.json();
    console.log(responseJson);
    if (response.status < 400) {
      setEventLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setEventLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleCreate(dtoIn) {
    setEventLoadObject((current) => ({ ...current, state: "pending" }));
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
      setEventLoadObject((current) => {
        current.data.push(responseJson);
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setEventLoadObject((current) => {
        return { state: "error", data: current.data, error: responseJson };
      });
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }


  const value = {
    state: eventLoadObject.state,
    studentList: eventLoadObject.data || [],
    handlerMap: { handleCreate },
  };

  return (
    <StudentListContext.Provider value={value}>
      {children}
    </StudentListContext.Provider>
  );
}

