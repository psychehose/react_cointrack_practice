import { useState, useEffect } from "react";

function App() {

  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [usd, setUSD] = useState(0);
  const [wannaCoin, setCoin] = useState(null);

  const onChoice = (event) => {
    const coinId = event.target.value;
    const coin = coins.find(c => c.id === coinId);
    setCoin(coin);
  };

  const onChange = (event) => {
    if (event.target.value < 0) {
      setUSD(0);
      return;
    }
    setUSD(event.target.value);
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json)=>{
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>The Coins! { loading ? "" : `(${coins.length})` }</h1>
      <input
        value={usd}
        onChange={onChange}
        type="number"
        placeholder="Enter your USD"
      />
      {loading ? <strong>Loading..!</strong> :
        <select onChange={onChoice}>
          {coins.map((coin, index) =>
            <option
              value={coin.id}
              key={index}
            >
              {coin.name} ({coin.symbol}) : {coin.quotes.USD.price} USD
            </option>)
          }
        </select>
      }

      {wannaCoin != null ? <h3>You can buy coin {wannaCoin.name} {usd / wannaCoin.quotes.USD.price} </h3> : null }
    </div>
  );
}

export default App;
