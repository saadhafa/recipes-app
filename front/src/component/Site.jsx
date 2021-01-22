import React,{useState,useEffect} from 'react'
import { useIngredients } from '../hooks/Ingredients'
import { useRecipies } from '../hooks/recipies'
import {Ingredients} from './ingredients/Ingredients'
import {Recipes} from './recipes/Recipes'
import {ShowRecipe} from './recipes/ShowRecipe'
import {useToggler}  from '../hooks/useToggler'
import {CreateRecipies} from './recipes/CreateRecipies'
import { Modal } from '../UI/Modal'



export function Site(){

  const [page, setPage] = useState('Recipies')
  const [toggle,setToggle] = useToggler(false)
  const {
    ingredients,
    fetchIngredients,
    deleteiingredients,
    updateIngredients,
    createIngredients
  } = useIngredients()



  const {
    recipies,
    recipe,
    closeModal,
    fetchRecipes,
    fetchOneRecipe,
    CreateRecipes,
    DeleteRecipes
  } = useRecipies()




let content = null

if(page === 'ingredients'){

  content = <Ingredients fetchIngredients={fetchIngredients} onCreate={createIngredients} onUpdate={updateIngredients} onDelete={deleteiingredients} ingredients={ingredients}  />
}
else if (page === 'Recipies'){
  
  content = <> 

  {toggle ?  <Modal title="Create Recipies" onClose={setToggle}> <CreateRecipies onSubmit={CreateRecipes} ingredientsArray={ingredients}  /> </Modal>: null }

  {recipe ? <ShowRecipe onClose={closeModal} recipe={recipe} /> : null}
  <Recipes onDelete={DeleteRecipes} onClick={fetchOneRecipe} recipies={recipies} /> 
  
  </>
}



useEffect(() => {

  if(page === 'ingredients' || toggle){
    fetchIngredients()
  }
  if(page === 'Recipies'){
    fetchRecipes()
  }
  
}, [page,toggle])



  return <div>
      <NavBar currentPage={page} onClick={setToggle} valueToggle={toggle} onChangePage={setPage}/>
      <div className="container">
        {content}
      </div>
      
      </div>

}





function NavBar({currentPage,onChangePage,onClick}){





  function NavClass(page){
    let className = 'nav-item'
    if(page === currentPage){
      className = ' active'
    }
    return className
  }

   return (

    <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
      <a href="#recipes" className="navbar-brand">Recipes</a>
      <ul className="navbar-nav rm-auto">
      <li className={NavClass('Recipies')}>
        <a href="#recipies" onClick={() => onChangePage('Recipies')} className="nav-link">Recipies</a>
      </li>
      <li className={NavClass('ingredients')}>
        <a href="#ingredients" onClick={() => onChangePage('ingredients')} className="nav-link">ingredients</a>
      </li>
      </ul>
      <div style={{display:'flex',justifyContent:'space-between'}}>
      <button title="To add Recipies Please go to Recipies page" disabled={currentPage !== 'Recipies'} onClick={onClick} className="btn btn-outline-light">ADD</button>
      </div>
     
    </nav>
  )
}