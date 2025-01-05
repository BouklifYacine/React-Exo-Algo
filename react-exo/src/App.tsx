import { useState } from "react";

function App() {
  interface Todolist {
    id: number;
    prix: number;
    texte: string;
  }

  const [texte, setTexte] = useState("");
  const [todolist, setTodolist] = useState<Todolist[]>([
    { id: 1, prix: 10, texte: "Je suis yacine" },
    { id: 2, prix: 20, texte: "Je suis norhane" },
    { id: 3, prix: 30, texte: "Je suis salah" },
  ]);

  const changement = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTexte(e.target.value);
  };

  const SupprimerElement = (id: number) => {
    setTodolist(todolist.filter((todo) => todo.id !== id));
  };

  const total = todolist.reduce((acc, element) => acc + element.prix, 0);

  const Moyenne =
    todolist.reduce((acc, element) => acc + element.prix, 0) / todolist.length;

  const ajouterElement = () => {
    if (texte.trim() !== "") {
      const NouvelElement: Todolist = {
        id: todolist.length + 1,
        prix: Math.floor(Math.random() * 100, ),
        texte: texte,
      };

      setTodolist([...todolist, NouvelElement]);
      setTexte("");
    }
  };

  return (
    <>
      <input
        type="text"
        value={texte}
        onChange={changement}
        className="border-red-500 border-2"
      />
      <p>Ton texte est : {texte}</p>
      <button 
  onClick={ajouterElement} 
  disabled={total >= 100}
  className={`rounded-2xl py-2 px-2 ${total >= 100 ? 'bg-gray-400' : 'bg-blue-400'}`}
>
  Rajouter
</button>

      {todolist.map((todo) => (
        <div key={todo.id} className="flex-col gap-x-5 mt-5">
          <a>Id : {todo.id} </a>
          <a> Mon prix est de {todo.prix} </a>
          <a>
            {todo.texte}{" "}
            <button onClick={() => SupprimerElement(todo.id)}>
              {" "}
              Supprimer
            </button>
          </a>
        </div>
      ))}

      <div className="mt-5">
        <p> Le total de ce tableau est de : {total}</p>
        <p> La moyenne de ce tableau est de : {Moyenne}</p>
      </div>
    </>
  );
}

export default App;
