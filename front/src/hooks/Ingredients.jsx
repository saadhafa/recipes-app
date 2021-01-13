import {useReducer,useCallback} from 'react'
import { apiFetch } from '../util/apiFetch'

function reducer(state,action){
  switch(action.type){
    case 'FETCHING':
      return {...state,loading:true }
    case 'SET_ING':
      return {...state,ingredients: action.payload,loading:false}
      case 'DEL_ING':
        return {...state,ingredients: state.ingredients.filter(i => i.id !== action.payload)}
      case 'UP_ING':
         return {...state, ingredients: state.ingredients.map(i => i.id === action.target ? action.payload : i )}
      case 'ADD_ING':
        return {...state,ingredients: [action.payload,...state.ingredients]}
      default:
        throw new Error('Unknown action ',action.type)
         
  }
}



export function useIngredients(){

  const [state, dispatch] = useReducer(reducer,{
    ingredients: null,
    loading: false
  })

  return {

    ingredients: state.ingredients,
    fetchIngredients: useCallback(async function(){
      dispatch({type:"FETCHING"})
      
      if(state.loading){
        return
      }
      
      const request = await apiFetch('/ingredients')
      const ingredients = await  request.json()
      if(request.ok){
          dispatch({type:"SET_ING", payload: ingredients })
      }
    },[state ]),
    deleteiingredients: useCallback(async function(id){
      const request = await  apiFetch(`/ingredients/${id}`,{method:'DELETE'})
      if (request.ok){
        console.log('request -> ',request.ok)
        dispatch({type:'DEL_ING',payload:id})
      }
    },[]),

    updateIngredients: useCallback(async function (newIngredient,id){
        const request = await apiFetch(`/ingredients/${id}`,{method:'PUT',body: newIngredient})
        if(request.ok){
          dispatch({type:"UP_ING", target:id,payload: Object.fromEntries(newIngredient)})
        }
        
        return await request.json()

    },[]),
    createIngredients: useCallback(async function (newIngredient){
      const request = await apiFetch(`/ingredients`,{method:'POST',body: newIngredient})
      if(request.ok){
        newIngredient.append('id', parseInt(Math.random()))
        dispatch({type:"ADD_ING",payload: Object.fromEntries(newIngredient)})
      }
      
      return await request.json()
  },[])
}
  

}


