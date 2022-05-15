import React, { useState } from "react";

function Table({ plates = [], totalCash, addCash }) {
  const [isFormShowing, setIsFormShowing] = useState(false)
  const [cash, setCash] = useState(0)
  // renders an empty plate for every element in the array
  const emptyPlates = plates.map((_, index) => (
    <div key={index} className="empty-plate" style={{ top: -7 * index }} />
  ));

  function handleSubmitCash() {
    setIsFormShowing(!isFormShowing)
    if(cash > 0) {
      addCash(cash)
    }
    setCash(0)
  }
  function handleAddCash(e) {
    setCash(Number(e.target.value))
  }

  return (
    <>
      <h1 className="remaining">
        You have: ${ totalCash } remaining!
      </h1>
      {isFormShowing ? <input type="number" placeholder="Enter Amount" onChange={handleAddCash}/> : null}
      <br />
      <button onClick={handleSubmitCash}>Add more cash</button>
      <div className="table">
        <div className="stack">{emptyPlates}</div>
      </div>
    </>
  );
}

export default Table;
