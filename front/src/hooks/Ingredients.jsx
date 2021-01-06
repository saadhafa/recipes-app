import {useReducer} from 'react'
import { apiFetch } from '../util/apiFetch'

function reducer(state,action){
  switch(action.type){
    case 'FETCHING':
      return {...state,loading:true }
    case 'SET_ING':
      return {...state,ingredients: action.payload,loading:false}
      case 'DEL_ING':
        return {...state,ingredients: state.ingredients.filter(i => i.id !== action.payload)}
  
  }
}




export function useIngredients(){
  const [state, dispatch] = useReducer(reducer,{
    ingredients: null,
    loading: false
  })

  return {

    ingredients: state.ingredients,
    fetchIngredients: async function(){
      dispatch({type:"FETCHING"})
      
      if(state.loading || state.ingredients){
        return
      }
      
      const request = await apiFetch('/ingredients')
      const ingredients = await  request.json()
      if(request.ok){
          dispatch({type:"SET_ING", payload: ingredients })
      }
    },
    deleteiingredients: async function(id){
      const request = await  apiFetch(`/ingredients/${id}`,{method:'DELETE'})
      if (request.ok){
        console.log('request -> ',request.ok)
        dispatch({type:'DEL_ING',payload:id})
      }
    }
  }


}


