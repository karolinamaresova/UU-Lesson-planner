import { useEffect, useState } from "react";
import { ClassroomListContext } from "../Context/ClassroomListContext";


export default function ClassroomListProvider({ children }) {
  const [classroomLoadObject, setClassroomLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setClassroomLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/classroom/list`, {
      method: "GET",
    });
    const responseJson = await response.json();
    console.log(responseJson);
    if (response.status < 400) {
      setClassroomLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setClassroomLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleCreate(dtoIn) {
    setClassroomLoadObject((current) => ({ ...current, state: "pending" }));
    console.log(dtoIn);
    const response = await fetch(`http://localhost:8000/classroom/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();
    console.log(dtoIn);

    if (response.status < 400) {
      setClassroomLoadObject((current) => {
        current.data.push(responseJson);
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setClassroomLoadObject((current) => {
        return { state: "error", data: current.data, error: responseJson };
      });
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }


  const value = {
    state: classroomLoadObject.state,
    classroomList: classroomLoadObject.data || [],
    handlerMap: { handleCreate },
  };

  return (
    <ClassroomListContext.Provider value={value}>
      {children}
    </ClassroomListContext.Provider>
  );
}

