import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const limit = 15;

function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCharacters(page);
    // console.log(page);
  }, [page]);

  const fetchCharacters = async (page) => {
    const apiUrl = "https://narutodb.xyz/api/character";
    setIsLoading(true);
    const result = await axios.get(apiUrl, { params: { page, limit } });
    console.log(result);
    setCharacters(result.data.characters);
    setIsLoading(false);
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="header-content">
          <img src="logo.png" alt="logo" className="logo"></img>
        </div>
      </div>
      {isLoading ? (
        <div>Now Loading...</div>
      ) : (
        <main>
          <div className="cards-container">
            {characters.map((character) => {
              return (
                <div className="card" key={character.id}>
                  <img
                    src={character.images[0] || "dummy.png"}
                    alt="character"
                    className="card-image"
                  ></img>
                  <div className="card-content">
                    <h3 className="card-title">{character.name}</h3>
                    <p className="card-description">
                      {character.debut?.appearsIn ?? "なし"}
                    </p>
                    <div className="card-footer">
                      <span className="affiliation">
                        {character.personal?.affiliation ?? "なし"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pager">
            <button disabled={page === 1} className="prev" onClick={handlePrev}>
              Previous
            </button>
            <span className="page-number">{page}</span>
            <button
              disabled={limit > characters.length}
              className="next"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
