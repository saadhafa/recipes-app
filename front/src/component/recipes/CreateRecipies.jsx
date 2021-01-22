import {useState,memo,useCallback} from 'react'
import { Loader } from '../../UI/loader'


const useCreateingredients = () => {
  const [state,setState] = useState([])


  return {
    ingredients: state,
    AddIngredient: useCallback(function(ingredient){
      ingredient.quantity = 0
      setState([...state.filter(i => i.id !== ingredient.id),ingredient])
    },[state]),
    DeleteIng: useCallback(function(id) {
      setState([...state.filter(i => i.id !== id)])
    }),
    resetStaff: function(){
      setState([])
    }
  }
}

// exported function 

export const CreateRecipies = memo(function ({ingredientsArray,onSubmit}){

  const {ingredients,AddIngredient,DeleteIng,resetStaff} = useCreateingredients()

  const handleSubmit = async function(e) {
    e.preventDefault()
    const value = Object.fromEntries(new FormData(e.target))
    value.ingredients = ingredients
    try{
      await onSubmit(value)
      e.target.reset()
      resetStaff()
    }catch(e){
      throw e
    }
    
  } 




  return (

    <form className="row" onSubmit={handleSubmit}>
      <div className="col-md-6">
        <label htmlFor="title">Title</label><br/>
        <input type="text" name="title" required/> <br/>
        <label htmlFor="short">Short decription</label><br/>
        <input type="text" name="short" required/> <br/>
        <label htmlFor="short">Full decription</label><br/>
        <textarea type="text" placeholder="description" name="content" required/>
      </div>
      <div className="col-md-6">
        {ingredients ?  <IngredientsList onDelete={DeleteIng} ingredients={ingredients} /> : <Loader/>}
      </div>
      <div className="col-md-6">
        {ingredientsArray ? <SelectList onChange={AddIngredient} ingredients={ingredientsArray} /> : <Loader/>  }
      </div>
      <button className="btn btn-primary" type="submit">Add </button>
    </form>
  )
})

const SelectList = memo(function SelectList({ingredients,onChange}) {

  const handleChange = function(e){

    onChange(ingredients[parseInt(e.target.value)])
  }


  return (
    <select onChange={handleChange}>
      <option>Please select an item</option>
      {ingredients.map((item,i) => <SelectRow id={i} key={item.id} ingredient={item} />)}
    </select>

  )
})


const SelectRow = memo(function ({ingredient,id}){

  return <option value={id} >{ingredient.title}</option>
})


const IngredientsList = memo(function({ingredients,onDelete}){

  return (  
    <ol>
      {ingredients.map(item => <IngredientsRow onDelete={onDelete} ingredient={item} key={item.id} />)}
    </ol>

  )

})

const IngredientsRow = memo(function({ingredient,onDelete}){
  return <li className="mt-50">{ingredient.title } <button onClick={() => onDelete(ingredient.id) } className="btn btn-danger"> Delete</button></li>
})


