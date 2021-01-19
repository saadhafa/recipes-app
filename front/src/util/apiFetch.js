export const apiFetch = async (enpoint, obj = {},headerType = false) =>{

   let options = {
    credentials: 'include',
    headers: {
      Accept: 'application/json'
    },
    ...obj
  }

  if(headerType){
    options.headers['content-type'] = 'application/json'
  }
  const request  = await fetch(`http://localhost:3333${enpoint}`,options)
  return request
}