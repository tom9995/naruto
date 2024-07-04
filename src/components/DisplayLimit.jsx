import React from 'react';
import Button from '@mui/material/Button';

const limits = [12,24,48,96];

export default function DisplayLimit({limit,setLimit}) {

    const chanegeDisplayNumber = (e) =>{
        setLimit(e.target.value);
      }

  return (
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
  )
}
