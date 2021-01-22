import {memo} from 'react'
import {Loader} from '../../UI/loader'


export const Recipes = memo(function({recipies,onClick,onDelete}){
  if(recipies === null){
    return <Loader />
  }
return (
  <div className="row">
  {recipies.map(data =>{
   return  <div  className="col-md-4 mb-4 mt-4" key={data.id}>
      <RecipesCardRow onDelete={onDelete} onClick={onClick} recipes={data} />
    </div>
  })}
</div>

)
})



const RecipesCardRow = memo(function ({recipes,onClick,onDelete}){


  const handleDelete = async (e) => {
    e.preventDefault()
    const response = await onDelete(recipes.id)
    console.log(response)
  } 

  return(
    <div className="card">
      <div className="card-body">
        <div className="card-title">
          {recipes.title}
        </div>
        <p className="card-text">
          {recipes.short}
        </p>
        <a href="#" onClick={() => onClick(recipes.id)} style={{marginRight:'30px'}} className="btn btn-primary">View recipe</a>
        <a href="#" onClick={handleDelete} className="btn btn-danger">Delete</a>

      </div>
    </div>
  )

})