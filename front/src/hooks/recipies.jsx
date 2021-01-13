import {useReducer,useCallback} from 'react'
import { apiFetch } from '../util/apiFetch'


function reducer(state,action){
  switch(action.type){
    case 'FETCH_REC': 
    return {...state,lodding:true}
    case 'SET_REC':
      return {...state, lodding:false,recipes: action.payload}
      case 'SET_RECById':
        return {...state,recipe: action.payload}
      case 'CLOSE_RECById':
        return {...state, recipe:null}

  
    default:
    return new Error("UnKnown action ")
  }


}



export function useRecipies(){
 const [state, dispatch] = useReducer(reducer,{
   recipes: null,
   lodding:false,
   recipe:null
 })


  return {
    recipies:state.recipes,
    recipe:state.recipe,
    fetchRecipes: useCallback( async function(){
      dispatch({type:'FETCH_REC'})
      const request = await apiFetch('/recipes')
      const response = await request.json()
      if(request.ok){
        dispatch({type: 'SET_REC', payload:response})
      }
      return await response
    },[]),
    fetchOneRecipe: useCallback(async function(id){
      const request = await apiFetch(`/recipes/${id}`,{method:'GET'})
      const response = await request.json()
      if(request.ok){
        dispatch({type:'SET_RECById',payload:response})
      }
      return await response
    },[]),
    closeModal: useCallback(function (){
      dispatch({type:'CLOSE_RECById'})
    },[])
  }
}