import React, { useState, useEffect } from 'react';
import OptionCard from "./OptionCard";
import axios, { all } from 'axios';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, LabelList, Legend, Cell } from 'recharts';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

export default function OptionsList() {
  const [allOptions, setAllOptions] = useState([])
  const [lastPriceInput, setLastPriceInput] = useState()
  const [ivHighInput, setIvHighInput] = useState()
  const [ivLowInput, setIvLowInput] = useState()
  // const [deltaHighInput, setDeltaHighInput] = useState()
  // const [deltaLowInput, setDeltaLowInput] = useState()

  const onChangeLastPriceHandler = event => {
    setLastPriceInput(event.target.value);
 };

 const onChangeIVHighHandler = event => {
  setIvHighInput(event.target.value)
 }

 const onChangeIVLowHandler = event => {
  setIvLowInput(event.target.value)
 }

//  const onChangeDeltaHighHandler = event => {
//   setDeltaHighInput(event.target.value)
//  }
  
//  const onChangeDeltaLowHandler = event => {
//   setDeltaLowInput(event.target.value)
//  }
  



  //using local json file
  useEffect(() => {
    axios
      .get("Tsla.json")
      //.then((res) => console.log(res.data.data, "HELLO"))
      .then((res) => 
        setAllOptions(res.data.data)) 
      .catch((err) => console.log(err));
  }, []);

  function showCallData(arr) {
    const result = arr.map(op => {
      return op.options.CALL
    })
    //get rid of all the results that have impliedVol > 400
    const graphCallData = result.flat(1).filter(obj => obj.impliedVolatility < ivHighInput && obj.impliedVolatility > ivLowInput)
      .filter(obj => obj.lastPrice < lastPriceInput)
      // .filter(obj => obj.delta < deltaHighInput && obj.delta > deltaLowInput)
    console.log(graphCallData.length, "how many CALL results?")
    return graphCallData
  }

  function showPutData(arr) {
    const result = arr.map(op => {
      return op.options.PUT
    })
    //get rid of all the results that have impliedVol > 400
    const graphPutData = result.flat(1).filter(obj => obj.impliedVolatility < ivHighInput && obj.impliedVolatility > ivLowInput)
      .filter(obj => obj.lastPrice < lastPriceInput)
      // .filter(obj => obj.delta < deltaHighInput && obj.delta > deltaLowInput)
    console.log(graphPutData.length, "how many PUT results?")
    return graphPutData
  }



  return (
    <>
    <Box sx={{ width: '100%' }}>
        <Box sx={{display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {m: 1,},}}>
          <Typography variant="h4">2022 TSLA Options</Typography>
        </Box>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            '& > *': {m: 2,},}}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',}}>
                <Typography>Option Price Less Than</Typography>
                <TextField id="last-price-input" label="Last Price Less Than" variant="outlined" onChange={onChangeLastPriceHandler} value={lastPriceInput} /> 
            </Box>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',}}>
              <Typography>IV Less Than</Typography>
              <TextField id="IV-less-than" label="IV Less Than" variant="outlined" onChange={onChangeIVHighHandler} value={ivHighInput} /> 
            </Box>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',}}>
              <Typography>IV Greater Than</Typography>
              <TextField id="IV-greater-than" label="IV Greater Than" variant="outlined" onChange={onChangeIVLowHandler} value={ivLowInput} /> 
            </Box>
            {/* <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',}}>
              <Typography>Delta Less Than</Typography>
              <TextField id="delta-less-than" label="Delta Less Than" variant="outlined" onChange={onChangeDeltaHighHandler} value={deltaHighInput} /> 
            </Box>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',}}>
              <Typography>Delta Greater Than</Typography>
              <TextField id="delta-greater-than" label="Delta Greater Than" variant="outlined" onChange={onChangeDeltaLowHandler} value={deltaLowInput} /> 
            </Box> */}
            <Box>{showCallData(allOptions).length} CALL results</Box>
            <Box>{showPutData(allOptions).length} PUT results</Box>
        </Box>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {/* LEFT UPPER BOX */}
        <Grid item xs={6}>
          <ScatterChart width={500} height={500}
            margin={{top: 20, right: 20, bottom: 20, left: 20,}}>
            <CartesianGrid />
            <XAxis 
              label={{ value: 'Purchase Price ($)', position: 'center', margin: '10px' }}
              type="number" dataKey="lastPrice" name="purchase price" unit="$" />
            <YAxis 
              label={{ value: 'Implied Volatility (%)', angle: -90, position: 'insideLeft' }} yaxisId="left" orientation="left"
              type="number" dataKey="impliedVolatility" name="implied vol" unit="%" />
            <ZAxis label={{ value: 'delta',  position: 'insideLeft' }} yaxisId="right" orientation="right"
              type="number" dataKey="delta" name="delta" unit="" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="TSLA 2022 Calls" data={showCallData(allOptions)} fill="#000000">
              {/* <LabelList dataKey="lastPrice" /> */}
              {showCallData(allOptions).map((entry, index) => (
                  <Cell key={`cell-${index}`}  />
                ))}
            </Scatter>
            <Scatter name="TSLA 2022 Puts" data={showPutData(allOptions)} fill="#880808">
              {/* <LabelList dataKey="lastPrice" /> */}
              {showPutData(allOptions).map((entry, index) => (
                  <Cell key={`cell-${index}`}  />
                ))}
            </Scatter>
            <Legend />
          </ScatterChart>
        </Grid>

        {/* RIGHT UPPER BOX */}
        <Grid item xs={6}>
          <ScatterChart
            width={500} height={500}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis 
              label={{ value: 'Purchase Price ($)', position: 'center', margin: '10px' }}
              type="number" dataKey="lastPrice" name="purchase price" unit="$" />
            <YAxis 
              label={{ value: 'Delta($)', angle: -90, position: 'insideLeft' }} yaxisId="left" orientation="left"
              type="number" dataKey="delta" name="delta" unit="$" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="TSLA 2022 Calls" data={showCallData(allOptions)} fill="#000000">
              {/* <LabelList dataKey="lastPrice" /> */}
              {showCallData(allOptions).map((entry, index) => (
                  <Cell key={`cell-${index}`}  />
                ))}
            </Scatter>
            <Scatter name="TSLA 2022 Puts" data={showPutData(allOptions)} fill="#880808">
              {/* <LabelList dataKey="lastPrice" /> */}
              {showPutData(allOptions).map((entry, index) => (
                  <Cell key={`cell-${index}`}  />
                ))}
            </Scatter>
            <Legend />
          </ScatterChart>
        </Grid>

        {/* LEFT LOWER BOX */}
        <Grid item xs={6}>
          <ScatterChart
            width={500}
            height={500}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis 
              label={{ value: 'Purchase Price ($)', position: 'center', margin: '10px' }}
              type="number" dataKey="lastPrice" name="purchase price" unit="$" />
            <YAxis 
              label={{ value: 'Gamma($)', angle: -90, position: 'insideLeft' }} yaxisId="left" orientation="left"
              type="number" dataKey="gamma" name="gamma" unit="$" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="TSLA 2022 Calls" data={showCallData(allOptions)} fill="#000000">
              {/* <LabelList dataKey="lastPrice" /> */}
              {showCallData(allOptions).map((entry, index) => (
                  <Cell key={`cell-${index}`}  />
                ))}
            </Scatter>
            <Scatter name="TSLA 2022 Puts" data={showPutData(allOptions)} fill="#880808">
              {/* <LabelList dataKey="lastPrice" /> */}
              {showPutData(allOptions).map((entry, index) => (
                  <Cell key={`cell-${index}`}  />
                ))}
            </Scatter>
            <Legend />
          </ScatterChart>
        </Grid>


        {/* Right LOWER BOX */}
        <Grid item xs={6}>
          <ScatterChart
            width={500}
            height={500}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis 
              label={{ value: 'Purchase Price ($)', position: 'center', margin: '10px' }}
              type="number" dataKey="lastPrice" name="purchase price" unit="$" />
            <YAxis 
              label={{ value: 'Theta ($)', angle: -90, position: 'insideLeft' }} yaxisId="left" orientation="left"
              type="number" dataKey="theta" name="theta" unit="$" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="TSLA 2022 Calls" data={showCallData(allOptions)} fill="#000000">
              {/* <LabelList dataKey="lastPrice" /> */}
              {showCallData(allOptions).map((entry, index) => (
                  <Cell key={`cell-${index}`}  />
                ))}
            </Scatter>
            <Scatter name="TSLA 2022 Puts" data={showPutData(allOptions)} fill="#880808">
              {/* <LabelList dataKey="lastPrice" /> */}
              {showPutData(allOptions).map((entry, index) => (
                  <Cell key={`cell-${index}`}  />
                ))}
            </Scatter>
            <Legend />
          </ScatterChart>
        </Grid>

          
      </Grid>
      {/* <Link to="/">
        <Button variant="outlined" sx={{margin: '10px'}}>Home</Button>
      </Link> */}
    </Box>
    </>
  )
}
