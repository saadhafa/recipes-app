import React from 'react'
import { Loader } from '../../UI/loader'
import { Modal } from '../../UI/Modal'

export  function ShowRecipe({recipe,onClose}){

  return (
    <Modal title={recipe.title} onClose={onClose}>
      {recipe.content ? <RecipeDetails recipe={recipe} />  : <Loader/>}
    </Modal>
  )
}


function RecipeDetails({recipe}){
  const  htmlContent = {__html: recipe.content.split("\n").join('</br>') }

  return(

  <>
   <div dangerouslySetInnerHTML={htmlContent}></div>
    <h3>Ingredients</h3>
    <ul>
    {recipe.ingredients.map(i => <RecipeRow key={i.id} recipe={i} /> )}
    </ul>
  </>
  )

}


function RecipeRow({recipe}){


  return (
    <li><strong>{recipe.quantity} {recipe.unit}</strong></li>
  )
}