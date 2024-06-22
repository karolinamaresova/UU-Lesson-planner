import { useContext, useState } from "react";

import { UserListContext } from "./Context/UserListContext.js";
import { SubjectListContext } from "./Context/SubjectListContext.js";

import Button from "react-bootstrap/esm/Button.js";
import Container from "react-bootstrap/esm/Container.js";
import Icon from "@mdi/react";
import { mdiPlusBoxOutline, mdiPlusBoxMultipleOutline } from "@mdi/js";
import UserForm from "./UserForm.js";


export default function UserList() {
  const { userList } = useContext(UserListContext);
  const [showUserForm, setShowUserForm] = useState(false);
  const { subjectList } = useContext(SubjectListContext);

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <Button variant="success" onClick={() => setShowUserForm({})}>
          <Icon path={mdiPlusBoxOutline} size={1} color={"white"} /> Add user
        </Button>
        
      </div>
      {!!showUserForm ? (
        <UserForm user={showUserForm} setShowUserForm={setShowUserForm} />
      ) : null}
    
      <table className="table">
            <thead>
                <tr>
                    
                    <th>name</th>
                    <th>surname</th>
                    <th>email</th>
                    <th>role</th>
                    <th>subject ID</th>
                    
                    
                </tr>
            </thead>
            <tbody>         
            {userList.map((user) => (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.surname}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    
                    <td>{user.subject_id}</td>
                    
                </tr>

            ))}
            </tbody>
        </table>
    </Container>
  ); 
}