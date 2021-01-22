import {useState,useCallback} from 'react'



export function useToggler(init = false){
  const [toggle,setToggle] = useState(init)

  return [toggle,useCallback(() => setToggle(!toggle),[toggle])]
}