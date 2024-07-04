import React from 'react'

export default function Search({search,setSearch,fetchCharacters}) {

    const handleInput = (e) =>{
    setSearch(e.target.value);
    }

    const handleEnter = (e) =>{
    if(e.key === "Enter"){
    handleSearch();
    }      
    }

    const handleSearch = () =>{
    fetchCharacters();
    }

  return (
    <div className="saerch">
          <input type="text" placeholder="name" className="search-text" value={search} onChange={handleInput} onKeyDown={handleEnter}></input>
          <button className="search-button" onClick={handleSearch} >検索</button>
    </div>
  )
}
