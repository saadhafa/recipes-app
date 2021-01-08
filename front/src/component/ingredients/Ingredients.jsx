import React, {useState,useEffect} from 'react'
import { Loader } from '../../UI/loader'

export function Ingredients({ingredients,onDelete, onUpdate}){

  return (
   <>
    <h2>List des ingredients</h2>
    {ingredients === null ? <Loader/> : <IngredientList onUpdate={onUpdate} onDelete={onDelete} ingredients={ingredients} />  }
   </>
  )
}

function IngredientList({ingredients,onDelete, onUpdate}){

return (
  <div>
    { ingredients.map(ingredient => <IngredientRow onUpdate={onUpdate} key={ingredient.id} onDelete={onDelete} ingredient={ingredient}/>)}
  </div>

)
}


function IngredientRow({ingredient,onDelete,onUpdate}){


  // compoment states
  const [loadding, setLoading] = useState(false)
  const [error,setError] = useState(null)
  const [updated, setUpdated] = useState(null)


  // times for error and success messages
  useEffect(() => {
    const timer = setInterval(() => {
      setError(null)
      setUpdated(null)
    }, 5000)
    return () => {
      clearInterval(timer)
    }
  }, [error,updated])


  // handdling the delete elemets
  const handleDelete = function(e){
    e.preventDefault()
    setLoading(true)
    onDelete(ingredient.id)
  } 

  // Update's elements
  const handleUpdate = async function(e){
    e.preventDefault()
    setLoading(true)
    const FromData = new FormData(e.target)
    FromData.append('id',ingredient.id)
    try{
      const value = await onUpdate(FromData,ingredient.id)
      if(value.errors){
        setError(value.errors[0].message)
      }else{
        setUpdated("Element Updated")
      }
    }catch(e){
      setError('Fail to change elements')
      throw e   
    }
    setLoading(false)
  }


  return (
  <React.Fragment>
   { error ? <div style={{margin:'30px auto 30px auto',width:"50%"}} className="alert alert-danger d-b">{error} ☹️</div> : ''}
   { updated ? <div style={{margin:'30px auto 30px auto',width:"50%"}} className="alert alert-success d-b">{updated} 😀</div> : ''}
  <form onSubmit={handleUpdate} className="form-group d-flex " style={{width: "50%", margin: '0 auto'}}>

    <input type="text" name="title" defaultValue={ingredient.title} style={{marginRight:'20px',marginTop:'20px'}} className="form-control" placeholder="Enter new title" required/>
    <input type="text" name="unit" defaultValue={ingredient.unit}  className="form-control" style={{marginRight:'20px',marginTop:'20px'}} placeholder="Enter new unit" required/>
    <button style={{marginRight:'20px',marginTop:'20px'}} disabled={loadding} className="btn btn-primary" type="submit">Update</button>
    <button style={{marginRight:'20px',marginTop:'20px'}} className="btn btn-danger" onClick={handleDelete} disabled={loadding}>Delete</button>
    </form>
    </React.Fragment>
  )
}