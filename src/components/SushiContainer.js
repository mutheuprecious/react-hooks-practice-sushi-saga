import React, { useState } from "react";
import MoreButton from "./MoreButton";
import Sushi from "./Sushi"

function SushiContainer({ allSushi, eatSushi, cash }) {

  const [startIndex, setStartIndex] = useState(1)

  let displayingSushis = []
  allSushi.map((sushi) => {
    for(let i=startIndex; i < startIndex + 4; i++){
      if(sushi.id === i){
        displayingSushis.push(sushi)
      }
      if(i > allSushi.length) {
        setStartIndex(1)
      }
    }
  })

  function updateStartIndex() {
    setStartIndex(startIndex+4)
    // console.log(startIndex)
    // console.log(displayingSushis)
  }

  const sushiContainer = displayingSushis.map((sushi) => <Sushi key={sushi.id} sushiItem={sushi} handleEatSushi={eatSushi} cashRemaining={cash}/>)
  
  return (
    <div className="belt">
      { sushiContainer }
      <MoreButton handleStartIndex={updateStartIndex}/>
    </div>
  );
}

export default SushiContainer;