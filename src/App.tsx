import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import KeyCloakService from './Services/KeycloakService';
import HttpService from './Services/HttpService';

interface IBaseModel {
  id?: number,
  createdAt: Date,
  updatedAt: Date,
  userId: string
}

interface IOrganization extends IBaseModel {
  name: string
}

function App() {

  const [organizations, setOrganizations] = useState<IOrganization[]>([])

  const getOrganizations = () => {
    HttpService.getAxiosClient()
    .get("https://localhost:7071/api/Organizations")
    .then((response) => setOrganizations(response.data as IOrganization[]))
  }

  const postOrganizations = () => {
    const organization: IOrganization = {
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: KeyCloakService.GetUserName(),
      name: "React"
    }
    HttpService.getAxiosClient()
    .post("https://localhost:7071/api/Organizations", organization)
    .then((response) => console.log(response.data))
    .catch(err => console.log(err))
  }

  // console.log(isLoggedIn())
  // console.log(currentInstance())

  return (
    <div className="App">
      <div>welcome to applications</div>
      <div>{KeyCloakService.GetUserName()}</div>
      <button onClick={() => getOrganizations()}>Get Organizations</button>
      <button onClick={() => postOrganizations()}>Post Organization</button>
      <button onClick={() => KeyCloakService.CallLogout()}>Logout</button>
      {organizations && organizations.map((organization => {
        return <h3 key={organization.id}>{organization.name}</h3>
      }))}
    </div>
  );
}

export default App;
