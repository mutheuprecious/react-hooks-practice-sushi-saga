import React, { useState } from "react";

function Sushi({ sushiItem, handleEatSushi,cashRemaining }) {

  const [isEaten, setIsEaten] = useState(sushiItem['img_url'])
  
  function eatSushi() {
    if (sushiItem.price < cashRemaining){
      if(isEaten !== ""){
        handleEatSushi(sushiItem)
      }
      setIsEaten("")
    } 
  }
  return (
    <div className="sushi">
      <div className="plate" onClick={ eatSushi }>
        {/* Tell me if this sushi has been eaten! */}
        {isEaten === "" ? null : (
          <img
            src={sushiItem['img_url']}
            alt={sushiItem.name}
            width="100%"
          />
        )}
      </div>
      <h4 className="sushi-details">
        {sushiItem.name} - ${sushiItem.price}
      </h4>
    </div>
  );
}

export default Sushi;
