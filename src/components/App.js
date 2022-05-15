import React, { useState, useEffect } from "react";
import SushiContainer from "./SushiContainer";
import Table from "./Table";

const API = "http://localhost:3001/sushis";
const CASH = "http://localhost:3001/cash";

function App() {

  const [sushiData, setSushiData] = useState([]);
  const [sushiEaten, setSushiEaten] = useState([])
  const [cashAvailable, setCashAvailable] = useState([])
  // const [remaining, setRemaining] = useState(0)

  useEffect(() => {
    fetch(API)
    .then((res) => res.json())
    .then((sushis) => setSushiData(sushis))
  }, []);

  useEffect(() => {
    fetch (CASH)
    .then((res) => res.json())
    .then((amount) => setCashAvailable(amount.total))
  }, [])

  function handleEatSushi(sushi) {
    fetch(`http://localhost:3001/sushis/${sushi.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...sushi,
        'img_url': ''
      })
    })
    .then((res) => res.json())
    .then((updatedSushi) => {
      setCashAvailable(cashAvailable - updatedSushi.price)
      const updatedList = sushiData.map((sushi) => {
        if(sushi.id === updatedSushi.id) {
          return updatedSushi
        } else {
          return sushi
        }
      })
      setSushiData(updatedList)
      setSushiEaten([...sushiEaten, "eat"])
    })
  }

  function handleAddCash(input) {
    fetch(CASH, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        total: cashAvailable+input
      })
    })
    .then((res) => res.json())
    .then((updated) => setCashAvailable(updated.total))
  }
  return (
    <div className="app">
      <SushiContainer allSushi={sushiData} eatSushi={handleEatSushi} cash={cashAvailable}/>
      <Table plates={sushiEaten} totalCash={cashAvailable} addCash={handleAddCash}/>
    </div>
  );
}

export default App;
