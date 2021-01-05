import React, {useEffect, useState} from 'react'
import { LoginForm } from './component/LoginForm';
import { Site } from './component/Site';
import { apiFetch } from './util/apiFetch';


export default function App() {

  const [user, setUser] = useState(null)

  useEffect( () => {

      // fetching userData if user is connecter
     const featchUserData = async ()=> {

      const request = await  apiFetch('/me', { method:'GET'})
      if(request.ok){
        const response = await request.json()
        setUser(response)
      }
    }

    featchUserData()

  },[])

  if (user === null){
    return null
  }

  return (
    <div className="App">

        { user ?  <Site/> : <LoginForm setUser={setUser}/>}
        
    </div>
  );
}

