import React, {useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api.js";

function App() {
  const [repositories, setRepository] = useState([]);

   useEffect(() => {
        api.get('repositories').then(response => {
            setRepository(response.data);
        })
    }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {         
      title : "Desafio React JS",
      url : "https://github.com/thalesribeiro28/Conceitos_ReactJS",
      techs: ["javascript", "ReactJS", "NodeJS"]
    });

    const repository = response.data;   

    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    
    await api.delete('repositories/'+id);   
    const i = repositories.findIndex(repository => repository.id === id);

    const repositories_del = repositories;

    if (i >= 0)
    {
      repositories_del.splice(i,1);        
    }
    
    setRepository([...repositories_del]);
  
  }

  return (
    <div>
      <ul data-testid="repository-list">              

        {repositories.map(repository => <li key={repository.id}>{repository.title}
        <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button></li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
