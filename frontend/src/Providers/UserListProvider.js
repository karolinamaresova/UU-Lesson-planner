import { useEffect, useState } from "react";
import { UserListContext } from "../Context/UserListContext";


export default function UserListProvider({ children }) {
  const [userLoadObject, setUserLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setUserLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/user/list`, {
      method: "GET",
    });
    const responseJson = await response.json();
    console.log(responseJson);
    if (response.status < 400) {
      setUserLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setUserLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleCreate(dtoIn) {
    setUserLoadObject((current) => ({ ...current, state: "pending" }));
    console.log(dtoIn);
    const response = await fetch(`http://localhost:8000/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();
    console.log(dtoIn);

    if (response.status < 400) {
      setUserLoadObject((current) => {
        current.data.push(responseJson);
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setUserLoadObject((current) => {
        return { state: "error", data: current.data, error: responseJson };
      });
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }


  const value = {
    state: userLoadObject.state,
    userList: userLoadObject.data || [],
    handlerMap: { handleCreate },
  };

  return (
    <UserListContext.Provider value={value}>
      {children}
    </UserListContext.Provider>
  );
}

