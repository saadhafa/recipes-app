import {memo} from 'react'
import {Loader} from '../../UI/loader'


export const Recipes = memo(function({recipies,onClick}){
  if(recipies === null){
    return <Loader />
  }
return (
  <>
  {recipies.map(data =>{
   return  <div  className="col-md-4 mb-4 mt-4" key={data.id}>
      <RecipesCardRow onClick={onClick} recipes={data} />
    </div>
  })}
</>

)
})



const RecipesCardRow = memo(function ({recipes,onClick}){

  return(
    <div className="card">
      <div className="card-body">
        <div className="card-title">
          {recipes.title}
        </div>
        <p className="card-text">
          {recipes.short}
        </p>
        <a href="#" onClick={() => onClick(recipes.id)} className="btn btn-primary">View recipe</a>
      </div>
    </div>
  )

})