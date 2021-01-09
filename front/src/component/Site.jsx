import React,{useState,useEffect} from 'react'
import { useIngredients } from '../hooks/Ingredients'
import {Ingredients} from './ingredients/Ingredients'
export function Site(){

  const [page, setPage] = useState('ingredients')

  const {
    ingredients,
    fetchIngredients,
    deleteiingredients,
    updateIngredients,
    createIngredients
  } = useIngredients()


let content = null

if(page === 'ingredients'){
  content = <Ingredients fetchIngredients={fetchIngredients} onCreate={createIngredients} onUpdate={updateIngredients} onDelete={deleteiingredients} ingredients={ingredients}  />
}



useEffect(() => {

  if(page === 'ingredients'){
    fetchIngredients()
  }
  
}, [page])



  return <div>
      <NavBar currentPage={page} onChangePage={setPage}/>
      <div className="container">
      {content}
      </div>
      
      </div>

}





function NavBar({currentPage,onChangePage}){


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
    </nav>
  )
}