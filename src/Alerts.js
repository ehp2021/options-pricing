import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function Alerts() {
  const [symbol, setSymbol] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    axios.get('/api/alerts').then(res => {
      setAlerts(res.data);
    });
  }, []);


  const handleSubmit = e => {
    e.preventDefault();
    axios.get(`/api/stock-price?symbol=${symbol}&targetPrice=${targetPrice}`).then(res => {
      console.log(res.data);
    });
  };

  return (
    <>
    <form onSubmit={handleSubmit} >
      <TextField
          required
          id="symbol"
          label="Stock Symbol"
          value={symbol}
          onChange={e => setSymbol(e.target.value)}
          sx={{margin: '10px'}}
        />
        <TextField
          required
          id="target-price"
          label="Target Price"
          type="number"
          value={targetPrice}
          onChange={e => setTargetPrice(e.target.value)}
          sx={{margin: '10px'}}
        />
        <Button type="submit" variant="contained" color="primary" sx={{margin: '15px'}}>
          Set Alert
        </Button>
    </form>

    <div sx={{margin: '10px'}}>
      <h1 >Alerts</h1>
      {alerts.map(alert => (
        <div key={alert.symbol}>
          <p>
            Symbol: {alert.symbol} Target Price: {alert.targetPrice}
          </p>
        </div>
      ))}
    </div>
    </>
  );
}

export default Alerts;
