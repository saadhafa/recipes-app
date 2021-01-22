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
      case 'ADD_REC': 
        return {...state, recipes:[...state.recipes,action.payload]}
      case 'DEL_REC': 
        return {...state, recipes: state.recipes.filter(i => i.id !== action.payload)}

  
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
    },[]),
    CreateRecipes: useCallback(async function(data){
      const request = await apiFetch('/recipes', {method:'POST',body:JSON.stringify(data)},true)
      if(request.ok){
        dispatch({type:'ADD_REC',payload:data})
      }
      const response = (await request).json()
      return response
    }),
    DeleteRecipes: useCallback(async function(id){
      console.log(id)
      const request = await apiFetch(`/recipes/${id}`, {method:'DELETE'})
      
      if(request.ok){
        dispatch({type:'DEL_REC',payload:id})
      }else{
        // that because the server does not return status of the request 
        return {
          message: 'Could not delete item'
        }
      }

    })
  }
}