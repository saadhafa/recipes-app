export const apiFetch = async (enpoint, obj = {}) =>{

  const request  = await fetch(`http://localhost:3333${enpoint}`,{
    credentials: 'include',
    headers: {
      Accept: 'application/json'
    },
    ...obj
  })
  return request
}