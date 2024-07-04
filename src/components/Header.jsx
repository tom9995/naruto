import React from 'react'

export default function Header() {

  const reLoad = () =>{
    window.location.reload();
  }

  return (
    <div className="header">
        <div className="header-content">
          <img src="logo.png" alt="logo" className="logo" onClick={reLoad}></img>
        </div>
    </div>
  )
}
