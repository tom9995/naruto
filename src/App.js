import { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Button from '@mui/material/Button';

const limits = [12,24,48,96];

function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(localStorage.getItem("page") || 1);
  const [isLoading, setIsLoading] = useState(false);
  const [limit,setLimit] = useState(localStorage.getItem("limit") || 12);
  const [search,setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("page", page);
    const pageStorage = localStorage.getItem("page") || 1;

    localStorage.setItem("limit", limit);
      const limitStorage = localStorage.getItem("limit") || 12;

    fetchCharacters(pageStorage,limitStorage);
    // console.log("called");
  }, [page,limit]);

  const fetchCharacters = async () => {
    setIsLoading(true);
    const apiUrl = search ? "https://narutodb.xyz/api/character/search" : "https://narutodb.xyz/api/character";

    const result = await axios.get(apiUrl, { params: { page, limit,name:search } });
    setCharacters(result.data.characters??[result.data]);
    setIsLoading(false);
    setSearch();
  };

  const handleNext = () => {
    setPage((prev) => parseInt(prev) + 1);
  };

  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };

  const chanegeDisplayNumber = (e) =>{
    setLimit(e.target.value);
  }

  const handleSearch = () =>{
    fetchCharacters();
  }

  const handleInput = (e) =>{
    setSearch(e.target.value);
  }

  const handleEnter = (e) =>{
    if(e.key === "Enter"){
      handleSearch();
    }      
  }

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
          <div className="limit">
            <span className="dispay-message">表示数：</span>
          {limits.map((lim)=>{
            return(
              <Button key={lim} className={lim==limit?"selected":"not-selected"} value={lim} onClick={chanegeDisplayNumber}
              disabled={lim==limit?true:false}>{lim}</Button>
            )
          })
        }
        </div>
        <div className="saerch">
          <input type="text" placeholder="name" className="search-text" value={search} onChange={handleInput} onKeyDown={handleEnter}></input>
          <button className="search-button" onClick={handleSearch} >検索</button>
        </div>
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
