import React, { useState, useEffect } from 'react';
import OptionCard from "./OptionCard";
import Button from '@mui/material/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Cell, Legend } from 'recharts';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios'
import moment from 'moment'

export default function OptionsListPolygon() {
  const [RSIs, setRSIs] = useState()
  const [allOptions, setAllOptions] = useState([])
  const [ticker, setTicker] = useState()
  const [timespan, setTimespan] = useState()


  const onChangeTicker = event => {
    setTicker(event.target.value);
 };

 const handleChange = event => {
  setTimespan(event.target.value);
};



  const getRSI = async () => {
    //descending so the nearest time is first
    const response = await axios(`https://api.polygon.io/v1/indicators/rsi/${ticker}?timespan=${timespan}&adjusted=true&series_type=close&order=desc&limit=499&apiKey=${process.env.REACT_APP_POLYGON_API_KEY}`)
    // console.log(response.data.results.values, 'polygon working?')
    setRSIs(response.data.results.values)
  }

  console.log(RSIs, "WORKING?")

  // useEffect(() => {
    // async function getOptions() {
      //const results = await axios(`https://api.polygon.io/v3/reference/options/contracts?underlying_ticker=${ticker}&strike_price=${strikeprice}&limit=1000&apiKey=${process.env.REACT_APP_POLYGON_API_KEY}`);
      // this grabs all the ticker names, so have to map through this
      // console.log(results[0].ticker, "RESULTS? working?")
      //setAllOptions(results.data)
      // but then need to put it through this API request to get all the prices and greeks
      //https://polygon.io/docs/options/get_v3_snapshot_options__underlyingasset___optioncontract 
      // so do another axios? and map through the results.map(ticker => results.ticker?)
  //   }
  //   getOptions()
  // },[])
   
  // show all options
  function showRSI(arr) {
    if (Array.isArray(arr) === true) {
      return arr.map(val => {
        return (
         <>
          <Typography>{Date(val.timestamp)}</Typography>
          <Typography>{val.value}</Typography>
         </>
        )
      })
    } else {
      return (
        <Typography>data loading....</Typography>
      )}
  }



  return (
    <>
      <Box
        sx={{
          mindWidth: 200,
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
          <TextField id="ticker" label="must use all caps" variant="outlined" onChange={onChangeTicker} 
            value={ticker} /> 
        </Box>

        <Box sx={{ minWidth: 150 }}>
        <Typography>Timespan</Typography>
          <FormControl fullWidth>
            <InputLabel id="select-timespan-label">Timespan</InputLabel>
            <Select
              labelId="select-timespan"
              id="demo-simple-select-timespan"
              value={timespan}
              label="Timespan"
              onChange={handleChange}
            >
              <MenuItem value={'minute'}>Minute</MenuItem>
              <MenuItem value={'hour'}>Hour</MenuItem>
              <MenuItem value={'day'}>Day</MenuItem>
              <MenuItem value={'week'}>Week</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button variant="contained" onClick={getRSI}>Get RSI</Button>
      
        <LineChart width={800} height={500} data={RSIs}
            margin={{top: 20, right: 5, bottom: 5, left: 20,}}>
            <CartesianGrid stroke="#ccc" />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <XAxis 
              label={{ value: 'Timestamp', position: 'bottom', margin: '10px' }}
              domain={['dataMin', 'dataMax']} 
              tickFormatter={(unixTime) => moment(unixTime).format('YYYY-MM-DD HH:mm:ss:SSS') }
              type="number" dataKey="timestamp" name="time stamp" unit="" />
            <YAxis 
              label={{ value: 'RSI values', angle: -90, position: 'insideLeft' }} 
              type="number" dataKey="value" name="RSI value" unit="" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            {/* <Legend /> */}
          </LineChart>

      </Box>
    
        {/* {showRSI(RSIs)} */}

    </>
  )
}
