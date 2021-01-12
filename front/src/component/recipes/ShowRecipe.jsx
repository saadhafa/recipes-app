import React from 'react'
import { Modal } from '../../UI/Modal'

export function ShowRecipe({recipe}){

  return (
    <Modal title={recipe.title} onClose={() => null}>
      <p>{recipe.content}</p>
    </Modal>
  )
}