import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import gaussian from 'gaussian';
import Button from '@mui/material/Button';
import bs from 'black-scholes';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ItemTitle = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1C68BF',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  fontSize: '20px',
  color: '#fff',
}));

export default function Risk() {
  const [stockTicker, setStockTicker] = useState()
  const [stockPrice, setStockPrice] = useState()
  const [highPriceInput, setHighPriceInput] = useState()
  const [lowPriceInput, setLowPriceInput] = useState()
  const [optionPrice, setOptionPrice] = useState()
  //risk free rate
  const [risk, setRisk] = useState()
  const [volatility, setVolatility] = useState()
  const [time, setTime] = useState()
  
  const onChangeStockHandler = event => {
    setStockTicker(event.target.value);
  };
  const onChangeRiskHandler = event => {
    setRisk(event.target.value);
  };

  const onChangeTimeHandler = event => {
    setTime(event.target.value);
  };

  const onChangeVolatilityHandler = event => {
    setVolatility(event.target.value);
  };

  const onChangeHighPriceHandler = event => {
    setHighPriceInput(event.target.value);
  };

  const onChangeLowPriceHandler = event => {
    setLowPriceInput(event.target.value);
  };

  const onChangeOptionPriceHandler = event => {
    setOptionPrice(event.target.value)
  }



  //grab CALL price
  const fetchCallPrice = async () => {
    try {
      const accessToken = process.env.REACT_APP_TRADIER_ACCESS_TOKEN;
      const stock = stockTicker;
      const url=`https://api.tradier.com/v1/markets/quotes?symbols=${stock}`
      const response = await axios(url, 
        {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      //last price
      console.log(response.data.quotes.quote.last, "fetch stock price working?")
      setStockPrice(response.data.quotes.quote.last);
      bs.blackScholes(stockPrice, highPriceInput, time / 365, volatility, risk, "call");
    } catch (error) {
      console.error(error);
    }
  }

  const fetchPutPrice = async () => {
    try {
      const accessToken = process.env.REACT_APP_TRADIER_ACCESS_TOKEN;
      const stock = stockTicker;
      const url=`https://api.tradier.com/v1/markets/quotes?symbols=${stock}`
      const response = await axios(url, 
        {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      //last price
      console.log(response.data.quotes.quote.last, "fetch stock price working?")
      setStockPrice(response.data.quotes.quote.last);
      bs.blackScholes(stockPrice, highPriceInput, time / 365, volatility, risk, "put");
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <div>
      <Box sx={{ width: '90%', margin: '30px' }}>
        <Box sx={{display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {m: 1,},}}>
            <Typography variant="h5">Risk Reward Calculator</Typography>
        </Box>

        <Grid container spacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {/* column names */}
          <Grid item xs={4}>
            <ItemTitle>Stock Prices</ItemTitle>
          </Grid>
          <Grid item xs={4}>
            <ItemTitle>Option Prices</ItemTitle>
          </Grid>
          <Grid item xs={4}>
            <ItemTitle>Risk Reward Ratios</ItemTitle>
          </Grid>

          {/* ROW 1 */}
          <Grid item xs={4}>
            <Item>
              <Typography>Higher Stock Price</Typography>
                <TextField id="high-price-input" label="$ High" variant="outlined" 
                  onChange={onChangeHighPriceHandler} 
                  value={highPriceInput} /> 
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <Typography>Option price high</Typography>
              {blackscholesHigh(stockPrice, highPriceInput, time, 0, risk, volatility).call ? blackscholesHigh(stockPrice, highPriceInput, time, 0, risk, volatility).call : "N/A"}
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              risk reward ratio for high price
            </Item>
          </Grid>
          {/* ROW 2 */}
          <Grid item xs={4}>
            <Item>
            <Typography>Stock Ticker</Typography>
                <TextField id="stock-ticker" label="ticker (all caps)" variant="outlined" 
                  onChange={onChangeStockHandler} 
                  value={stockTicker} />
                  <Typography>Current Price: ${stockPrice ? stockPrice : '0'}</Typography>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
            <Typography>Current Option Price</Typography>
                <TextField id="option-price-input" label="Current price" variant="outlined" 
                  onChange={onChangeOptionPriceHandler} 
                  value={optionPrice} /> 
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <Typography>Risk reward ratio for current price</Typography>
                {optionPrice / optionPrice}
            </Item>
          </Grid>

          {/* ROW 3 */}
          <Grid item xs={4}>
            <Item>
              <Typography>Lower Stock Price</Typography>
                <TextField id="low-price-input" label="$ Low" variant="outlined" 
                  onChange={onChangeLowPriceHandler} 
                  value={lowPriceInput} /> 
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>option price low</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>risk reward ratio LOW</Item>
          </Grid>

          {/* ROW 4 */}
          <Grid item xs={12}>
            <Grid container spacing={1} columnSpacing={2}>
              <Item>
                <Typography>Risk Free Rate (10Y)</Typography>
                  <TextField id="risk-free-rate" label="Risk Free Rate (%)" variant="outlined" 
                    onChange={onChangeRiskHandler} 
                    value={risk} />
                  <a href="https://ycharts.com/indicators/10_year_treasury_rate">10Y Treasury Rate</a>
              </Item>
              <Item>
                <Typography>Implied Volatility</Typography>
                  <TextField id="volatility" label="implied vol (%)" variant="outlined" 
                    onChange={onChangeVolatilityHandler} 
                    value={volatility} />
              </Item>
              <Item>
                <Typography>Time to Expiration</Typography>
                  <TextField id="time" label="time to expire (days)" variant="outlined" 
                    onChange={onChangeTimeHandler} 
                    value={time} />
              </Item>

            </Grid>
          
            <Button sx={{margin: '10px'}}variant="contained"
              onClick={fetchCallPrice}
              >Call</Button>
            <Button sx={{margin: '10px'}}variant="contained"
              onClick={fetchPutPrice}
              >Put</Button>
          </Grid>

        </Grid>
      </Box>

    </div>
  )
}
