import React, {useEffect, useState} from 'react'
import { LoginForm } from './component/LoginForm';
import { Site } from './component/Site';
import { apiFetch } from './util/apiFetch';


export default function App() {

  const [user, setUser] = useState(null)

  useEffect( () => {

  apiFetch('/me', { method:'GET'}).then((response) => {
    if(response.ok){
      response.json().then(setUser)
    }else{
      setUser(false)
    }
    

  }).catch(() => setUser(false))

  
  },[])


console.log('user ->',user)

if(user === null){
  return null
}



  return (
    user ? <Site/> : <LoginForm setUser={setUser}/>
  );
}

