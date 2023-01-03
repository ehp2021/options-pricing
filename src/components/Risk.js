import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function Risk() {
  const [stockTicker, setStockTicker] = useState()
  const [highPriceInput, setHighPriceInput] = useState()
  const [lowPriceInput, setLowPriceInput] = useState()
  
  const onChangeStockHandler = event => {
    setStockTicker(event.target.value);
  };

  const onChangeHighPriceHandler = event => {
    setHighPriceInput(event.target.value);
  };

  const onChangeLowPriceHandler = event => {
    setLowPriceInput(event.target.value);
  };

  //grab current stock price
  const fetchStockPrice = async () => {

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
            <Item>Stock Prices</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>Option Prices</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>Risk Reward Ratios</Item>
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
            <Item>option price high</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              right top
            </Item>
          </Grid>
          {/* ROW 2 */}
          <Grid item xs={4}>
          <Item>current price here</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>xs=4</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>xs=8</Item>
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
            <Item>xs=4</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>xs=8</Item>
          </Grid>
        </Grid>
      </Box>

    </div>
  )
}
