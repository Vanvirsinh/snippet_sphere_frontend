import React from 'react';
import { useParams } from 'react-router-dom';

function Dashboard() {

    const { username } = useParams();

  return (
    <>
    <h1>Welcome to Snippet Sphere, {username}</h1>
    </>
  )
}

export default Dashboard;