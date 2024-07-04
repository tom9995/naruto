import { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import DisplayLimit from "./components/DisplayLimit";
import Search from "./components/Search";
import Pager from "./components/Pager";
import Cards from "./components/Cards";

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


  return (
    <div className="container">
      <Header />
      {isLoading ? (
        <div>Now Loading...</div>
      ) : (
        <main>
        <DisplayLimit limit={limit} setLimit={setLimit} />
        <Search search={search} setSearch={setSearch} fetchCharacters={fetchCharacters}/>
        <Cards characters={characters} />  
        <Pager page={page} setPage={setPage} limit={limit} characters={characters}/>
        </main>
      )}
    </div>
  );
}

export default App;
