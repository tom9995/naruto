import React from 'react'

export default function Pager({page,setPage,limit,characters}) {

    const handleNext = () => {
        setPage((prev) => parseInt(prev) + 1);
      };
    
      const handlePrev = () => {
        setPage((prev) => prev - 1);
      };
    
  return (
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
  )
}
