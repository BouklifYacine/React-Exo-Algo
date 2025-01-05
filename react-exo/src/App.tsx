import { useState } from "react"



function App() {

  interface Todolist {
    id : number, 
    prix : number , 
    texte : string
  }

  const [texte,setTexte] = useState('')
  const [todolist, setTodolist] = useState([
    {id : 1 , prix : 10 , texte : "Je suis yacine"},
    {id : 2 , prix : 20 , texte : "Je suis norhane"},
    {id : 3 , prix : 30 , texte : "Je suis salah"}
  ])


  const changement = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTexte(e.target.value)
  }

  const SupprimerElement = (id : number) => {
    setTodolist(todolist.filter(todo => todo.id !== id ))
  }
 

  return (
    <>
   
   <input type="text" value={texte} onChange={changement} className="border-red-500 border-2" />
   <p>Ton texte est :  {texte}</p>

   {todolist.map(todo => 
   <div key={todo.id} className="flex-col gap-x-5 mt-5">
<a>Id : {todo.id} </a>
<a> Mon prix est de {todo.prix} </a>
<a>{todo.texte} <button onClick={() => SupprimerElement(todo.id)}> Supprimer</button></a>
   </div>
    
   
   )}
    </>
  )
}

export default App
