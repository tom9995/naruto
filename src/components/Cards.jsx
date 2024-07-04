import React from 'react'

export default function Cards({characters}) {
  return (
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
  )
}
