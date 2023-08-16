import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchCryptocurrencies } from './api'; // Make sure the import path is correct

function App() {
  const pageSize = 50;
  const [page, setPage] = useState(1); // Start from page 1
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await fetchCryptocurrencies(page, pageSize);
        setCryptocurrencies(prevCryptos => [...prevCryptos, ...data]);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [page]);

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className="App">
      <h1>CoinCap Clone</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Symbol</th>
            <th>Name</th>
            <th>Price</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {cryptocurrencies.map((crypto, index) => (
            <tr key={crypto.id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={`https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`}
                  alt={`${crypto.name} icon`}
                />
                {crypto.symbol}
              </td>
              <td>{crypto.name}</td>
              <td>${parseFloat(crypto.priceUsd).toFixed(2)}</td>
              <td>${parseFloat(crypto.marketCapUsd).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching data</p>}
      {!loading && !error && (
        <button onClick={loadMore} disabled={loading}>
          Load More
        </button>
      )}
    </div>
  );
}

export default App;
