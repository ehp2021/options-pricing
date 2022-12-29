import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, LabelList, Legend, Cell } from 'recharts';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function OptionsListTradier() {
  const [optionsData, setOptionsData] = useState();
  const [error, setError] = useState();
  const [dateInput, setDateInput] = useState();

  const onChangeDateHandler = event => {
    event.preventDefault()
    setDateInput(event.target.value);
    fetchOptionsChain()
 };



    const fetchOptionsChain = async () => {
      try {
        const accessToken = process.env.REACT_APP_TRADIER_ACCESS_TOKEN;
        const symbol = 'TSLA';
        // const date='2023-01-13';
        const date = dateInput;
        // const url='https://api.tradier.com/v1/user/profile'
        const url=`https://api.tradier.com/v1/markets/options/chains?symbol=TSLA&expiration=${date ? date : '2023-01-27'}&greeks=true`
        const response = await axios(url, 
          {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setOptionsData(response.data.options.option);
      } catch (error) {
        console.error(error);
      }
    };



  if (error) {
    return <p>There was an error: {error.message}</p>;
  }

  if (!optionsData) {
    return (
      <>
        <h1>Tradier Options Pricing Data</h1>
        <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',}}>
                <Typography>Type in an Expiration Date in format YYYY-MM-DD</Typography>
                <TextField id="date-input" label="Date (YYYY-MM-DD)" variant="outlined"  value={dateInput} /> 
                <Button onClick={onChangeDateHandler} variant="contained">Enter Date</Button>
          <Typography> Loading options data...</Typography>
      </Box>
      </>
    )
  }
  console.log(optionsData, "LINE 50, working?")

  return (
    <div>
      <h1>Tradier Options Pricing Data</h1>

      <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',}}>
                <Typography>Date (YYYY-MM-DD)</Typography>
                <TextField id="date-input" label="Date (YYYY-MM-DD)" variant="outlined" value={dateInput} />
                <Button onClick={onChangeDateHandler} variant="contained">Choose Date</Button> 
        <Typography variant="h5" gutterBottom={true}>{optionsData.length} options</Typography>
        <Typography variant="h5" gutterBottom={true}>Expiration date: {optionsData[0].expiration_date}</Typography>
      </Box>
      
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {/* LEFT UPPER BOX */}
        <Grid item xs={6}>
          <ScatterChart width={500} height={500}
            margin={{top: 20, right: 5, bottom: 5, left: 20,}}>
            <CartesianGrid />
            <XAxis 
              label={{ value: 'Last Price ($)', position: 'bottom', margin: '10px' }}
              type="number" dataKey="last" name="last price" unit="$" />
            <YAxis 
              label={{ value: 'Mid IV', angle: -90, position: 'insideLeft' }} yaxisId="left" orientation="left"
              type="number" dataKey="greeks.mid_iv" name="mid iv" unit="" />
            <ZAxis label={{ value: 'description',  position: 'insideLeft' }} yaxisId="right" orientation="right"
              type="number" dataKey="description" name="description" unit="" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name='TSLA 2022 Calls' data={optionsData.filter(op => op.option_type == "call")} fill="#000000">
              {/* <LabelList dataKey="lastPrice" /> */}
              {optionsData.map((entry, index) => (
                  <Cell key={`cell-${index}`}  />
                ))}
            </Scatter>
            <Scatter name="TSLA 2022 Puts" data={optionsData.filter(op => op.option_type == "put")} fill="#880808"> 
              {optionsData.map((entry, index) => (
                  <Cell key={`cell-${index}`}  />
                ))}
            </Scatter> 
            <Legend />
          </ScatterChart>
        </Grid>

        {/* RIGHT UPPER BOX */}
        <Grid item xs={6}>
          <ScatterChart width={500} height={500}
            margin={{top: 20, right: 5, bottom: 5, left: 20,}}>
            <CartesianGrid />
            <XAxis 
              label={{ value: 'Last Price ($)', position: 'center', margin: '10px' }}
              type="number" dataKey="last" name="last price" unit="$" />
            <YAxis 
              label={{ value: 'Delta', angle: -90, position: 'insideLeft' }} yaxisId="left" orientation="left"
              type="number" dataKey="greeks.delta" name="delta" unit="" />
            <ZAxis label={{ value: 'description',  position: 'insideLeft' }} yaxisId="right" orientation="right"
              type="number" dataKey="description" name="description" unit="" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name='TSLA 2022 Calls' data={optionsData.filter(op => op.option_type == "call")} fill="#000000">
              {/* <LabelList dataKey="lastPrice" /> */}
              {optionsData.map((entry, index) => (
                  <Cell key={`cell-${index}`}  />
                ))}
            </Scatter>
            <Scatter name="TSLA 2022 Puts" data={optionsData.filter(op => op.option_type == "put")} fill="#880808"> 
              {optionsData.map((entry, index) => (
                  <Cell key={`cell-${index}`}  />
                ))}
            </Scatter> 
            <Legend />
          </ScatterChart>
        </Grid>

        {/* LEFT LOWER BOX */}
        <Grid item xs={6}>
          <ScatterChart width={500} height={500}
            margin={{top: 5, right: 5, bottom: 5, left: 20,}}>
            <CartesianGrid />
            <XAxis 
              label={{ value: 'Last Price ($)', position: 'center', margin: '10px' }}
              type="number" dataKey="last" name="last price" unit="$" />
            <YAxis 
              label={{ value: 'Gamma', angle: -90, position: 'insideLeft' }} yaxisId="left" orientation="left"
              type="number" dataKey="greeks.gamma" name="gamma" unit="" />
            <ZAxis label={{ value: 'description',  position: 'insideLeft' }} yaxisId="right" orientation="right"
              type="number" dataKey="description" name="description" unit="" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name='TSLA 2022 Calls' data={optionsData.filter(op => op.option_type == "call")} fill="#000000">
              {/* <LabelList dataKey="lastPrice" /> */}
              {optionsData.map((entry, index) => (
                  <Cell key={`cell-${index}`}  />
                ))}
            </Scatter>
            <Scatter name="TSLA 2022 Puts" data={optionsData.filter(op => op.option_type == "put")} fill="#880808"> 
              {optionsData.map((entry, index) => (
                  <Cell key={`cell-${index}`}  />
                ))}
            </Scatter> 
            <Legend />
          </ScatterChart>
        </Grid>

        {/* RIGHT LOWER BOX */}
        <Grid item xs={6}>
          <ScatterChart width={500} height={500}
            margin={{top: 5, right: 5, bottom: 5, left: 5,}}>
            <CartesianGrid />
            <XAxis 
              label={{ value: 'Last Price ($)', position: 'center', margin: '10px' }}
              type="number" dataKey="last" name="last price" unit="$" />
            <YAxis 
              label={{ value: 'Theta', angle: -90, position: 'insideLeft' }} yaxisId="left" orientation="left"
              type="number" dataKey="greeks.theta" name="theta" unit="" />
            <ZAxis label={{ value: 'description',  position: 'insideLeft' }} yaxisId="right" orientation="right"
              type="number" dataKey="description" name="description" unit="" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name='TSLA 2022 Calls' data={optionsData.filter(op => op.option_type == "call")} fill="#000000">
              {/* <LabelList dataKey="lastPrice" /> */}
              {optionsData.map((entry, index) => (
                  <Cell key={`cell-${index}`}  />
                ))}
            </Scatter>
            <Scatter name="TSLA 2022 Puts" data={optionsData.filter(op => op.option_type == "put")} fill="#880808"> 
              {optionsData.map((entry, index) => (
                  <Cell key={`cell-${index}`}  />
                ))}
            </Scatter> 
            <Legend />
          </ScatterChart>
        </Grid>

      </Grid>


      {/* <pre>{JSON.stringify(optionsData, null, 2)}</pre> */}
      
      {optionsData.map(op => {
        return (
          <>
            <div>{op.symbol} {op.description}</div>
          </>
          
        )
      })}
      
    </div>
  );
}

