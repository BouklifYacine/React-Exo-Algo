import { useState } from "react";

function App() {
  interface Todolist {
    id: number;
    prix: number;
    texte: string;
  }

  interface Favoris {
    id: number;
    texte: string;
  }

  const [texte, setTexte] = useState("");
  const [todolist, setTodolist] = useState<Todolist[]>([]);

  const [favoris, setFavoris] = useState<Favoris[]>([]);

  const GérerFavoris = () => {
    if (texte.trim() !== "") {
      const id = todolist.length + 1;
      const nouveauTodo = {
        id: id,
        prix: Math.floor(Math.random() * 100),
        texte: texte,
      };
      
      setTodolist([...todolist, nouveauTodo]);
      setFavoris([...favoris, { id: id, texte: texte }]);
      setTexte("");
    }
  };

  const SupprimerElement = (id: number) => {
    setTodolist(todolist.filter(todo => todo.id !== id));
    setFavoris(favoris.filter(fav => fav.id !== id));
  };

  const total = todolist.reduce((acc, element) => acc + element.prix, 0);
  const Moyenne = todolist.length === 0 ? "Pas de moyenne disponible" : total / todolist.length;



  return (
    <>
      <input
        type="text"
        value={texte}
        onChange={(e) => setTexte(e.target.value)}
        className="border-red-500 border-2"
      />
      <p>Ton texte est : {texte}</p>
      <button 
        onClick={GérerFavoris} 
        disabled={total >= 100}
        className={`rounded-2xl py-2 px-2 ${total >= 100 ? 'bg-gray-400' : 'bg-blue-400'}`}
      >
        Rajouter
      </button>

      <p className="text-red-500"> {total >= 100 ? "Vous avez dépasser le maximum veuillez supprimer un élement " : ""} </p>

      {todolist.map((todo) => (
        <div key={todo.id} className="flex-col gap-x-5 mt-5">
          <a>Id : {todo.id} </a>
          <a> Mon prix est de {todo.prix} </a>
          <a>
            {todo.texte}{" "}
            <button onClick={() => SupprimerElement(todo.id)}>Supprimer</button>
          </a>
        </div>
      ))}

      <div className="mt-5">
        <p>Le total : {total}</p>
        <p>La moyenne : {Moyenne}</p>
      </div>

      <div className="mt-10">
        <p>Favoris : {favoris.length}</p>
        {favoris.map(fav => (
          <div className="flex gap-x-5" key={fav.id}>
            <p>{fav.id}</p>
            <p>{fav.texte}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;