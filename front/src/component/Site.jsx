import React from 'react'

export function Site(){

  return <NavBar/>

}

function NavBar({currentPage}){

   return (

    <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
      <a href="#" className="navbar-brand">Recipes</a>
      <ul className="navbar-nav rm-auto">
      <li className="nav-item">
        <a href="#" className="nav-link">Recipies</a>
      </li>
      <li className="nav-item">
        <a href="#" className="nav-link">ingredients</a>
      </li>

      </ul>
    </nav>
  )
}