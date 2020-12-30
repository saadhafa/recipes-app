import React, {useEffect, useState} from 'react'
import { LoginForm } from './component/LoginForm';
import { apiFetch } from './util/apiFetch';


export default function App() {

  const [user, setUser] = useState(null)

  useEffect( () => {

    const dataFetch = async ()=> {

      const request = await  apiFetch('/me', { method:'GET'})
      if(request.ok){
        const response = await request.json()
        setUser(response)
      }
    }
    dataFetch()
  },[])


  if(user === null){
    return null
  }
  return (
    <div className="App">
        <main className="container">

        { user ? <h1>welcome page </h1>  : <LoginForm setUser={setUser}/>}

        </main>
        


    </div>
  );
}

