import { Heart, Search, Trash } from 'lucide-react';
import { useState } from 'react';

export default function TableauStylé() {

  interface Tableau {
    id: number;
    prenom: string;
    age: number;
    note: number;
  }


  const [age, setAge] = useState(0);
  const [note, setNote] = useState(0);
  const [prenom, setPrenom] = useState('');
  const [recherche, setRecherche] = useState('');
  const [tableau, setTableau] = useState<Tableau[]>([]);
  const [favoris, setFavoris] = useState<number[]>([]);

  const AjouterElement = () => {
  
    if (prenom.trim() !== "" && age && note) {
      const id = tableau.length + 1;
      const nouvelelement = { id: id, prenom: prenom, age: age, note: note };
      setTableau([...tableau, nouvelelement]);
      setAge(0);
      setNote(0);
      setPrenom('');
    }
  };

  const tableauFiltré = tableau.filter((eleve) => 
    eleve.prenom.toLowerCase().includes(recherche.toLowerCase())
  );

  const total = tableauFiltré.length === 0 
  ? "Pas de note disponible" 
  : tableauFiltré.reduce((acc, element) => acc + element.note, 0);
  

const moyenne = tableauFiltré.length === 0 
  ? "Pas de note disponible" 
  : Number(total) / tableauFiltré.length;

  const supprimer = (tableauid: number) => {
    setTableau(tableau.filter((tab) => tab.id !== tableauid));
  };

  const GestionFavoris = (id: number) => {
    if (favoris.includes(id)) {
      
      setFavoris(favoris.filter((favoriId) => favoriId !== id))  }
      
      else { setFavoris([...favoris, id])  }
  };

  const nombrefavoris = favoris.length === 0 ? "" : favoris.length

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des Notes</h1>
        <p>{nombrefavoris}</p>
      </div>


      <div className="grid grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <input
          type="number"
          placeholder="Âge"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <input
          type="number"
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(Number(e.target.value))}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>


      <div className="flex justify-end mb-6">
        <button 
          onClick={AjouterElement} 
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Ajouter
        </button>
      </div>


      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Rechercher un prénom..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
      </div>


      <div className="mb-6 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Id
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prénom
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Âge
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Note
              </th>
              <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tableauFiltré.map(eleve => (
              <tr key={eleve.id} className="hover:bg-gray-50">
                <td className="py-4 px-6">{eleve.id}</td>
                <td className="py-4 px-6">{eleve.prenom}</td>
                <td className="py-4 px-6">{eleve.age}</td>
                <td className="py-4 px-6">{eleve.note}</td>
                <td className="py-4 px-6">
                  <div className="flex justify-end gap-3">
                    <button 
                      onClick={() => supprimer(eleve.id)} 
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                    <button 
                     onClick={() => GestionFavoris(eleve.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
        <div>
          <p className="text-gray-600">
            Moyenne de la classe : <span className="font-semibold">{moyenne}</span>
          </p>
        </div>
        <div>
          <p className="text-gray-600">
            Total des notes : <span className="font-semibold">{total}</span>
          </p>
        </div>
      </div>
    </div>
  );
}