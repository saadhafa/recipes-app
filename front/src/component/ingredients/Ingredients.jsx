import {useState} from 'react'
import { Loader } from '../../UI/loader'

export function Ingredients({ingredients,onDelete}){
  return (
   <>
    <h2>List des ingredients</h2>
    {ingredients === null ? <Loader/> : <IngredientList onDelete={onDelete} ingredients={ingredients} />  }
   </>
  )
}

function IngredientList({ingredients,onDelete}){

return (
  <ul>
    { ingredients.map(ingredient => <IngredientRow key={ingredient.id} onDelete={onDelete} ingredient={ingredient}/>)}
  </ul>

)
}


function IngredientRow({ingredient,onDelete}){
  const [loadding, setLoading] = useState(false)
  const handleDelete = function(e){
    e.preventDefault()
    setLoading(true)
    onDelete(ingredient.id)
  }
  return <li>
    {ingredient.title}
    <button className="btn btn-danger" onClick={handleDelete} disabled={loadding}>Delete</button>
    </li>
}