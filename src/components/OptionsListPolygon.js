import React, { useState, useEffect } from 'react';
import OptionCard from "./OptionCard";
import axios, { all } from 'axios';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, LabelList, Cell } from 'recharts';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

export default function OptionsList() {
  const [allOptions, setAllOptions] = useState([])
  const [ticker, setTicker] = useState()
  const [strikeprice, setStrikeprice] = useState()

  const onChangeTicker = event => {
    setTicker(event.target.value);
 };

  const onChangeStrikeprice = event => {
    setStrikeprice(event.target.value);
  };

  useEffect(() => {
    async function getOptions() {
      
      //const results = await axios(`https://api.polygon.io/v3/reference/options/contracts?underlying_ticker=${ticker}&strike_price=${strikeprice}&limit=1000&apiKey=${process.env.REACT_APP_POLYGON_API_KEY}`);
      // this grabs all the ticker names, so have to map through this
      // console.log(results[0].ticker, "RESULTS? working?")
      //setAllOptions(results.data)
      // but then need to put it through this API request to get all the prices and greeks
      //https://polygon.io/docs/options/get_v3_snapshot_options__underlyingasset___optioncontract 
      // so do another axios? and map through the results.map(ticker => results.ticker?)
    }
    getOptions()
  },[])
   
  // show all options
  function showOptions(arr) {
    return arr.map(option => {
      return (
        <OptionCard key={option.contractName} option={option}/>
      )
    })
  }


  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          '& > *': {
            m: 2,
          },
        }}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',}}>
          <Typography>Ticker</Typography>
          <TextField id="ticker" label="ticker name" variant="outlined" onChange={onChangeTicker} 
            value={ticker} /> 
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',}}>
          <Typography>Strike Price</Typography>
          <TextField id="strikeprice" label="strike price" variant="outlined" onChange={onChangeStrikeprice} 
            value={ticker} /> 
        </Box>

      </Box>


      <ScatterChart
        width={800}
        height={800}
        margin={{
          top: 20,
          right: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="lastPrice" name="purchase price" unit="$" />
        <YAxis type="number" dataKey="impliedVolatility" name="implied vol" unit="%" />
        {/* <YAxis type="number" dataKey="daysBeforeExpiration" name="days before expir" unit="days" /> */}
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="A school" data={[{x: 2, y: 3},{x: 1, y: 3}]} fill="#8884d8">
        </Scatter>
      </ScatterChart>

      <Link to="/">
        <Button variant="outlined" sx={{margin: '10px'}}>Home</Button>
      </Link>

    </>
  )
}
