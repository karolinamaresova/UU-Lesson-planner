import { useEffect, useState } from "react";
import { SubjectListContext } from "../Context/SubjectListContext";


export default function SubjectListProvider({ children }) {
  const [subjectLoadObject, setSubjectLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setSubjectLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/subject/list`, {
      method: "GET",
    });
    const responseJson = await response.json();
    console.log(responseJson);
    if (response.status < 400) {
      setSubjectLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setSubjectLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleCreate(dtoIn) {
    setSubjectLoadObject((current) => ({ ...current, state: "pending" }));
    console.log(dtoIn);
    const response = await fetch(`http://localhost:8000/subject/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();
    console.log(dtoIn);

    if (response.status < 400) {
      setSubjectLoadObject((current) => {
        current.data.push(responseJson);
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setSubjectLoadObject((current) => {
        return { state: "error", data: current.data, error: responseJson };
      });
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }


  const value = {
    state: subjectLoadObject.state,
    subjectList: subjectLoadObject.data || [],
    handlerMap: { handleCreate },
  };

  return (
    <SubjectListContext.Provider value={value}>
      {children}
    </SubjectListContext.Provider>
  );
}

